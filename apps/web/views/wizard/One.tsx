/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Form } from '../../types';

export interface Prop {
  next: () => void;
}

export const One = ({ next }: Prop) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Form>();
  // console.log(errors.)
  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px">
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Name</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('FullName')} />
          <Text color="red" fontSize="12px">
            {errors.FullName?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Mobile Number</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('Mobile')} />
          <Text color="red" fontSize="12px">
            {errors.Mobile?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Email</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('Email')} />
          <Text color="red" fontSize="12px">
            {errors.Email?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Date of Birth</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('DOB')} type="date" />
          <Text color="red" fontSize="12px">
            {errors.DOB?.message}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Preferred pronoun</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('Pronoun')} />
        </Box>
        <Box mt="25px">
          <Button colorScheme="blue" width="100%" onClick={next}>
            Next
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};