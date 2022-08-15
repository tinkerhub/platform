/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Radio, RadioGroup, Stack, Text, Select } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import makeAnimated from 'react-select/animated';
import MultiSelect from 'react-select';
import { Form } from '../../types';
import { Prop } from './One';

export const Skills = [
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: 'Javascript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Typescript', label: 'Typescript' },
  { value: 'Go', label: 'Go' },
];

export const Two = ({ next }: Prop) => {
  const animatedComponents = makeAnimated();
  const {
    register,
    formState: { errors },
    // control,
  } = useFormContext<Form>();

  // const Skills = ['java', 'js', 'go', 'react', 'html', 'python', 'css', 'angular'];

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px">
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Text color="black">Best way to describe yourself</Text>
          <Select placeholder="I prefer to use the pronoun" {...register('describe')}>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
          </Select>
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

          <MultiSelect
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={Skills}
          />
          <Text color="red" fontSize="12px">
            {errors.My_Skills?.message}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="60px"
          justifyContent="space-between"
          mt="25px"
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
            onClick={next}
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
