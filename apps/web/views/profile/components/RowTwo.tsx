/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { AsyncSelect, Select } from 'chakra-react-select';
import { useCallback, useEffect } from 'react';
import { Controller, useFormContext, useController } from 'react-hook-form';
import dayjs from 'dayjs';
import { useAuthCtx } from '../../../hooks';
import { Clg, Desp } from '../../wizard/components/Two';
import { IsEdit } from '../types';
import { platformAPI } from '../../../config';
import { debounce } from '../../../utils';

export const RowTwo = ({ isEdit }: IsEdit) => {
  const { control, watch, setValue } = useFormContext();
  const { user: userInfo } = useAuthCtx();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const getCollege = async (input: string) => {
    const { data } = await platformAPI.get(`/college?search=${input}&limit=20&page=1`);
    // pushing the fetched data to a array to make sure that it is in right format
    const college = data.map((el: Clg) => ({ label: el.name, value: el.name }));
    return college;
  };

  const getSkills = async () => {
    const { data } = await platformAPI.get(`/skills?limit=20&page=1`);
    // pushing the fetched data to a array to make sure that it is in right format
    const skills = data.map((el: Clg) => ({ label: el.name, value: el.id }));
    return skills;
  };
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
    debounce((inputValue: string, callback: (options: any) => void) => {
      getSkills().then((options) => {
        callback(options);
      });
    }),
    []
  );

  const role = watch('description')?.value;

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'mentor',
    control,
  });

  const yaerOfPassout = new Array(5).fill(null).map((el, index) => ({
    label: dayjs().year() + index,
    value: dayjs().year() + index,
  }));

  useEffect(() => {
    if (role === 'Student') {
      setValue('mentor', false);
    }

    // setting the value related to opposite of decription to undefined
    // making sure that user wont send data from both student and professionall to DB
    if (role === 'Professional') {
      setValue('campusCommunityActive', null);
      setValue('skills', null);
      setValue('collegeId', null);
      setValue('passYear', null);
    }
  }, [role, setValue]);

  // debounce function to  limit the user search

  useEffect(() => {
    if (userInfo?.description) {
      // setting the state to change on frontend
      setValue('description', { label: userInfo?.description, value: userInfo?.description });
    }

    if (userInfo?.mentor) {
      setValue('mentor', userInfo.mentor ? 1 : 0);
    }
    if (userInfo?.passYear) {
      setValue('passYear', {
        value: userInfo?.passYear?.toString(),
        label: userInfo.passYear.toString(),
      });
    }

    if (userInfo?.college) {
      setValue('collegeId', { label: userInfo.college.name, value: userInfo.college.id });
    }
    if (userInfo?.skills) {
      const skillsArr = userInfo.skills.map((el: Clg) => ({ label: el.name, value: el.id }));
      setValue('skills', skillsArr);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // const customStyles = {
  //   // For the select it self, not the options of the select
  //   control: (styles: any, { isDisabled }: { isDisabled: boolean }) => ({
  //     ...styles,
  //     // This is an example: backgroundColor: isDisabled ? 'rgba(206, 217, 224, 0.5)' : 'white'
  //     color: isDisabled ? 'red' : 'white',
  //   }),
  // };

  return (
    <VStack
      spacing={2}
      align="stretch"
      w="100%"
      height={{ base: '10%', lg: '400px' }}
      mx="90px"
      justifyContent="flex-start"
      mt={{ base: '14px', lg: '0' }}
      mb={{ base: '10px', lg: '0px' }}
    >
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error: descError } }) => (
              <FormControl label="describe" isInvalid={!!descError} id="describe">
                <FormLabel>Best way to describe yourself</FormLabel>
                <Select options={Desp} {...field} isDisabled={isEdit} />
                <FormErrorMessage>Please pick an option</FormErrorMessage>
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
                <FormControl label="skills" isInvalid={!!skillError} id="skills">
                  <FormLabel>Your skills</FormLabel>
                  <AsyncSelect
                    {...field}
                    isDisabled={isEdit}
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
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            mt="15px"
            w="350px"
          >
            <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
              <FormControl label="Mentor" isInvalid={!!mentorError} id="Mentor">
                <FormLabel>Can you be a Mentor</FormLabel>
                <RadioGroup
                  defaultValue={0}
                  ref={mentorRef}
                  onChange={mentorChange}
                  value={Number(mentorVal)}
                  isDisabled={isEdit}
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
          </Box>
        )}
        {role === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="13px">
            <Controller
              control={control}
              name="collegeId"
              render={({ field, fieldState: { error: collegeErr } }) => (
                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                  <FormLabel>I currenlty study at</FormLabel>
                  <AsyncSelect
                    isDisabled={isEdit}
                    {...field}
                    isClearable
                    loadOptions={loadCollegedebounced}
                  />
                  {collegeErr && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
      </Box>
      {role === 'Student' && (
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            name="passYear"
            render={({ field, fieldState: { error: descError } }) => (
              <FormControl label="Passout" isInvalid={!!descError} id="Passout">
                <FormLabel>Year of Passout</FormLabel>
                <Select isDisabled={isEdit} options={yaerOfPassout} {...field} />
                {descError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
              </FormControl>
            )}
          />
        </Box>
      )}
    </VStack>
  );
};
