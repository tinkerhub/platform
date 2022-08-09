/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Input, Select, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Form } from '../../types';

export const Three = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Form>();

  const District = [
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

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px">
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">House Name</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('House_Name')} type="string" />
          <Text color="red" fontSize="12px">
            {errors.House_Name?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Street Name</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('Street')} />
          <Text color="red" fontSize="12px">
            {errors.Street?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">District</Text>
          <Select placeholder="Select Your District">
            {District.map((el) => (
              <option value={el.value}>{el.label}</option>
            ))}
          </Select>
          <Text color="red" fontSize="12px">
            {errors.District?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Pincode</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('Pincode')} />
          <Text color="red" fontSize="12px">
            {errors.Pincode?.message}
          </Text>
        </Box>
        <Box mt="25px">
          <Button colorScheme="blue" width="100%" type="submit">
            Next
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};
