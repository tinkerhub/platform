/* eslint-disable react/jsx-props-no-spreading */
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Text,
} from '@chakra-ui/react';
import { GroupBase, OptionBase, Select as MultiSeclect } from 'chakra-react-select';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '../../types';
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

export const RowOne = ({ edit }: IsEdit) => {
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
        <FormControl label="Name" isInvalid={!!errors.FullName} id="FullName">
          <FormLabel>Name</FormLabel>
          <Input
            mt="7px"
            variant="filled"
            placeholder="JhonDoe"
            {...register('FullName')}
            disabled={edit}
          />
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
  );
};
