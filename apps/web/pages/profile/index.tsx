/* eslint-disable react/jsx-props-no-spreading */ /* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { ArrowBackIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Select as MultiSeclect } from 'chakra-react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator } from '../../views/wizard';
import { Form } from '../../types';
import { Skills } from '../../views/wizard/Two';
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
    <Box mt="2" mb="30px">
      <Box>
        <ArrowBackIcon
          // color="black"
          w={8}
          h={8}
          _hover={{ cursor: 'pointer', color: 'grey' }}
          onClick={() => router.back()}
        />
      </Box>
      <form onSubmit={handleSubmit(updateProfile)}>
        <Box display="flex" justifyContent="space-between" mt="4">
          <Box display="flex" justifyContent="space-between">
            <Heading as="h2" size="xl" alignSelf="center">
              My Profile
            </Heading>
            <Heading as="h2" fontSize={{ base: '16px', md: 'md' }} alignSelf="center" pl={5}>
              2852179
            </Heading>
            <CopyIcon
              onClick={copyFile}
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
                width={{ md: '100px' }}
                colorScheme="blue"
                backgroundColor="rgba(65, 83, 240, 1)"
                alignSelf="center"
                onClick={editHandler}
                color="white"
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
                color="white"
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
            <Box>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="JhonDoe"
                  readOnly={edit}
                  {...register('FullName')}
                  disabled={edit}
                />
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.FullName?.message}
                </Text>
              </FormControl>
            </Box>
            <Box width={{ lg: '240px' }}>
              <FormControl>
                <FormLabel>Select your Pronoun</FormLabel>
                <MultiSeclect
                  name="campus"
                  options={[
                    { value: 'He/Him', label: 'He/Him' },
                    { value: 'She/Her', label: 'She/Her' },
                    { value: 'They/Them', label: 'They/They' },
                  ]}
                  placeholder="Select Your Pronoun"
                  closeMenuOnSelect
                  size="md"
                  isDisabled={edit}
                />
              </FormControl>
              <Text color="red" fontSize="12px" mt="12px">
                {errors.describe?.message}
              </Text>
            </Box>
            <Box>
              <Text>House Name</Text>
              <Input
                mt="7px"
                variant="filled"
                placeholder="Home"
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
            <Box>
              <FormControl>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="1234567890"
                  disabled={edit}
                  {...register('Mobile')}
                />
              </FormControl>
              <Text color="red" fontSize="12px" mt="12px">
                {errors.Mobile?.message}
              </Text>
            </Box>
            <Box width={{ lg: '245px' }}>
              <Text>Can you be a mentor</Text>
              <Input
                mt="7px"
                variant="filled"
                placeholder="Filled"
                disabled={edit}
                {...register('Mentor')}
              />
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Street Name</FormLabel>
                <Input
                  mt="7px"
                  variant="Kochi"
                  placeholder="Filled"
                  disabled={edit}
                  {...register('Street')}
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack
            spacing={{ base: '10px', lg: '120px' }}
            direction={{ base: 'column', lg: 'row' }}
            mb="10px"
          >
            <Box>
              <Text>Email</Text>
              <Input
                mt="7px"
                variant="filled"
                placeholder="jhondoe@hotmail.com"
                disabled={edit}
                {...register('Email')}
              />
              <Text color="red" fontSize="12px" mt="12px">
                {errors.Email?.message}
              </Text>
            </Box>
            <Box width={{ lg: '240px' }}>
              <FormControl>
                <FormLabel>Select your campus</FormLabel>
                <MultiSeclect
                  name="campus"
                  options={[
                    { value: 'He/Him', label: 'He/Him' },
                    { value: 'She/Her', label: 'She/Her' },
                    { value: 'They/Them', label: 'They/They' },
                  ]}
                  placeholder="Select Your Campus"
                  closeMenuOnSelect
                  isDisabled={edit}
                  size="md"
                />
              </FormControl>
              <Text color="red" fontSize="12px" mt="12px">
                {errors.College?.message}
              </Text>
            </Box>
            <Box width={{ lg: '220px' }}>
              <FormControl width="100%">
                <FormLabel>Select your District</FormLabel>
                <MultiSeclect
                  name="campus"
                  options={District}
                  placeholder="Select Your District"
                  closeMenuOnSelect
                  size="md"
                  isDisabled={edit}
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack
            spacing={{ base: '10px', lg: '120px' }}
            direction={{ base: 'column', lg: 'row' }}
            mb="10px"
          >
            <Box width={{ lg: '220px' }}>
              <Text>Date of Birth</Text>
              <Input
                mt="7px"
                variant="filled"
                placeholder="12-12-12"
                disabled={edit}
                {...register('DOB')}
                type="date"
              />
              <Text color="red" fontSize="12px" mt="12px">
                {errors.DOB?.message}
              </Text>
            </Box>
            <Box width={{ lg: '240px' }}>
              <FormControl>
                <FormLabel>Select Your skills</FormLabel>
                <MultiSeclect
                  isMulti
                  name="colors"
                  options={Skills}
                  placeholder="Select Your Skills"
                  closeMenuOnSelect={false}
                  size="md"
                  isDisabled={edit}
                />
                <Text color="red" fontSize="12px">
                  {errors.My_Skills?.message}
                </Text>
              </FormControl>
              <Text color="red" fontSize="12px" mt="12px">
                {errors.My_Skills?.message}
              </Text>
            </Box>
            <Box width={{ lg: '220px' }}>
              <FormControl>
                <FormLabel>Pincode</FormLabel>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="672215"
                  disabled={edit}
                  {...register('Pincode')}
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack
            spacing={{ base: '10px', lg: '120px' }}
            direction={{ base: 'column', lg: 'row' }}
            mb="10px"
          >
            {/* <Box>
              <Text>Preferred pronoun</Text>
              <Input
                mt="7px"
                variant="filled"
                placeholder="Filled"
                color="black"
                background="rgba(240, 240, 240, 1)"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
                disabled={edit}
                {...register('Pronoun')}
              />
            </Box> */}
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};

export default Index;
