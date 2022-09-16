/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
import { thirdValidator } from '../wizard';
import { District } from '../wizard/Three';
import { IsEdit } from './types';

type Third = InferType<typeof thirdValidator>;

export const RowThree: React.FC<IsEdit> = ({ edit }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Third>();

  const {
    field: {
      onChange: districtChange,
      onBlur: ndistrictBlur,
      ref: districtRef,
      value: districtValue,
    },
    fieldState: { error: distError },
  } = useController({
    name: 'District',
    control,
  });

  return (
    <VStack spacing={2} align="stretch" w="100%">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="House_Name" isInvalid={!!errors.House_Name} id="House_Name">
          <FormLabel>House Name</FormLabel>
          <Input {...register('House_Name')} type="string" isDisabled={edit} />
          <FormErrorMessage>{errors.House_Name?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Street" isInvalid={!!errors.Street} id="Street">
          <FormLabel>Street Name</FormLabel>
          <Input {...register('Street')} isDisabled={edit} />
          <FormErrorMessage>{errors.Street?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="District" isInvalid={Boolean(distError)} id="District">
          <FormLabel>District</FormLabel>
          <Select
            options={District}
            ref={districtRef}
            name="District"
            onChange={districtChange}
            onBlur={ndistrictBlur}
            value={districtValue}
            isDisabled={edit}
          />
          <FormErrorMessage>{distError?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Pincode" isInvalid={!!errors.Pincode} id="Pincode">
          <FormLabel>Pincode</FormLabel>
          <Input {...register('Pincode')} isDisabled={edit} />
          <FormErrorMessage>{errors.Pincode?.message}</FormErrorMessage>
        </FormControl>
      </Box>
    </VStack>
  );
};
