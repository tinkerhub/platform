/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { OptionBase, Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react';
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
  const [dat, setDat] = useState<string | undefined>(undefined);
  const [proIndex, setProIndex] = useState<number>(2);

  // parsing date to sa sting to call substring function

  useEffect(() => {
    const def = `${userInfo?.dob}`.substring(0, 10);
    const pr = PronounOpt.findIndex((el) => el.value === userInfo?.pronoun);
    setProIndex(pr);
    setDat(def);
  }, [userInfo]);

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FormType>();

  useEffect(() => {
    // if dont want to do this we might need to change the whole validation schema
    if (userInfo?.email) {
      setValue('Email', userInfo?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

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
        <FormLabel>Mobile Number</FormLabel>
        <Input type="string" isDisabled value={userInfo?.mobile} />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Email" isInvalid={!!errors.Email} id="Email">
          <FormLabel>Email</FormLabel>
          <Input {...register('Email')} isDisabled value={userInfo?.email} />
          <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="DOB" isInvalid={!!errors.DOB} id="DOB">
          <FormLabel>Date of Birth</FormLabel>
          <Input {...register('DOB')} type="date" isDisabled={edit} defaultValue={dat} />
          <FormErrorMessage>{errors.DOB?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between" mb="30px">
        <Controller
          defaultValue={PronounOpt[proIndex]}
          control={control}
          name="Pronoun"
          render={({ field, fieldState: { error: proError } }) => (
            <FormControl label="Pronoun" isInvalid={!!proError} id="Pronoun">
              <FormLabel>Prefered Pronoun</FormLabel>
              <Select options={PronounOpt} {...field} isDisabled={edit} />
              {proError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
            </FormControl>
          )}
        />
      </Box>
    </VStack>
  );
};
