/* eslint-disable react/jsx-props-no-spreading */
import { Center, useDimensions, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import Confetti from 'react-confetti';

import {
  CardBio,
  Bar,
  One,
  Two,
  Three,
  Final,
  firstFormValidator,
  secondValidator,
  registerFormValidator,
  thirdValidator,
} from '../views/wizard';
import { apiHandler } from '../api';
import { Errors, Form } from '../types';

type FormType = InferType<typeof registerFormValidator>;

const Index: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [validator, setValidator] = useState<any>(firstFormValidator);
  const methods = useForm<FormType>({ mode: 'all', resolver: yupResolver(validator) });
  const [user, setUser] = useState<Form | null>(null);
  const elementRef = useRef(null);
  const dimensions = useDimensions(elementRef, true);

  const [isLoading, setIsloading] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (step === 1) {
      setValidator(firstFormValidator);
    }
    if (step === 2) {
      setValidator(secondValidator);
    }
    if (step === 3) {
      setValidator(thirdValidator);
    }
  }, [step]);

  const stepAdd = (): void => {
    setStep((ste) => ste + 1);
  };

  const stepSub = (): void => {
    setStep((ste) => ste - 1);
  };
  const handleData: SubmitHandler<FormType> = async (val) => {
    if (step === 3) {
      // increase the step to 4 to render the sucess/ fail UI
      const skillsArr: string[] = [];
      val.My_Skills?.map((el) => skillsArr.push(el.value));
      const Dbdata = {
        house: val.House_Name,
        street: val.Street,
        pin: val.Pincode,
        dob: new Date(val.DOB),
        name: val.FullName,
        email: val.Email,
        skills: skillsArr,
        desc: val.describe.value,
        pronoun: val.Pronoun.value,
        district: val.District?.value,
        CampusCommunityActive: val.CampusCommunityActive?.value,
        campus: val.College?.value,
        mentor: Boolean(Number(val.Mentor)),
        isNewuser: false,
      };

      stepAdd();
      // send post request to backend
      try {
        setIsloading(true);
        const { data } = await apiHandler.post('/users/profile', Dbdata);
        if (!data.Success) throw new Error(data.message);
        setUser(data.data);
        toast({
          title: 'User created succesfully',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      } catch (e) {
        const msg = e as Errors;
        toast({
          title: msg.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      } finally {
        setIsloading(false);
      }
    } else {
      stepAdd();
    }
  };

  if (step === 4) {
    return (
      <Center mb="60px" ref={elementRef}>
        {!isLoading && (
          <Confetti width={dimensions?.borderBox.width} height={dimensions?.borderBox.height} />
        )}
        <Final isLoading={isLoading} id={user?.id} />
      </Center>
    );
  }

  return (
    <Center mb="60px">
      <CardBio>
        <Bar val={step} back={stepSub} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleData)}>
            {step === 1 && <One />}
            {step === 2 && <Two />}
            {step === 3 && <Three />}
          </form>
        </FormProvider>
      </CardBio>
    </Center>
  );
};

export default Index;
