/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import type { NextPageWithLayout } from 'next';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { InferType } from 'yup';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator } from '../views/wizard';
import { RowOne, RowTwo, RowThree, ProfileBar } from '../views/profile';
import { Errors } from '../types';
import { useAuthCtx } from '../hooks';
import { platformAPI } from '../config';
import { ProfileLayout } from '../layout';

type FormType = InferType<typeof registerFormValidator>;

const Index: NextPageWithLayout = () => {
  const [isEdit, setEdit] = useState<boolean>(true);
  const methods = useForm<FormType>({ mode: 'all', resolver: yupResolver(registerFormValidator) });
  const toast = useToast();
  const { user, setUser } = useAuthCtx();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    methods.setFocus('name');
  };
  const cancelEditHandler = () => {
    setEdit(true);
  };

  const copyMembershipId = () => {
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
    const skillsArr = val.skills?.map((el: any) => el.value);
    const Dummey: string[] = [];

    const Dbdata = {
      ...val,
      pronoun: val.pronoun.value,
      district: val.district?.value || '',
      description: val.description.value,
      skills: skillsArr || Dummey,
      collegeId: val.collegeId?.value,
      passYear: `${val.passYear?.value}`,
      email: undefined,
    };
    setEdit((el) => !el);

    // sending the post request
    try {
      const { data } = await platformAPI.patch('/users/profile', Dbdata);
      // need to rerender the  page from context
      if (!data.Success) throw new Error(data.message);
      toast({
        title: 'user info was updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // setting the new updated value to context
      setUser(data.data);
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
    <SessionAuth>
      <Box mt="2" mb="50px">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(updateProfile)}>
            <Box>
              <ProfileBar
                copyMembershipId={copyMembershipId}
                isEdit={isEdit}
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
              <RowOne isEdit={isEdit} />
              <RowTwo isEdit={isEdit} />
              <RowThree isEdit={isEdit} />
              {!isEdit && (
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
    </SessionAuth>
  );
};

Index.Layout = ProfileLayout;

export default Index;
