/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
import { useAuthCtx } from '../../hooks';
import { thirdValidator } from '../wizard';
import { District } from '../wizard/Three';

import { IsEdit } from './types';

type Third = InferType<typeof thirdValidator>;

export const RowThree = ({ edit }: IsEdit) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<Third>();

  const { user: userInfo } = useAuthCtx();

  //  setting default value for select is not possible so setted an initial value
  useEffect(() => {
    if (userInfo?.district) {
      setValue('District', { label: userInfo.district, value: userInfo.district });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <VStack spacing={2} align="stretch" w="100%" mb={{ base: '10px', lg: '67px' }}>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="House_Name" isInvalid={!!errors.House_Name} id="House_Name">
          <FormLabel>House Name</FormLabel>
          <Input
            {...register('House_Name')}
            type="string"
            isDisabled={edit}
            defaultValue={userInfo?.house}
          />
          <FormErrorMessage>{errors.House_Name?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Street" isInvalid={!!errors.Street} id="Street">
          <FormLabel>Street Name</FormLabel>
          <Input {...register('Street')} isDisabled={edit} defaultValue={userInfo?.street} />
          <FormErrorMessage>{errors.Street?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Controller
          control={control}
          name="District"
          render={({ field, fieldState: { error: proError } }) => (
            <FormControl label="District" isInvalid={!!proError} id="District">
              <FormLabel>District</FormLabel>
              <Select options={District} {...field} isDisabled={edit} />
              <FormErrorMessage>Please pick an option</FormErrorMessage>
            </FormControl>
          )}
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Pincode" isInvalid={!!errors.Pincode} id="Pincode">
          <FormLabel>Pincode</FormLabel>
          <Input {...register('Pincode')} isDisabled={edit} defaultValue={userInfo?.pin} />
          <FormErrorMessage>{errors.Pincode?.message}</FormErrorMessage>
        </FormControl>
      </Box>
    </VStack>
  );
};
