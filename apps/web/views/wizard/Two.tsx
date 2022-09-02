/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Radio, RadioGroup, Stack, FormLabel } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { OptionBase } from 'chakra-react-select';
import { Form } from '../../types';
import { ControlledSelect } from './ControlledSelect';

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
  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px">
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <ControlledSelect
            name="describe"
            control={control}
            label="Best way to describe yourslef"
            placeholder="Student"
            options={Desp}
          />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
          <ControlledSelect
            isMulti
            name="My_Skills"
            control={control}
            label="Pick your skills"
            placeholder="Python"
            options={Skills}
          />
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
          <ControlledSelect
            name="College"
            control={control}
            label="Pick Your college"
            placeholder="Gec.."
            options={[{ label: 'hello', value: 'hello' }]}
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
