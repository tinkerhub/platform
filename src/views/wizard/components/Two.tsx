/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useCallback } from 'react';
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
import { useFormContext, Controller } from 'react-hook-form';
import { OptionBase, Select, AsyncSelect, AsyncCreatableSelect } from 'chakra-react-select';
import { debounce } from '@/utils';
import {getCollege, getSkills} from "@/api/firebase";

interface Options extends OptionBase {
  label: string;
  value: string | boolean;
}

export const Desp: Options[] = [
  { label: 'Student', value: 'Student' },
  { label: 'Professional', value: 'Professional' },
];

export const Two = () => {
  const { control, watch, setValue } = useFormContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCollegedebounced = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      getCollege(inputValue).then((options) => {
        callback(options);
      });
    }),
    []
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadSkillsdeBounced = useCallback(
    debounce((_: string, callback: (options: any) => void) => {
      getSkills().then((options) => {
        callback(options);
      });
    }),
    []
  );

  const yaerOfPassout = new Array(6).fill(null).map((_, index) => ({
    label: dayjs().year() + index,
    value: dayjs().year() + index,
  }));

  const role = watch('description')?.value;

  useEffect(() => {
    if (role === 'Student') {
      setValue('mentor', 'NO');
    }
    if (role === 'Professor') {
      setValue('campusCommunityActive', undefined);
      setValue('skills', undefined);
      setValue('campus', undefined);
      setValue('passyear', null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, setValue]);

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
                    loadOptions={loadSkillsdeBounced}
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
            <Controller
              name="mentor"
              defaultValue="NO"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error: mentorError } }) => (
                <FormControl label="Mentor" isInvalid={!!mentorError} id="Mentor">
                  <FormLabel>Can you be a Mentor</FormLabel>
                  <RadioGroup onChange={onChange} value={value}>
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="blue" value="YES">
                        Yes
                      </Radio>
                      <Radio colorScheme="blue" value="NO">
                        No
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{mentorError?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
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
                  <AsyncCreatableSelect
                    {...field}
                    isClearable
                    defaultOptions
                    loadOptions={loadCollegedebounced}
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
