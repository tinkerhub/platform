/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
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
import { useController, useFormContext, Controller } from 'react-hook-form';
import { OptionBase, Select } from 'chakra-react-select';
// import { InferType } from 'yup';
// import { secondValidator } from './validator';

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
// type StepTwo = InferType<typeof secondValidator>;

export const Desp: Options[] = [
  { label: 'Student', value: 'Student' },
  { label: 'Profissional', value: 'Professional' },
];

export const Comm: Options[] = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const Two = () => {
  const [prof, setProf] = useState<string | null>(null);
  const { control, watch } = useFormContext();

  useEffect(() => {
    const val = watch('describe')?.value;
    setProf(val || 'Student');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('describe')]);

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'Mentor',
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
          <Controller
            control={control}
            name="describe"
            render={({ field, fieldState: { error: descError } }) => (
              <FormControl label="describe" isInvalid={!!descError} id="describe">
                <FormLabel>Best way to describe yourself</FormLabel>
                <Select defaultValue={Desp[0]} options={Desp} {...field} />
                {descError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
              </FormControl>
            )}
          />
        </Box>
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Controller
              control={control}
              name="CampusCommunityActive"
              render={({ field, fieldState: { error: commError } }) => (
                <FormControl
                  label="CampusCommunityActive"
                  isInvalid={!!commError}
                  id="CampusCommunityActive"
                >
                  <FormLabel>Tinkerhub campus community is active</FormLabel>
                  <Select defaultValue={Comm[0]} options={Comm} {...field} />
                  {commError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Controller
              control={control}
              name="My_Skills"
              render={({ field, fieldState: { error: skillError } }) => (
                <FormControl label="My_Skills" isInvalid={!!skillError} id="My_Skills">
                  <FormLabel>Tour skills</FormLabel>
                  <Select defaultValue={Desp[0]} options={Skills} {...field} isMulti />
                  {skillError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
        {prof === 'Professional' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
            <FormControl label="Mentor" isInvalid={!!mentorError} id="Mentor">
              <FormLabel>Can you be a Mentor</FormLabel>
              <RadioGroup
                defaultValue={0}
                ref={mentorRef}
                onChange={mentorChange}
                value={Number(mentorVal)}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="blue" value={1}>
                    Yes
                  </Radio>
                  <Radio colorScheme="blue" value={0}>
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{mentorError?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        )}
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Controller
              control={control}
              name="College"
              render={({ field, fieldState: { error: collegeErr } }) => (
                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                  <FormLabel>I currenlty study at</FormLabel>
                  <Select defaultValue={Desp[0]} options={Skills} {...field} />
                  {collegeErr && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
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
