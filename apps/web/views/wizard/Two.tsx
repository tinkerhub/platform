/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useController, useFormContext } from 'react-hook-form';
import { GroupBase, OptionBase, Select } from 'chakra-react-select';
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

interface Options extends OptionBase {
  label: string;
  value: string;
}

const Desp: Options[] = [
  { label: 'Student', value: 'Student' },
  { label: 'Profissional', value: 'Professional' },
];

export const Two = () => {
  const { control } = useFormContext<Form>();
  const {
    field: { onChange: skillChange, onBlur: oskillBlur, ref: skillRef },
    fieldState: { error: skillError },
  } = useController({
    name: 'My_Skills',
    control,
  });

  const {
    field: { onChange: descChange, onBlur: odescBlur, ref: descRef },
    fieldState: { error: descError },
  } = useController({
    name: 'describe',
    control,
  });

  const {
    field: { onChange: campusChange, onBlur: campusBlur, ref: campusRef },
    fieldState: { error: campusError },
  } = useController({
    name: 'College',
    control,
  });

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px">
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <FormControl label="describe" isInvalid={!!descError} id="describe">
            <FormLabel>Best way to describe yourself</FormLabel>
            <Select<Options, true, GroupBase<Options>>
              options={Desp}
              ref={descRef}
              name="describe"
              onChange={descChange}
              onBlur={odescBlur}
              value={null}
            />
            <FormErrorMessage>{descError?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
          <FormControl label="Skills" isInvalid={!!skillError} id="Skills">
            <FormLabel>Select Your Skill</FormLabel>
            <Select<Options, true, GroupBase<Options>>
              isMulti
              options={Skills}
              ref={skillRef}
              name="signupReasons"
              onChange={skillChange}
              onBlur={oskillBlur}
              value={null}
            />
            <FormErrorMessage>{skillError?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
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
          <FormControl label="College" isInvalid={!!campusError} id="College">
            <FormLabel>I currently study at</FormLabel>
            <Select<Options, true, GroupBase<Options>>
              options={Skills}
              ref={campusRef}
              name="College"
              onChange={campusChange}
              onBlur={campusBlur}
              value={null}
            />
            <FormErrorMessage>{campusError?.message}</FormErrorMessage>
          </FormControl>
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
