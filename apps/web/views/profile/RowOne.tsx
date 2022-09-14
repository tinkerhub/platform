/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { OptionBase, Select } from 'chakra-react-select';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
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
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormType>();

  const {
    field: { onChange: prochange, onBlur: proBlur, ref: proRef, value: pro },
    fieldState: { error: proError },
  } = useController({
    name: 'Pronoun',
    control,
  });

  return (
    <VStack spacing={2} align="stretch" mt="15px" w="350px" height="425px">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Name" isInvalid={!!errors.FullName} id="FullName">
          <FormLabel>Name</FormLabel>
          <Input
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
          <Input {...register('Mobile')} type="number" isDisabled={edit} />
          <FormErrorMessage>{errors.Mobile?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Email" isInvalid={!!errors.Email} id="Email">
          <FormLabel>Email</FormLabel>
          <Input {...register('Email')} isDisabled={edit} />
          <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="DOB" isInvalid={!!errors.DOB} id="DOB">
          <FormLabel>Date of Birth</FormLabel>
          <Input {...register('DOB')} type="date" isDisabled={edit} />
          <FormErrorMessage>{errors.DOB?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="pronoun" isInvalid={!!proError} id="pronoun">
          <FormLabel>Prefered Pronoun</FormLabel>
          <Select
            isDisabled={edit}
            options={PronounOpt}
            ref={proRef}
            name="Pronoun"
            onChange={prochange}
            onBlur={proBlur}
            value={pro}
          />
          <FormErrorMessage>Please Pick an Option</FormErrorMessage>
        </FormControl>
      </Box>
    </VStack>
  );
};