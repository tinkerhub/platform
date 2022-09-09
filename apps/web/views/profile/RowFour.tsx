/* eslint-disable react/jsx-props-no-spreading */
import { Stack, FormControl, FormLabel, Input, FormErrorMessage, Box } from '@chakra-ui/react';
import { GroupBase, OptionBase, Select } from 'chakra-react-select';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form } from '../../types';
import { Skills } from '../wizard/Two';
import { IsEdit, PronounOpt } from './types';

interface Options extends OptionBase {
  label: string;
  value: string;
}

export const RowFour = ({ edit }: IsEdit) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Form>();

  const {
    field: { onChange: skillChange, onBlur: oskillBlur, ref: skillRef },
    fieldState: { error: skillError },
  } = useController({
    name: 'My_Skills',
    control,
  });

  const {
    field: { onChange: onPronounChange, onBlur: onPronounBlur, ref: PronounRef },
    fieldState: { error: PronounError },
  } = useController({
    name: 'Pronoun',
    control,
  });
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
          <FormControl label="Skills" isInvalid={!!skillError} id="Skills">
            <FormLabel>Select Your Skill</FormLabel>
            <Select<Options, true, GroupBase<Options>>
              isMulti
              options={Skills}
              ref={skillRef}
              placeholder="Python"
              name="signupReasons"
              onChange={skillChange}
              onBlur={oskillBlur}
              closeMenuOnSelect
              isDisabled={edit}
              size="md"
              value={null}
            />
            <FormErrorMessage>{skillError?.message}</FormErrorMessage>
          </FormControl>
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
          <FormControl label="Pronoun" isInvalid={!!PronounError} id="Pronoun">
            <FormLabel>Prefered pronoun</FormLabel>
            <Select<Options, true, GroupBase<Options>>
              options={PronounOpt}
              ref={PronounRef}
              name="signupReasons"
              onChange={onPronounChange}
              onBlur={onPronounBlur}
              value={null}
            />
            <FormErrorMessage>{PronounError?.message}</FormErrorMessage>
          </FormControl>
        </Box>
      </Stack>
    </>
  );
};
