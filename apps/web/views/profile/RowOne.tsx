/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { OptionBase, Select } from 'chakra-react-select';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
import { useAuthCtx } from '../../hooks';
import { firstFormValidator } from '../wizard';
import { IsEdit } from './types';

interface Options extends OptionBase {
  label: string;
  value: string;
}

const PronounOpt: Options[] = [
  { label: 'He/Him', value: 'He/Him' },
  { label: 'She/Her', value: 'She/Her' },
  { label: 'They/Them', value: 'They/Them' },
];
type FormType = InferType<typeof firstFormValidator>;

export const RowOne = ({ edit }: IsEdit) => {
  // Auth context use
  const { user: userInfo } = useAuthCtx();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormType>();

  return (
    <VStack spacing={2} align="stretch" mt="15px" w="100%">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Name" isInvalid={!!errors.FullName} id="FullName">
          <FormLabel>Name</FormLabel>
          <Input
            defaultValue={userInfo?.name}
            mt="7px"
            variant="filled"
            placeholder="JhonDoe"
            {...register('FullName')}
            isDisabled={edit}
          />
          <FormErrorMessage>{errors.FullName?.message}</FormErrorMessage>
        </FormControl>
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="space-between" mt="29px">
        <FormControl label="Mobile" isInvalid={!!errors.Mobile} id="Mobile">
          <FormLabel>Mobile Number</FormLabel>
          <Input
            {...register('Mobile')}
            type="number"
            isDisabled={edit}
            defaultValue={userInfo?.mobile}
          />
          <FormErrorMessage>{errors.Mobile?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Email" isInvalid={!!errors.Email} id="Email">
          <FormLabel>Email</FormLabel>
          <Input {...register('Email')} isDisabled={edit} defaultValue={userInfo?.email} />
          <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="DOB" isInvalid={!!errors.DOB} id="DOB">
          <FormLabel>Date of Birth</FormLabel>
          <Input
            {...register('DOB')}
            type="date"
            isDisabled={edit}
            defaultValue={userInfo?.dob?.toString()}
          />
          <FormErrorMessage>{errors.DOB?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between" mb="30px">
        <Controller
          control={control}
          name="Pronoun"
          render={({ field, fieldState: { error: proError } }) => (
            <FormControl label="Pronoun" isInvalid={!!proError} id="Pronoun">
              <FormLabel>Prefered Pronoun</FormLabel>
              <Select defaultValue={PronounOpt[0]} options={PronounOpt} {...field} />
              {proError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
            </FormControl>
          )}
        />
      </Box>
    </VStack>
  );
};
