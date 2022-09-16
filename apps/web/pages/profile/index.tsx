/* eslint-disable react/jsx-props-no-spreading */
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
  RadioGroup,
  Radio,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Select as MultiSeclect, OptionBase, GroupBase } from 'chakra-react-select';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormValidator } from '../../views/wizard';
import { Form } from '../../types';
import { Skills } from '../../views/wizard/Two';
import { District } from '../../views/wizard/Three';

interface Options extends OptionBase {
  label: string;
  value: string;
}

const PronounOpt: Options[] = [
  { label: 'He/Him', value: 'He/Him' },
  { label: 'She/Her', value: 'She/Her' },
  { label: 'They/Them', value: 'They/Them' },
];

const Index: NextPage = () => {
  const router = useRouter();

  const [edit, setEdit] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    setFocus,
    control,
    formState: { errors },
  } = useForm<Form>({ mode: 'all', resolver: yupResolver(registerFormValidator) });

  const toast = useToast();

  const editHandler = () => {
    setEdit(false);
    // name input gets focused after pressing edit button
    setFocus('FullName');
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
              <FormControl label="Name" isInvalid={!!errors.FullName} id="FullName">
                <FormLabel>Name</FormLabel>
                <Input mt="7px" variant="filled" placeholder="JhonDoe" {...register('FullName')} />
                <FormErrorMessage mb="20px">{errors.FullName?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box width={{ lg: '240px' }}>
              <Controller
                control={control}
                name="describe"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <>
                    <FormControl>
                      <FormLabel>Best way to describe yourself</FormLabel>
                      <MultiSeclect<Options, true, GroupBase<Options>>
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        options={PronounOpt}
                        placeholder="I am"
                        closeMenuOnSelect
                        isDisabled={edit}
                        size="md"
                      />
                    </FormControl>
                    <Text color="red" fontSize="12px" mt="12px">
                      {errors.Pronoun?.message}
                    </Text>
                  </>
                )}
              />
              <Text color="red" fontSize="12px" mt="12px">
                {errors.describe?.message}
              </Text>
            </Box>
            <Box>
              <FormLabel>House Name</FormLabel>
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
              <FormControl label="Mobile" isInvalid={!!errors.Mobile} id="Mobile">
                <FormLabel>Mobile Number</FormLabel>
                <Input {...register('Mobile')} type="number" />
                <FormErrorMessage>{errors.Mobile?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box width={{ lg: '245px' }}>
              <FormLabel>Can you be a Mentor</FormLabel>
              <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="blue" value="1">
                    Yes
                  </Radio>
                  <Radio colorScheme="blue" value="2">
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Street Name</FormLabel>
                <Input
                  mt="7px"
                  variant="filled"
                  placeholder="kochi"
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
              <FormControl label="Email" isInvalid={!!errors.Email} id="Email">
                <FormLabel>Email</FormLabel>
                <Input {...register('Email')} />
                <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box width={{ lg: '240px' }}>
              <Controller
                control={control}
                name="College"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <>
                    <FormControl>
                      <FormLabel>Select your campus</FormLabel>
                      <MultiSeclect<Options, true, GroupBase<Options>>
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        options={PronounOpt}
                        placeholder="Select Your Campus"
                        closeMenuOnSelect
                        isDisabled={edit}
                        size="md"
                      />
                    </FormControl>
                    <Text color="red" fontSize="12px" mt="12px">
                      {errors.College?.message}
                    </Text>
                  </>
                )}
              />
            </Box>
            <Box width={{ lg: '220px' }}>
              <Controller
                control={control}
                name="District"
                render={({
                  field: { onChange, onBlur, name, ref },
                  fieldState: { error: DistrictError },
                }) => (
                  <>
                    <FormControl>
                      <FormLabel>Select your District</FormLabel>
                      <MultiSeclect<Options, true, GroupBase<Options>>
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        options={District}
                        placeholder="Select Your District"
                        closeMenuOnSelect
                        isDisabled={edit}
                        size="md"
                      />
                    </FormControl>
                    <Text color="red" fontSize="12px" mt="12px">
                      {DistrictError?.message}
                    </Text>
                  </>
                )}
              />
            </Box>
          </Stack>
          <Stack
            spacing={{ base: '10px', lg: '120px' }}
            direction={{ base: 'column', lg: 'row' }}
            mb="10px"
          >
            <Box width={{ lg: '220px' }}>
              <FormControl label="DOB" isInvalid={!!errors.DOB} id="DOB">
                <FormLabel>Date of Birth</FormLabel>
                <Input {...register('DOB')} type="date" />
                <FormErrorMessage>{errors.DOB?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box width={{ lg: '240px' }}>
              <Controller
                control={control}
                name="My_Skills"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <>
                    <FormControl>
                      <FormLabel>Select your Skills</FormLabel>
                      <MultiSeclect<Options, true, GroupBase<Options>>
                        isMulti
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        options={Skills}
                        placeholder="Select Your Skills"
                        closeMenuOnSelect
                        isDisabled={edit}
                        size="md"
                      />
                    </FormControl>
                    <Text color="red" fontSize="12px" mt="12px">
                      {errors.My_Skills?.message}
                    </Text>
                  </>
                )}
              />
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
                  type="number"
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
            <Box width={{ lg: '220px' }}>
              <Controller
                control={control}
                name="Pronoun"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <>
                    <FormControl>
                      <FormLabel>Select your Pronoun</FormLabel>
                      <MultiSeclect<Options, true, GroupBase<Options>>
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        options={PronounOpt}
                        placeholder="Select Your Pronoun"
                        closeMenuOnSelect
                        isDisabled={edit}
                        size="md"
                      />
                    </FormControl>
                    <Text color="red" fontSize="12px" mt="12px">
                      {errors.Pronoun?.message}
                    </Text>
                  </>
                )}
              />
            </Box>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};

export default Index;
