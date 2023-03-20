/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo, useState } from 'react';
import type { NextPageWithLayout } from 'next';
import { Box, Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import dayjs from 'dayjs';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { registerFormValidator } from '../views/wizard';
import { RowOne, RowTwo, RowThree, ProfileBar, CancelDialogue } from '../views/profile';
import { Errors } from '../types';
import { useAuthCtx } from '../hooks';
import { platformAPI } from '../config';
import { ProfileLayout } from '../layout';

type FormType = InferType<typeof registerFormValidator>;

const Index: NextPageWithLayout = () => {
  const { user, setUser } = useAuthCtx();
  const [isEdit, setEdit] = useState<boolean>(true);

  // for cancel dialogue
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userSkillsArr = useMemo(() => {
    if (user && user?.skills) {
      return user?.skills.map((skill) => ({ label: skill?.name, value: skill?.id }));
    }
    return [];
  }, [user]);

  const methods = useForm<FormType>({
    mode: 'all',
    resolver: yupResolver(registerFormValidator),
    defaultValues: {
      name: user?.name,
      pronoun: { label: user?.pronoun, value: user?.pronoun },
      email: user?.email,
      description: { label: user?.description, value: user?.description },
      dob: dayjs(user?.dob).format('YYYY-MM-DD') as unknown as Date,
      mentor: user?.mentor ? 'YES' : 'NO',
      district: { label: user?.district, value: user?.district },
      house: user?.house,
      street: user?.street,
      pin: user?.pin,
      passYear: {
        value: user?.passYear?.toString(),
        label: user?.passYear?.toString(),
      },
      collegeId: { label: user?.college?.name, value: user?.college?.id },
      skills: userSkillsArr,
    },
  });

  // changing form values wheneever  from data changes
  useEffect(() => {
    methods.reset({
      name: user?.name,
      pronoun: { label: user?.pronoun, value: user?.pronoun },
      email: user?.email,
      description: { label: user?.description, value: user?.description },
      dob: dayjs(user?.dob).format('YYYY-MM-DD') as unknown as Date,
      mentor: user?.mentor ? 'YES' : 'NO',
      district: { label: user?.district, value: user?.district },
      house: user?.house,
      street: user?.street,
      pin: user?.pin,
      passYear: {
        value: user?.passYear?.toString(),
        label: user?.passYear?.toString(),
      },
      collegeId: { label: user?.college?.name, value: user?.college?.id },
      skills: userSkillsArr,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toast = useToast();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    methods.setFocus('name');
  };
  const cancelEditHandler = () => {
    // for cancel dialogue
    onOpen();
  };

  // this function is called when the YES button
  // in dialog is clicked
  const handleModalAction = () => {
    // if user cancel the edit in middle of editing
    // we wil reset the form data to prev data
    setEdit(true);
    methods.reset();
    onClose();
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
    let college = val.collegeId?.value;
    // eslint-disable-next-line no-underscore-dangle
    if (val.collegeId?.__isNew__) {
      const { data: newCollege } = await platformAPI.post('/college/new', {
        name: val.collegeId?.value,
      });
      college = newCollege.data.name;
    }

    const skillsArr = val?.skills?.map((el: any) => el.value);
    const dbData = {
      ...val,
      pronoun: val.pronoun.value,
      district: val.district?.value || '',
      description: val.description.value,
      skills: skillsArr || [],
      collegeId: college,
      passYear: Number(val.passYear?.value),
      email: val.email,
      pin: val.pin ? Number(val.pin) : null,
      mentor: val.mentor === 'YES',
    };
    setEdit((el) => !el);

    // sending the post request
    try {
      const { data } = await platformAPI.patch('/users/profile', dbData);
      // need to rerender the  page from context
      if (!data.success) throw new Error(data.message);
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
      // rolling back to old state if error occurred
      methods.reset();
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
      <CancelDialogue isOpen={isOpen} onClose={onClose} handleModalAction={handleModalAction} />
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
