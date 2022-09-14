/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { InferType } from 'yup';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator } from '../views/wizard';
import { RowOne, RowTwo, RowThree, ProfileBar, Arrow } from '../views/profile';

type FormType = InferType<typeof registerFormValidator>;

const Index: NextPage = () => {
  const [edit, setEdit] = useState<boolean>(true);
  const methods = useForm<FormType>({ mode: 'all', resolver: yupResolver(registerFormValidator) });

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

  const updateProfile: SubmitHandler<FormType> = (data) => {
    console.log(data);
    setEdit((el) => !el);
  };
  return (
    <Box mt="2" mb="150px">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(updateProfile)}>
          <Box>
            <Arrow />
            <ProfileBar copyFile={copyFile} edit={edit} editHandler={editHandler} />
          </Box>
          <Flex
            flexDirection={{ base: 'column', lg: 'row' }}
            mt="25px"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <RowOne edit={edit} />
            <RowTwo edit={edit} />
            <RowThree edit={edit} />
          </Flex>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Index;
