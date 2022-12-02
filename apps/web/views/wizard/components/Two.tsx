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
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useController, useFormContext, Controller } from 'react-hook-form';
import { OptionBase, Select, AsyncSelect } from 'chakra-react-select';
import { platformAPI } from '../../../config';

interface Options extends OptionBase {
  label: string;
  value: string | boolean;
}

export const Desp: Options[] = [
  { label: 'Student', value: 'Student' },
  { label: 'Professional', value: 'Professional' },
];

export interface Clg {
  name: string;
  id: string;
}
export const Two = () => {
  const { control, watch, setValue } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputValue, setInputValue] = useState<string>('');

  const getCollege = async (input: string) => {
    const { data } = await platformAPI.get(`/college?search=${input}&limit=20&page=1`);
    // pushing the fetched data to a array to make sure that it is in right format
    const college = data.map((el: Clg) => ({ label: el.name, value: el.id }));
    return college;
  };

  const getSkills = async () => {
    const { data } = await platformAPI.get(`/skills?limit=20&page=1`);
    // pushing the fetched data to a array to make sure that it is in right format
    const skills = data.map((el: Clg) => ({ label: el.name, value: el.id }));
    return skills;
  };

  // handle input change event
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const yaerOfPassout = new Array(5).fill(null).map((el, index) => ({
    label: dayjs().year() + index,
    value: dayjs().year() + index,
  }));

  const role = watch('description')?.value;

  useEffect(() => {
    if (role === 'Student') {
      setValue('mentor', false);
    }
    if (role === 'Professor') {
      setValue('campusCommunityActive', undefined);
      setValue('skills', undefined);
      setValue('campus', undefined);
      setValue('passyear', null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, setValue]);

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'mentor',
    control,
  });

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <VStack mt="30px" spacing={4} align="stretch">
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error: descError } }) => (
              <FormControl label="describe" isInvalid={!!descError} id="describe">
                <FormLabel>Best way to describe yourself</FormLabel>
                <Select options={Desp} {...field} />
                {descError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
              </FormControl>
            )}
          />
        </Box>
        {role === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Controller
              control={control}
              name="skills"
              render={({ field, fieldState: { error: skillError } }) => (
                <FormControl label="My_Skills" isInvalid={!!skillError} id="My_Skills">
                  <FormLabel>Your skills</FormLabel>
                  <AsyncSelect
                    {...field}
                    isClearable
                    defaultOptions
                    loadOptions={getSkills}
                    onInputChange={handleInputChange}
                    isMulti
                  />
                  {skillError && <FormErrorMessage>Pick 5 skills maximum</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
        {role === 'Professional' && (
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
        {role === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Controller
              control={control}
              name="collegeId"
              render={({ field, fieldState: { error: collegeErr } }) => (
                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                  <FormLabel>I currenlty study at</FormLabel>
                  <AsyncSelect
                    {...field}
                    isClearable
                    defaultOptions
                    loadOptions={getCollege}
                    onInputChange={handleInputChange}
                  />
                  {collegeErr && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
        {role === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Controller
              control={control}
              name="passYear"
              render={({ field, fieldState: { error: descError } }) => (
                <FormControl label="Passout" isInvalid={!!descError} id="Passout">
                  <FormLabel>Year of Passout</FormLabel>
                  <Select options={yaerOfPassout} {...field} />
                  {descError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
        <Box mt="25px">
          <Button
            marginTop="16px"
            colorScheme="blue"
            width="100%"
            type="submit"
            color="white"
            _hover={{ cursor: 'pointer', bg: '#1328EC' }}
            backgroundColor="rgba(65, 83, 240, 1)"
          >
            Next
          </Button>
        </Box>
      </VStack>
    </motion.div>
  );
};
