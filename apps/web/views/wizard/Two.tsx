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
import { useController, useFormContext } from 'react-hook-form';
import { GroupBase, OptionBase, Select } from 'chakra-react-select';
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
  const {
    field: { onChange: skillChange, onBlur: oskillBlur, ref: skillRef, value: skillValue },
    fieldState: { error: skillError },
  } = useController({
    name: 'My_Skills',
    control,
  });

  useEffect(() => {
    const val = watch('describe')?.value;
    setProf(val || 'Student');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('describe')]);

  const {
    field: { onChange: descChange, onBlur: odescBlur, ref: descRef, value: descValue },
    fieldState: { error: descError },
  } = useController({
    name: 'describe',
    control,
  });

  const {
    field: { onChange: campusChange, onBlur: campusBlur, ref: campusRef, value: campusVal },
    fieldState: { error: campusError },
  } = useController({
    name: 'College',
    control,
  });

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'Mentor',
    control,
  });

  const {
    field: { onChange: activeChange, ref: activeRef, value: activeVal, onBlur: activeBlur },
    fieldState: { error: activeError },
  } = useController({
    name: 'CampusCommunityActive',
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
            <Select
              defaultValue={Desp[0]}
              options={Desp}
              ref={descRef}
              name="describe"
              onChange={descChange}
              onBlur={odescBlur}
              value={descValue}
            />
            <FormErrorMessage>{descError?.message}</FormErrorMessage>
          </FormControl>
        </Box>
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
            <FormControl label="community" isInvalid={!!descError} id="community">
              <FormLabel>Tinkerhub campus community is active</FormLabel>
              <Select
                options={Comm}
                ref={activeRef}
                name="CampusCommunityActive"
                onChange={activeChange}
                onBlur={activeBlur}
                value={activeVal}
              />
              <FormErrorMessage>{activeError?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        )}
        {prof === 'Student' && (
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
                value={skillValue}
              />
              <FormErrorMessage>{skillError?.message}</FormErrorMessage>
            </FormControl>
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
          <Box
            display="flex"
            flexDirection="column"
            h="75px"
            justifyContent="space-between"
            mt="15px"
          >
            <FormControl label="College" isInvalid={!!campusError} id="College">
              <FormLabel>I currently study at</FormLabel>
              <Select
                options={Skills}
                ref={campusRef}
                name="College"
                onChange={campusChange}
                onBlur={campusBlur}
                value={campusVal}
              />
              <FormErrorMessage>{campusError?.message}</FormErrorMessage>
            </FormControl>
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
