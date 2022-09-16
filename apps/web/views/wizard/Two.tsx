/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Form } from '../../types';
import { Prop } from './One';

export const Two = ({ next }: Prop) => {
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
          <Text color="black">Best way to describe yourself</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('describe')} type="string" />
          <Text color="red" fontSize="12px">
            {errors.describe?.message}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="15px"
        >
          <Text color="black">Skill</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('My_Skills')} type="string" />
          <Text color="red" fontSize="12px">
            {errors.My_Skills?.message}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="60px"
          justifyContent="space-between"
          mt="15px"
        >
          <Text color="black">Can you be a Mentor</Text>
          <RadioGroup defaultValue="2">
            <Stack spacing={5} direction="row">
              <Radio colorScheme="blue" value="1">
                Yes
              </Radio>
              <Radio colorScheme="blue" value="2">
                No
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="15px"
        >
          <Text color="black">Select Your campus</Text>
          <Input bg="rgba(240, 240, 240, 1)" {...register('College')} />
          <Text color="red" fontSize="12px">
            {errors.College?.message}
          </Text>
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
