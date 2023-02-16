/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { OptionBase, Select } from 'chakra-react-select';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { InferType } from 'yup';
import { useAuthCtx } from '../../../hooks';
import { firstFormValidator } from '../../wizard';
import { IsEdit } from '../types';

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

export const RowOne = ({ isEdit }: IsEdit) => {
  // Auth context use
  const { user: userInfo } = useAuthCtx();

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FormType>();

  useEffect(() => {
    // if dont want to do this we might need to change the whole validation schema
    if (userInfo?.email) {
      setValue('email', userInfo?.email);
    }
    if (userInfo?.pronoun) {
      setValue('pronoun', { label: userInfo.pronoun, value: userInfo.pronoun });
    }
    if (userInfo?.name) {
      setValue('name', userInfo?.name);
    }
    if (userInfo?.dob) {
      setValue('dob', dayjs(userInfo?.dob).format('YYYY-MM-DD'));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <VStack spacing={2} align="stretch" w="100%">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Name" isInvalid={!!errors.name} id="FullName">
          <FormLabel>Name</FormLabel>
          <Input variant="filled" placeholder="JhonDoe" {...register('name')} isDisabled={isEdit} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="space-between" mt="29px">
        <FormLabel>Mobile Number</FormLabel>
        <Input type="string" isDisabled value={userInfo?.mobile} />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="Email" isInvalid={!!errors.email} id="Email">
          <FormLabel>Email</FormLabel>
          <Input {...register('email')} value={userInfo?.email} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormControl label="DOB" isInvalid={!!errors.dob} id="DOB">
          <FormLabel>Date of Birth</FormLabel>
          <Input {...register('dob')} type="date" isDisabled={isEdit} />
          <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between" mb="30px">
        <Controller
          control={control}
          name="pronoun"
          render={({ field, fieldState: { error: proError } }) => (
            <FormControl label="Pronoun" isInvalid={!!proError} id="Pronoun">
              <FormLabel>Prefered Pronoun</FormLabel>
              <Select options={PronounOpt} {...field} isDisabled={isEdit} />
              {proError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
            </FormControl>
          )}
        />
      </Box>
    </VStack>
  );
};
