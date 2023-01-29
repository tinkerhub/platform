/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
import { useAuthCtx } from '../../../hooks';
import { thirdValidator } from '../../wizard';
import { District } from '../../wizard/components/Three';

import { IsEdit } from '../types';

type Third = InferType<typeof thirdValidator>;

export const RowThree = ({ isEdit }: IsEdit) => {
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
      setValue('district', { label: userInfo.district, value: userInfo.district });
    }
    if (userInfo?.house) {
      setValue('house', userInfo.house);
    }
    if (userInfo?.street) {
      setValue('street', userInfo.street);
    }
    if (userInfo?.pin) {
      setValue('pin', userInfo.pin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <VStack spacing={2} align="stretch" w="100%" mb={{ base: '10px', lg: '67px' }}>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="House_Name" isInvalid={!!errors.house} id="House_Name">
          <FormLabel>House Name</FormLabel>
          <Input
            {...register('house')}
            type="string"
            isDisabled={isEdit}
            defaultValue={userInfo?.house}
          />
          <FormErrorMessage>{errors.house?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Street" isInvalid={!!errors.street} id="Street">
          <FormLabel>Street Name</FormLabel>
          <Input {...register('street')} isDisabled={isEdit} defaultValue={userInfo?.street} />
          <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Controller
          defaultValue={null}
          control={control}
          name="district"
          render={({ field, fieldState: { error: proError } }) => (
            <FormControl label="District" isInvalid={!!proError} id="District">
              <FormLabel>District</FormLabel>
              <Select options={District} {...field} isDisabled={isEdit} />
              {proError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
            </FormControl>
          )}
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Pincode" isInvalid={!!errors.pin} id="Pincode">
          <FormLabel>Pincode</FormLabel>
          <Input
            {...register('pin')}
            isDisabled={isEdit}
            defaultValue={userInfo?.pin}
            type="number"
          />
          <FormErrorMessage>{errors.pin?.message}</FormErrorMessage>
        </FormControl>
      </Box>
    </VStack>
  );
};
