/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Select as MultiSeclect } from 'chakra-react-select';
import { Form } from '../../types';

export const District = [
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
    formState: { errors },
  } = useFormContext<Form>();

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px">
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <FormControl>
            <FormLabel>House Name</FormLabel>
            <Input {...register('House_Name')} type="string" />
            <Text color="red" fontSize="12px">
              {errors.House_Name?.message}
            </Text>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <FormControl>
            <FormLabel>Street Name</FormLabel>
            <Input {...register('Street')} />
            <Text color="red" fontSize="12px">
              {errors.Street?.message}
            </Text>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <FormControl width="100%">
            <FormLabel>Select your District</FormLabel>
            <MultiSeclect
              name="campus"
              options={District}
              placeholder="Select Your District"
              closeMenuOnSelect
              size="md"
            />
          </FormControl>
          <Text color="red" fontSize="12px">
            {errors.District?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <FormControl>
            <FormLabel>Pincode</FormLabel>
            <Input {...register('Pincode')} />
            <Text color="red" fontSize="12px">
              {errors.Pincode?.message}
            </Text>
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
      </Box>
    </motion.div>
  );
};
