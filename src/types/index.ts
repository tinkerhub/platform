import {ReactNode} from "react";

export type Child = {
  children: ReactNode;
};

export interface Errors {
  message: string;
}

export interface Form {
    team: string | null;
  name: string;
  passYear: number | null;
  description: string;
  dob: Date;
  email: string;
  pronoun: string;
  mobile: string;
  collegeId: string | null;
  mentor: boolean;
  accept: boolean | null;
  house: string | null;
  district: string | null;
  pin: string | null;
  skills: string[] | [];
  street: string | null;
  campusCommunityActive: boolean;
  id: string;
  college: Skill | null;
}

export interface Skill {
  name: string;
  id: string;
}
