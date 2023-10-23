/* eslint-disable react/jsx-props-no-spreading */
import {Center, useToast} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InferType} from 'yup';
import {BaseLayout} from '@/layout';

import {Bar, CardBio, Final, One, registerFormValidator, stepByStepValidator, Three, Two,} from '@/views/wizard';
import {Quotes} from '@/views/wizard/components/Quotes';
import {Form} from '@/types';
import {doc, setDoc} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db, getUserData} from '@/api/firebase';
import {useRouter} from "next/router";

type FormType = InferType<typeof registerFormValidator>;

const Wizard = () => {
    const [user, loading] = useAuthState(auth);
    const [step, setStep] = useState<number>(1);
    const methods = useForm<FormType>({
        mode: 'all',
        resolver: step !== 2 ? yupResolver(stepByStepValidator[step]) : undefined,
    });

    const router = useRouter();

    useEffect(() => {
        if (!loading && !user?.phoneNumber)
            router.push('/auth').then();

        if (user)
            getUserData(user.phoneNumber, user.uid).then(async (data) => {
                if (data?.name && !data?.id && user?.phoneNumber)
                    await setDoc(doc(db, 'users', user.phoneNumber), {id: user.uid}, {merge: true});

                if (data?.name)
                    router.push('/events').then();
            });

    }, [user, router, loading]);

    const [formError, setFormError] = useState<boolean>(false);

    const toast = useToast();
    const isReadyForSubmission = step === 3 && user?.phoneNumber;
    const stepAdd = (): void => {
        setStep((ste) => ste + 1);
    };

    const stepSub = (): void => {
        setStep((ste) => ste - 1);
    };
    const handleData: SubmitHandler<FormType> = async (val) => {
        if (isReadyForSubmission) {
            let college;
            if (val.collegeId?.label && val.collegeId?.value)
                college = {name: val.collegeId.label, id: val.collegeId.value};

            const skillsArr = val.skills?.map((el: { value: string }) => el.value);
            const dbData: Form = {
                team: null,
                accept: null,
                college: college || null,
                ...val,
                dob: new Date(val.dob),
                id: user.uid,
                mobile: user.phoneNumber,
                campusCommunityActive: true,
                pronoun: val.pronoun.value,
                district: val.district?.value || null,
                description: val.description.value,
                skills: (skillsArr || []) as unknown as string[],
                collegeId: val.collegeId?.value || null,
                passYear: Number(val.passYear?.value),
                pin: val.pin || null,
                mentor: val.mentor === 'YES',
                house: val.house || null,
                street: val.street || null,
            };
            stepAdd();
            // send post request to backend
            try {
                await setDoc(doc(db, 'users', user.phoneNumber), dbData);
                toast({
                    title: 'User created successfully',
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                });
            } catch (e) {
                console.error(e);
                setFormError(true);
            }
        } else {
            stepAdd();
        }
    };

    if (step === 4) {
        return (
            <>
                <Center mb="60px">
                    {user &&
                        <Final
                            isLoading={methods.formState.isSubmitting}
                            id={user.uid}
                            error={formError}
                        />
                    }
                </Center>
            </>
        );
    }

    return (
        <>
            {step === 1}
            <Quotes
                word="“80% of engineering graduates don’t have the skills needed for the industry. We’ are here to change that.”">
                <CardBio>
                    <Bar val={step} back={stepSub}/>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleData)}>
                            {step === 1 && <One/>}
                            {step === 2 && <Two/>}
                            {step === 3 && <Three/>}
                        </form>
                    </FormProvider>
                </CardBio>
            </Quotes>
        </>
    );
};

Wizard.Layout = BaseLayout;

export default Wizard;
