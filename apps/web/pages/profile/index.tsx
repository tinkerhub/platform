/* eslint-disable react/jsx-props-no-spreading */ /* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { ArrowBackIcon, CopyIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Input, Select, Stack, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LayoutSignOut } from '../../layout';
import { registerFormValidator } from '../../views/wizard';
import { Form } from '../../types';
import { District } from '../../views/wizard/Three';

const Index: NextPage = () => {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Form>({ mode: 'all', resolver: yupResolver(registerFormValidator) });

  const toast = useToast();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    setFocus('FullName');
  };

  const copyFile = () => {
    toast({
      title: 'Id copied to clipboard.',
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
    <LayoutSignOut>
      <Box bg="white" mt="2">
        <Box>
          <ArrowBackIcon
            color="black"
            w={8}
            h={8}
            _hover={{ cursor: 'pointer', color: 'grey' }}
            onClick={() => router.back()}
          />
        </Box>
        <form onSubmit={handleSubmit(updateProfile)}>
          <Box display="flex" justifyContent="space-between" mt="4">
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
          <Flex flexDirection="column" mt="40px">
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
              mb="10px"
            >
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Name</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="JhonDoe"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  readOnly={edit}
                  {...register('FullName')}
                />
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.FullName?.message}
                </Text>
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Best way to describe yourself </Text>
                <Select placeholder="I prefer to use the pronoun" {...register('describe')}>
                  <option value="He/Him">He/Him</option>
                  <option value="She/Her">She/Her</option>
                  <option value="They/Them">They/Them</option>
                </Select>
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.describe?.message}
                </Text>
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">House Name</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('House_Name')}
                />
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.House_Name?.message}
                </Text>
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
              mb="10px"
            >
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Mobile Number</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('Mobile')}
                />
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.Mobile?.message}
                </Text>
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Can you be a mentor</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('Mentor')}
                />
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Street Name</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('Street')}
                />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
              mb="10px"
            >
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Email</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('Email')}
                />
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.Email?.message}
                </Text>
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Select your campus</Text>
                <Select placeholder="I prefer to use the pronoun" {...register('College')}>
                  <option value="He/Him">He/Him</option>
                  <option value="She/Her">She/Her</option>
                  <option value="They/Them">They/Them</option>
                </Select>
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.College?.message}
                </Text>
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">District</Text>
                <Select placeholder="Select Your District">
                  {District.map((el) => (
                    <option value={el.value}>{el.label}</option>
                  ))}
                </Select>
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
              mb="10px"
            >
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Date of Birth</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('DOB')}
                />
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.DOB?.message}
                </Text>
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Skill</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('My_Skills')}
                />
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.My_Skills?.message}
                </Text>
              </Box>
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Pincode</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('Pincode')}
                />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: '10px', lg: '120px' }}
              direction={{ base: 'column', lg: 'row' }}
              mb="10px"
            >
              <Box w={{ base: '400px', lg: '250px' }}>
                <Text color="black">Preferred pronoun</Text>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="Filled"
                  background="rgba(240, 240, 240, 1)"
                  color="black"
                  _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                  disabled={edit}
                  {...register('Pronoun')}
                />
              </Box>
            </Stack>
          </Flex>
        </form>
      </Box>
    </LayoutSignOut>
  );
};

export default Index;
