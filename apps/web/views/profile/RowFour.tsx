/* eslint-disable react/jsx-props-no-spreading */
import { Stack, FormControl, FormLabel, Input, FormErrorMessage, Box } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '../../types';
import { ControlledSelect } from '../wizard';
import { Skills } from '../wizard/Two';
import { IsEdit, PronounOpt } from './types';

export const RowFour = ({ edit }: IsEdit) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Form>();

  return (
    <>
      <Stack
        spacing={{ base: '10px', lg: '120px' }}
        direction={{ base: 'column', lg: 'row' }}
        mb="10px"
      >
        <Box width={{ lg: '215px' }}>
          <FormControl label="DOB" isInvalid={!!errors.DOB} id="DOB">
            <FormLabel>Date of Birth</FormLabel>
            <Input {...register('DOB')} type="date" disabled={edit} />
            <FormErrorMessage>{errors.DOB?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box width={{ lg: '240px' }}>
          <ControlledSelect
            isMulti
            name="My_Skills"
            control={control}
            label="Pick your skills"
            placeholder="Python"
            options={Skills}
            closeMenuOnSelect
            isDisabled={edit}
            size="md"
          />
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
          <ControlledSelect
            name="Pronoun"
            control={control}
            label="Pronoun"
            placeholder="Select Your Pronoun"
            options={PronounOpt}
            closeMenuOnSelect
            isDisabled={edit}
            size="md"
          />
        </Box>
      </Stack>
    </>
  );
};
