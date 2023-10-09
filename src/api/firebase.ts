// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "@firebase/auth";
import {collection, getDocs, getFirestore} from "@firebase/firestore";
import {doc, getDoc} from "firebase/firestore";
import {Form, Skill} from "@/types";
import Typesense from "typesense";


const firebaseConfig = {
    apiKey: "AIzaSyB8bzkCM0zRTl82s-XHmJKM5i5uCClUFmQ",
    authDomain: "tinkerhub-foundation.firebaseapp.com",
    projectId: "tinkerhub-foundation",
    storageBucket: "tinkerhub-foundation.appspot.com",
    messagingSenderId: "861369257179",
    appId: "1:861369257179:web:d0b060eb50c519bbe8d0fe",
    measurementId: "G-CEWBJZ8E7W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const typesense = new Typesense.Client({
    nodes: [{
        host: 'jb4cdwp1a3sf8ugrp-1.a1.typesense.net',
        port: 443,
        protocol: 'https'
    }],
    apiKey: 'Tu9wjCTQbG7nCyREXAfrvLSmRltAeFJN',
    connectionTimeoutSeconds: 2
});

export async function getUserData(phone?: string | null) {
    if (!phone) return;

    const userRef = doc(db, 'users', phone);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return {
            ...userSnap.data(),
            dob: userSnap.get("dob") ? userSnap.get("dob").toDate() as Date : null
        } as Form;
    }
}

export async function getSkills() {
    if(localStorage.getItem("skills"))
        return JSON.parse(localStorage.getItem("skills") || "[]") as  Skill[];

    const skillsRef = collection(db, 'skills')
    const skillsSnap = await getDocs(skillsRef);

    const skill = skillsSnap.docs
        .map(doc => ({value: doc.get("name"), label: doc.get("name")}));

    localStorage.setItem("skills", JSON.stringify(skill));
}

export async function getCollege(search: string) {
    try {
        const searchParameters = {
            q: search,
            query_by: "name", // Assuming "name" is the field in colleges collection you want to search
            prefix: true,     // Assuming you want prefix-based search
        };

        const result = await typesense.collections('colleges').documents().search(searchParameters);

        return result.hits?.map(hit => ({
            label: (hit.document as Skill).name,
            value: (hit.document as Skill).id
        })) || [];
    } catch (error) {
        console.error("Error fetching colleges from Typesense:", error);
        return [];
    }
}
