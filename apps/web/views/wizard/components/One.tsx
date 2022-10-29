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
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { InferType } from 'yup';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, OptionBase } from 'chakra-react-select';
import { firstFormValidator } from '../validator';

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
    setFocus('name');
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
          <FormControl label="Name" isInvalid={!!errors.name} id="FullName">
            <FormLabel>Name</FormLabel>
            <Input variant="filled" placeholder="JhonDoe" {...register('name')} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="Email" isInvalid={!!errors.email} id="Email">
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="DOB" isInvalid={!!errors.dob} id="DOB">
            <FormLabel>Date of Birth</FormLabel>
            <Input {...register('dob')} type="date" />
            <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            name="pronoun"
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
            _hover={{ cursor: 'pointer', bg: '#1328EC' }}
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
