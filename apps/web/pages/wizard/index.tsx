/* eslint-disable react/jsx-props-no-spreading */
import { Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator, CardBio, Bar, One, Two, Three } from '../../views/wizard';
import { Topbar } from '../../components/Navbar';
import { Form } from '../../types';

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<Form>({ mode: 'all', resolver: yupResolver(registerFormValidator) });

  const stepAdd = (): void => {
    setStep((ste) => ste + 1);
  };

  const stepSub = (): void => {
    setStep((ste) => ste - 1);
  };
  const handleData = (val: any): void => {
    // send post request to backend
    // then increease the step to 4 to render the sucess/ fail UI
    stepAdd();
    console.log(val);
  };

  return (
    <>
      <Topbar showBtn={false} />
      <Center bg="white" minH="93vh">
        <CardBio>
          <Bar val={step} back={stepSub} />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleData)}>
              {step === 1 && <One next={stepAdd} />}
              {step === 2 && <Two next={stepAdd} />}
              {step === 3 && <Three />}
            </form>
          </FormProvider>
        </CardBio>
      </Center>
    </>
  );
};

export default Index;
