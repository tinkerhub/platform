/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { InferType } from 'yup';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator } from '../views/wizard';
import { RowOne, RowTwo, RowThree, ProfileBar, Arrow } from '../views/profile';
import { Errors } from '../types';
import { useAuthCtx } from '../hooks';
import { apiHandler } from '../api';

type FormType = InferType<typeof registerFormValidator>;

const Index: NextPage = () => {
  const [edit, setEdit] = useState<boolean>(true);
  const methods = useForm<FormType>({ mode: 'all', resolver: yupResolver(registerFormValidator) });
  const toast = useToast();
  const { user } = useAuthCtx();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    methods.setFocus('FullName');
  };

  const copyFile = () => {
    if (user && user.id) {
      window.navigator.clipboard.writeText(user?.id);
      toast({
        title: 'Id copied to clipboard.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error copying to clipboard.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateProfile: SubmitHandler<FormType> = async (val) => {
    const skillsArr: string[] = [];
    val.My_Skills?.map((el: any) => skillsArr.push(el.value));
    const Dbdata = {
      house: val.House_Name,
      street: val.Street,
      pin: val.Pincode,
      dob: val.DOB,
      name: val.FullName,
      skills: skillsArr,
      desc: val.describe.value,
      pronoun: val.Pronoun.value,
      district: val.District?.value,
      CampusCommunityActive: val.CampusCommunityActive?.value,
      campus: val.College?.value,
      mentor: val.Mentor,
    };
    setEdit((el) => !el);
    // sending the post request
    try {
      const { data } = await apiHandler.patch('/users/profile', Dbdata);
      // need to rerender the  page from context
      if (!data.Success) throw new Error(data.message);
      toast({
        title: 'user info was updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      const msg = e as Errors;
      toast({
        title: msg.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt="2" mb="50px">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(updateProfile)}>
          <Box>
            <Arrow />
            <ProfileBar copyFile={copyFile} edit={edit} editHandler={editHandler} id={user?.id} />
          </Box>
          <Flex
            flexDirection={{ base: 'column', lg: 'row' }}
            mt="10px"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <RowOne edit={edit} />
            <RowTwo edit={edit} />
            <RowThree edit={edit} />
            {!edit && (
              <Button
                w="100%"
                mt="20px"
                display={{ lg: 'none' }}
                type="submit"
                colorScheme="blue"
                backgroundColor="rgba(65, 83, 240, 1)"
                color="white"
              >
                Save
              </Button>
            )}
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Index;
