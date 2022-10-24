/* eslint-disable react/jsx-props-no-spreading */
import { Center, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import type { NextPageWithLayout } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { BaseLayout } from '../layout';

import {
  CardBio,
  Bar,
  One,
  Two,
  Three,
  Final,
  registerFormValidator,
  stepByStepValidator,
} from '../views/wizard';
import { platformAPI } from '../config';
import { Errors, Form } from '../types';
import { Quotes } from '../views/wizard/Quotes';

type FormType = InferType<typeof registerFormValidator>;

const Wizard: NextPageWithLayout = () => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<FormType>({
    mode: 'all',
    resolver: yupResolver(stepByStepValidator[step]),
  });
  const [user, setUser] = useState<Form | null>(null);

  const [isLoading, setIsloading] = useState<boolean>(false);

  const toast = useToast();
  const isReadyForSubmission = step === 3;

  const stepAdd = (): void => {
    setStep((ste) => ste + 1);
  };

  const stepSub = (): void => {
    setStep((ste) => ste - 1);
  };
  const handleData: SubmitHandler<FormType> = async (val) => {
    if (isReadyForSubmission) {
      // increase the step to 4 to render the sucess/ fail UI
      const skillsArr = val.My_Skills?.map((el) => el.value);
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
        passyear: val.Passout?.value,
      };

      stepAdd();
      // send post request to backend
      try {
        setIsloading(true);
        const { data } = await platformAPI.post('/users/profile', Dbdata);
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
      <SessionAuth>
        <Center mb="60px">
          <Final isLoading={isLoading} id={user?.id} />
        </Center>
      </SessionAuth>
    );
  }

  return (
    <SessionAuth>
      <Quotes word="“80% of engineering graduates don’t have the skills needed for the industry. We’ are here to change that.”">
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
      </Quotes>
    </SessionAuth>
  );
};

Wizard.Layout = BaseLayout;

export default Wizard;
