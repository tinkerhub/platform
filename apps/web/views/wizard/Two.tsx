/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Select as MultiSeclect } from 'chakra-react-select';
import { Form } from '../../types';

export const Skills = [
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: 'Javascript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Typescript', label: 'Typescript' },
  { value: 'Go', label: 'Go' },
];

export const Two = () => {
  const {
    // register,
    formState: { errors },
    // control,
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
            <FormLabel>Select your Pronoun</FormLabel>
            <MultiSeclect
              name="campus"
              options={[
                { value: 'He/Him', label: 'He/Him' },
                { value: 'She/Her', label: 'She/Her' },
                { value: 'They/Them', label: 'They/They' },
              ]}
              placeholder="Select Your Pronoun"
              closeMenuOnSelect
              size="md"
            />
            <Text color="red" fontSize="12px" mt="12px">
              {errors.describe?.message}
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
          <FormControl>
            <FormLabel>Select Your skills</FormLabel>
            <MultiSeclect
              isMulti
              name="colors"
              options={Skills}
              placeholder="Select some colors..."
              closeMenuOnSelect={false}
              size="lg"
            />
            <Text color="red" fontSize="12px">
              {errors.My_Skills?.message}
            </Text>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="60px"
          justifyContent="space-between"
          mt="25px"
        >
          <FormLabel>Can you be a Mentor</FormLabel>
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
          <FormControl>
            <FormLabel>Select Your Campus</FormLabel>
            <MultiSeclect
              isMulti
              name="colors"
              options={Skills}
              placeholder="Select some colors..."
              closeMenuOnSelect={false}
              size="lg"
            />
            <Text color="red" fontSize="12px">
              {errors.My_Skills?.message}
            </Text>
          </FormControl>
          <Text color="red" fontSize="12px">
            {errors.College?.message}
          </Text>
        </Box>
        <Box mt="25px">
          <Button
            colorScheme="blue"
            width="100%"
            type="submit"
            color="white"
            backgroundColor="rgba(65, 83, 240, 1)"
          >
            Next
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};
