/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator } from '../views/wizard';
import { Form } from '../types';
import { RowOne, RowTwo, RowThree, RowFour, ProfileBar, Arrow } from '../views/profile';

const Index: NextPage = () => {
  const [edit, setEdit] = useState<boolean>(true);
  const methods = useForm<Form>({ mode: 'all', resolver: yupResolver(registerFormValidator) });

  const toast = useToast();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    methods.setFocus('FullName');
  };

  const copyFile = () => {
    window.navigator.clipboard.writeText('8078153360');
    toast({
      title: 'Id copied to clipboard.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
  };

  const updateProfile: SubmitHandler<Form> = (data) => {
    console.log(data);
    setEdit((el) => !el);
  };
  return (
    <Box mt="2" mb="30px">
      <Box>
        <Arrow />
        <ProfileBar copyFile={copyFile} edit={edit} editHandler={editHandler} />
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(updateProfile)}>
          <Flex flexDirection="column" mt="40px">
            <RowOne edit={edit} />
            <RowTwo edit={edit} />
            <RowThree edit={edit} />
            <RowFour edit={edit} />
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Index;
