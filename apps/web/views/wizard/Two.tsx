/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Select,
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
    register,
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
          <FormControl p={4}>
            <FormLabel color="black">Best way to describe yourself</FormLabel>
            <Select placeholder="I prefer to use the pronoun" {...register('describe')}>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
            </Select>
            <Text color="red" fontSize="12px">
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
          <FormControl p={4}>
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
          <FormLabel color="black">Can you be a Mentor</FormLabel>
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
          <FormLabel color="black">Select Your campus</FormLabel>
          <Select placeholder="I prefer to use the pronoun" {...register('College')}>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
          </Select>
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
