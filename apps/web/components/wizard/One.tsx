/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Input, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Form } from '../../pages/profile';
import { WizardContext } from '../../context/wizardContext';

export interface Prop {
  next: () => void;
}

export const One = ({ next }: Prop) => {
  const wizardCtx = useContext(WizardContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const getData = (data: Form) => {
    wizardCtx.addData(data);
    next();
  };

  return (
    <form onSubmit={handleSubmit(getData)}>
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <Box mt="30px">
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">Name</Text>
            <Input
              bg="rgba(240, 240, 240, 1)"
              {...register('name', {
                required: true,
              })}
              type="string"
            />
            {errors.name && (
              <Text color="red" fontSize="12px">
                *please enter your name
              </Text>
            )}
          </Box>
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">Mobile Number</Text>
            <Input
              bg="rgba(240, 240, 240, 1)"
              {...register('mobile', {
                required: true,
              })}
              type="number"
            />
            {errors.mobile && (
              <Text color="red" fontSize="12px">
                *please enter your mobile number
              </Text>
            )}
          </Box>
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">Email</Text>
            <Input
              type="email"
              bg="rgba(240, 240, 240, 1)"
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && (
              <Text color="red" fontSize="12px">
                *please enter your email id
              </Text>
            )}
          </Box>
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">Date of Birth</Text>
            <Input
              bg="rgba(240, 240, 240, 1)"
              {...register('dob', {
                required: true,
              })}
            />
            {errors.dob && (
              <Text color="red" fontSize="12px">
                *please enter your DOB
              </Text>
            )}
          </Box>
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">Preferred pronoun</Text>
            <Input bg="rgba(240, 240, 240, 1)" {...register('pronoun')} />
          </Box>
          <Box mt="25px">
            <Button colorScheme="blue" width="100%" type="submit">
              Next
            </Button>
          </Box>
        </Box>
      </motion.div>
    </form>
  );
};
