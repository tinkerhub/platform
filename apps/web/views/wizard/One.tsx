/* eslint-disable react/jsx-props-no-spreading */
import { Box, Text, Select, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Form } from '../../types';

export interface Prop {
  next: () => void;
}

export const One = ({ next }: Prop) => {
  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext<Form>();

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
      <Box mt="30px">
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <FormControl>
            <FormLabel color="black" htmlFor="name">
              FullName
            </FormLabel>
            <Input bg="rgba(240, 240, 240, 1)" {...register('FullName')} id="name" />
            <Text color="red" fontSize="12px">
              {errors.FullName?.message}
            </Text>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="15px"
        >
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
          <Select placeholder="I prefer to use the pronoun" {...register('Pronoun')}>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
          </Select>
        </Box>
        <Box mt="25px">
          <Button
            colorScheme="blue"
            width="100%"
            onClick={next}
            backgroundColor="rgba(65, 83, 240, 1)"
            disabled={false}
            color="white"
          >
            Next
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};
