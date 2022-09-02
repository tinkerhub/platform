/* eslint-disable react/jsx-props-no-spreading */
import { Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CardBio,
  Bar,
  One,
  Two,
  Three,
  Final,
  firstFormValidator,
  secondValidator,
  thirdValidator,
} from '../views/wizard';
import { Form } from '../types';
import { useData } from '../hooks';

const Index: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [validator, setValidator] = useState<any>(firstFormValidator);

  const methods = useForm<Form>({ mode: 'all', resolver: yupResolver(validator) });
  const { properties, sendData } = useData<Form>('/user/profile');

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
  const handleData: SubmitHandler<Form> = (val) => {
    if (step === 3) {
      // increase the step to 4 to render the sucess/ fail UI
      stepAdd();
      // send post request to backend
      sendData(val);
    } else {
      stepAdd();
    }
  };

  if (step === 4) {
    return (
      <Center mb="60px">
        <Final isLoading={properties.isLoading} id={100000} />
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
