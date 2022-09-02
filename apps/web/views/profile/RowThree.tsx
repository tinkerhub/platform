/* eslint-disable react/jsx-props-no-spreading */
import { Stack, FormControl, FormLabel, Input, FormErrorMessage, Box } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '../../types';
import { ControlledSelect } from '../wizard';
import { District } from '../wizard/Three';
import { IsEdit, Options } from './types';

const PronounOpt: Options[] = [
  { label: 'He/Him', value: 'He/Him' },
  { label: 'She/Her', value: 'She/Her' },
  { label: 'They/Them', value: 'They/Them' },
];

export const RowThree: React.FC<IsEdit> = ({ edit }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Form>();

  return (
    <Stack
      spacing={{ base: '10px', lg: '120px' }}
      direction={{ base: 'column', lg: 'row' }}
      mb="10px"
    >
      <Box>
        <FormControl label="Email" isInvalid={!!errors.Email} id="Email">
          <FormLabel>Email</FormLabel>
          <Input {...register('Email')} disabled={edit} />
          <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box width={{ lg: '240px' }}>
        <ControlledSelect
          name="College"
          control={control}
          label="Pick Your college"
          placeholder="Gec.."
          options={PronounOpt}
          closeMenuOnSelect
          isDisabled={edit}
          size="md"
        />
      </Box>
      <Box width={{ lg: '220px' }}>
        <ControlledSelect
          name="District"
          control={control}
          label="Pick Your District"
          placeholder="Kozhikode"
          options={District}
          closeMenuOnSelect
          isDisabled={edit}
          size="md"
        />
      </Box>
    </Stack>
  );
};
