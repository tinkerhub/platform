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
import { useFormContext, Controller } from 'react-hook-form';
import { Select as MultiSeclect, OptionBase, GroupBase } from 'chakra-react-select';
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

const PronounOpt: Options[] = [
  { label: 'He/Him', value: 'He/Him' },
  { label: 'She/Her', value: 'She/Her' },
  { label: 'They/Them', value: 'They/Them' },
];

export const Two = () => {
  const {
    // register,
    formState: { errors },
    control,
  } = useFormContext<Form>();

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px">
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <Controller
            control={control}
            name="describe"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <>
                <FormControl>
                  <FormLabel>Select your Pronoun</FormLabel>
                  <MultiSeclect<Options, true, GroupBase<Options>>
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    options={PronounOpt}
                    placeholder="Select Your Pronoun"
                    closeMenuOnSelect
                    size="md"
                  />
                </FormControl>
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.Pronoun?.message}
                </Text>
              </>
            )}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="15px"
        >
          <Controller
            control={control}
            name="My_Skills"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <>
                <FormControl>
                  <FormLabel>Select your Skills</FormLabel>
                  <MultiSeclect<Options, true, GroupBase<Options>>
                    isMulti
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    options={Skills}
                    placeholder="Select Your Skills"
                    closeMenuOnSelect
                    size="md"
                  />
                </FormControl>
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.My_Skills?.message}
                </Text>
              </>
            )}
          />
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
          <Controller
            control={control}
            name="College"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <>
                <FormControl>
                  <FormLabel>Select your campus</FormLabel>
                  <MultiSeclect<Options, true, GroupBase<Options>>
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    options={PronounOpt}
                    placeholder="Select Your Campus"
                    closeMenuOnSelect
                    size="md"
                  />
                </FormControl>
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.College?.message}
                </Text>
              </>
            )}
          />
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
