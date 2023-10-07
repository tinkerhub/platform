/* eslint-disable react/jsx-props-no-spreading */
import {Center, useToast} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InferType} from 'yup';
import {BaseLayout} from '@/layout';

import {Bar, CardBio, Final, One, registerFormValidator, stepByStepValidator, Three, Two,} from '@/views/wizard';
import {Quotes} from '@/views/wizard/components/Quotes';
import {Form, Skill} from '@/types';
import {doc, setDoc} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from '@/api/firebase';
import {useRouter} from "next/router";

type FormType = InferType<typeof registerFormValidator>;

const Wizard = () => {
    const [user] = useAuthState(auth);
    const [step, setStep] = useState<number>(1);
    const methods = useForm<FormType>({
        mode: 'all',
        resolver: step !==2 ? yupResolver(stepByStepValidator[step]) : undefined,
    });

    const router = useRouter();

    useEffect(() => {
        if (user === null)
            router.push('/auth').then();
    }, [user, router]);

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
            // increase the step to 4 to render the sucess/ fail UI
            let college = val.collegeId?.value;


            const skillsArr = val.skills?.map((el: { value: string }) => el.value);
            const dbData: Form = {
                accept: null,
                college: null,
                ...val,
                id: user.uid,
                mobile: user.phoneNumber,
                campusCommunityActive: true,
                pronoun: val.pronoun.value,
                district: val.district?.value || '',
                description: val.description.value,
                skills: (skillsArr || []) as unknown as Skill[],
                collegeId: college || null,
                passYear: Number(val.passYear?.value),
                pin: val.pin || null,
                mentor: val.mentor === 'YES',
                house: val.house || null,
                street: val.street || null,
            };
            stepAdd();
            // send post request to backend
            try {
                await setDoc(doc(db, 'user', user.phoneNumber), dbData);
                toast({
                    title: 'User created succesfully',
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                });
            } catch (e) {
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