/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { InferType } from 'yup';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, OptionBase } from 'chakra-react-select';
import { firstFormValidator } from './validator';

type FormType = InferType<typeof firstFormValidator>;

interface Options extends OptionBase {
  label: string;
  value: string;
}

const PronounOpt: Options[] = [
  { label: 'He/Him', value: 'He/Him' },
  { label: 'She/Her', value: 'She/Her' },
  { label: 'They/Them', value: 'They/Them' },
];

export const One = () => {
  const {
    register,
    setFocus,
    control,
    formState: { errors },
  } = useFormContext<FormType>();

  useEffect(() => {
    setFocus('FullName');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={4} align="stretch" mt="30px">
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="Name" isInvalid={!!errors.FullName} id="FullName">
            <FormLabel>Name</FormLabel>
            <Input variant="filled" placeholder="JhonDoe" {...register('FullName')} />
            <FormErrorMessage>{errors.FullName?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="Email" isInvalid={!!errors.Email} id="Email">
            <FormLabel>Email</FormLabel>
            <Input {...register('Email')} />
            <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="DOB" isInvalid={!!errors.DOB} id="DOB">
            <FormLabel>Date of Birth</FormLabel>
            <Input {...register('DOB')} type="date" />
            <FormErrorMessage>{errors.DOB?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            name="Pronoun"
            render={({ field, fieldState: { error: proError } }) => (
              <FormControl label="Pronoun" isInvalid={!!proError} id="Pronoun">
                <FormLabel>Prefered Pronoun</FormLabel>
                <Select options={PronounOpt} {...field} />
                <FormErrorMessage>Please pick an option</FormErrorMessage>
              </FormControl>
            )}
          />
        </Box>
        <Box>
          <Button
            colorScheme="blue"
            width="100%"
            marginTop="16px"
            type="submit"
            backgroundColor="rgba(65, 83, 240, 1)"
            disabled={false}
            color="white"
          >
            Next
          </Button>
        </Box>
      </VStack>
    </motion.div>
  );
};
