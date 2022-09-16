/* eslint-disable react/jsx-props-no-spreading */ /* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import { ArrowBackIcon, CopyIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Topbar, BottomBar } from '../../components/Navbar';

export type Form = {
  campus: string;
  desc: string;
  district: string;
  dob: string;
  email: string;
  house: string;
  mentor: boolean;
  mobile: number;
  name: string;
  pin: number;
  pronoun?: string;
  skills: string;
  street: string;
};

const Index: NextPage = () => {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(true);
  const LogOut = async () => {
    await signOut();
    router.replace('/');
  };
  const {
    register,
    handleSubmit,
    setFocus,
    // formState: { errors },
  } = useForm<Form>();

  const toast = useToast();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    setFocus('name');
  };

  const copyFile = () => {
    toast({
      title: 'Membership id copied.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
  };

  const updateProfile = (data: Form) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <>
      <Topbar showBtn btnText="Log Out" btnFunc={LogOut} />
      <Box bg="white" minH="94vh" p={5}>
        <Box>
          <ArrowBackIcon
            color="black"
            w={8}
            h={8}
            ml={8}
            _hover={{ cursor: 'pointer', color: 'grey' }}
            onClick={() => router.back()}
          />
        </Box>
        <form onSubmit={handleSubmit(updateProfile)}>
          <Box display="flex" justifyContent="space-between" p={5}>
            <Box display="flex" justifyContent="space-between">
              <Heading color="black" as="h2" size={{ base: 'md', lg: 'xl' }} alignSelf="center">
                My Profile
              </Heading>
              <Heading color="black" as="h2" size="sm" alignSelf="center" pl={5}>
                membership ID
              </Heading>
              <CopyIcon
                onClick={copyFile}
                color="black"
                w={4}
                h={4}
                ml={3}
                _hover={{ cursor: 'pointer', color: 'grey' }}
                alignSelf="center"
              />
            </Box>
            <Box>
              {edit && (
                <Button
                  colorScheme="blue"
                  backgroundColor="rgba(65, 83, 240, 1)"
                  alignSelf="center"
                  onClick={editHandler}
                >
                  Edit
                </Button>
              )}
              {!edit && (
                <Button
                  colorScheme="blue"
                  alignSelf="center"
                  type="submit"
                  backgroundColor="rgba(65, 83, 240, 1)"
                >
                  Save
                </Button>
              )}
            </Box>
          </Box>
          <Flex flexDirection="column" pl={{ base: '10px', lg: '40px' }}>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Name</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  readOnly={edit}
                  {...register('name')}
                  required
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Best way to describe yourself </Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  required
                  {...register('desc')}
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">House Name</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('house')}
                  required
                />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Mobile Number</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  required
                  {...register('mobile')}
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Can you be a mentor</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('mentor')}
                  required
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Street Name</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('street')}
                  required
                />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Email</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('email')}
                  required
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Select your campus</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  required
                  {...register('campus')}
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">District</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('district')}
                  required
                />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Date of Birth</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('dob')}
                  required
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Skill</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('skills')}
                  required
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Pincode</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('pin')}
                  required
                />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Box w={{ base: '400px', lg: '250px' }} p="10px">
                <Text color="black">Preferred pronoun</Text>
                <Input
                  variant="filled"
                  placeholder="Filled"
                  bg="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('pronoun')}
                  required
                />
              </Box>
            </Stack>
          </Flex>
          <Box p={6}>
            <BottomBar />
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Index;
