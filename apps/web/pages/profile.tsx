/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import type { NextPage } from 'next';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { InferType } from 'yup';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator } from '../views/wizard';
import { RowOne, RowTwo, RowThree, ProfileBar } from '../views/profile';
import { Errors } from '../types';
import { useAuthCtx } from '../hooks';
import { apiHandler } from '../api';

type FormType = InferType<typeof registerFormValidator>;

const Index: NextPage = () => {
  const [edit, setEdit] = useState<boolean>(true);
  const methods = useForm<FormType>({ mode: 'all', resolver: yupResolver(registerFormValidator) });
  const toast = useToast();
  const { user, getData } = useAuthCtx();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    methods.setFocus('FullName');
  };
  const cancelEditHandler = () => {
    setEdit(true);
  };

  const copyFile = () => {
    if (user && user.id) {
      window.navigator.clipboard.writeText(user?.id);
      toast({
        title: 'Id copied to clipboard.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    } else {
      toast({
        title: 'Error copying to clipboard.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
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
      passyear: Number(val.Passout?.value),
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
      await getData();
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
            <ProfileBar
              copyFile={copyFile}
              edit={edit}
              editHandler={editHandler}
              id={user?.id}
              cancelEditHandler={cancelEditHandler}
            />
          </Box>
          <Flex
            flexDirection={{ base: 'column', lg: 'row' }}
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            mt={{ base: '20px', lg: '40px' }}
          >
            <RowOne edit={edit} />
            <RowTwo edit={edit} />
            <RowThree edit={edit} />
            {!edit && (
              <Button
                w="100%"
                mt="20px"
                _hover={{ cursor: 'pointer', bg: '#1328EC' }}
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
