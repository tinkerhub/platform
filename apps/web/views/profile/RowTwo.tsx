/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '../../types';
import { IsEdit } from './types';

export const RowTwo = ({ edit }: IsEdit) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Form>();
  return (
    <Stack
      spacing={{ base: '10px', lg: '120px' }}
      direction={{ base: 'column', lg: 'row' }}
      mb="10px"
    >
      <Box>
        <FormControl label="Mobile" isInvalid={!!errors.Mobile} id="Mobile">
          <FormLabel>Mobile Number</FormLabel>
          <Input {...register('Mobile')} type="number" disabled={edit} />
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
  );
};
