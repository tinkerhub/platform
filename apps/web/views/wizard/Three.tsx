/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { OptionBase } from 'chakra-react-select';
import { Form } from '../../types';
import { ControlledSelect } from './ControlledSelect';

interface Options extends OptionBase {
  label: string;
  value: string;
}

export const District: Options[] = [
  { value: 'Alappuzha', label: 'Alappuzha' },
  { value: 'Ernakulam', label: 'Ernakulam' },
  { value: 'Idukki', label: 'Idukki' },
  { value: 'Kannur', label: 'Kannur' },
  { value: 'Kasaragod', label: 'Kasaragod' },
  { value: 'Kollam', label: 'Kollam' },
  { value: 'Kottayam', label: 'Kottayam' },
  { value: 'Kozhikode', label: 'Kozhikode' },
  { value: 'Malappuram', label: 'Malappuram' },
  { value: 'Palakkad', label: 'Palakkad' },
  { value: 'Pathanamthitta', label: 'Pathanamthitta' },
  { value: 'Thiruvananthapuram', label: 'Thiruvananthapuram' },
  { value: 'Thrissur', label: 'Thrissur' },
  { value: 'Wayanad', label: 'Wayanad' },
];

export const Three = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Form>();

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={2} align="stretch" mt="10px">
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="House_Name" isInvalid={!!errors.House_Name} id="House_Name">
            <FormLabel>House Name</FormLabel>
            <Input {...register('House_Name')} type="string" />
            <FormErrorMessage>{errors.House_Name?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="Street" isInvalid={!!errors.Street} id="Street">
            <FormLabel>Street Name</FormLabel>
            <Input {...register('Street')} />
            <FormErrorMessage>{errors.Street?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <ControlledSelect
            name="District"
            control={control}
            label="Pick Your District"
            placeholder="Kozhikode"
            options={District}
          />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="Pincode" isInvalid={!!errors.Pincode} id="Pincode">
            <FormLabel>Pincode</FormLabel>
            <Input {...register('Pincode')} />
            <FormErrorMessage>{errors.Pincode?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box mt="25px">
          <Button
            colorScheme="blue"
            width="100%"
            type="submit"
            backgroundColor="rgba(65, 83, 240, 1)"
            color="white"
          >
            Next
          </Button>
        </Box>
      </VStack>
    </motion.div>
  );
};
