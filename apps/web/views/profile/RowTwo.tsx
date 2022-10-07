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
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { useAuthCtx } from '../../hooks';
import { Clg, Comm, Desp, Skills } from '../wizard/Two';
import { IsEdit, Options } from './types';
import { apiHandler } from '../../api';
import { debounce } from '../../utils';

export const RowTwo = ({ edit }: IsEdit) => {
  const { control, watch, setValue } = useFormContext();

  const { user: userInfo } = useAuthCtx();
  const skillArr: Options[] = [];
  // for conditional rendering of prfessional and student
  const [prof, setProf] = useState<string | null>(null);
  // userinfo.skills returns an array of string so converting to a object here and pushing to a array
  userInfo?.skills?.map((el) => skillArr.push({ value: el, label: el }));

  const [inputValue, setInputValue] = useState<string>('');

  const getCollege = async (input: string) => {
    const college: Options[] = [];
    // clearing all the array whenever  function is called
    while (college.length > 0) {
      college.pop();
    }
    const { data } = await apiHandler.get(`/college?search=${input}&limit=20&page=1`);
    // pushing the fetched data to a array to make sure that it is in right format
    data.data.map((el: Clg) => college.push({ label: el.name, value: el.name }));
    return college;
  };

  // handle input change event
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    const val = watch('describe')?.value;
    setProf(val);

    if (prof === 'Student') {
      setValue('mentor', null);
    }

    // setting the value related to opposite of decription to undefined
    // making sure that user wont send data from both student and professionall to DB
    if (prof === 'Professional') {
      setValue('CampusCommunityActive', null);
      setValue('My_Skills', null);
      setValue('College', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('describe')]);

  // debounce function to  limit the user search
  const debounceCollege = debounce(getCollege);

  useEffect(() => {
    if (userInfo?.desc) {
      // setting the state to change on frontend
      setValue('describe', { value: userInfo?.desc, label: userInfo?.desc });
      setProf(userInfo.desc);
    }
    if (userInfo?.skills) {
      setValue('My_Skills', skillArr);
    }
    if (userInfo?.campus) {
      setValue('College', { label: userInfo.campus, value: userInfo.campus });
    }
    if (userInfo?.CampusCommunityActive) {
      setValue('CampusCommunityActive', {
        label: userInfo.CampusCommunityActive,
        value: userInfo.CampusCommunityActive,
      });
    }
    if (userInfo?.mentor) {
      setValue('mentor', userInfo.mentor ? 1 : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const customStyles = {
    // For the select it self, not the options of the select
    control: (styles: any, { isDisabled }: { isDisabled: boolean }) => ({
      ...styles,
      // This is an example: backgroundColor: isDisabled ? 'rgba(206, 217, 224, 0.5)' : 'white'
      color: isDisabled ? 'red' : 'white',
    }),
  };

  return (
    <VStack
      spacing={2}
      align="stretch"
      w="100%"
      mb={{ base: '16px', lg: '25px' }}
      mx="90px"
      mt={{ base: '20px', lg: prof === 'Student' ? '30px' : '-220px' }}
    >
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            name="describe"
            render={({ field, fieldState: { error: descError } }) => (
              <FormControl label="describe" isInvalid={!!descError} id="describe">
                <FormLabel>Best way to describe yourself</FormLabel>
                <Select options={Desp} {...field} isDisabled={edit} />
                <FormErrorMessage>Please pick an option</FormErrorMessage>
              </FormControl>
            )}
          />
        </Box>
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="13px">
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
                  <Select options={Comm} {...field} isDisabled={edit} styles={customStyles} />
                  <FormErrorMessage>Please pick an option</FormErrorMessage>
                </FormControl>
              )}
            />
          </Box>
        )}
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="10px">
            <Controller
              control={control}
              name="My_Skills"
              render={({ field, fieldState: { error: skillError } }) => (
                <FormControl label="My_Skills" isInvalid={!!skillError} id="My_Skills">
                  <FormLabel>Your skills</FormLabel>
                  <Select options={Skills} {...field} isMulti isDisabled={edit} />
                  <FormErrorMessage>Please pick an option</FormErrorMessage>
                </FormControl>
              )}
            />
          </Box>
        )}
        {prof === 'Professional' && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            mt="15px"
            w="350px"
          >
            <Controller
              control={control}
              name="mentor"
              render={({ field, fieldState: { error: mentorError } }) => (
                <FormControl label="Mentor" isInvalid={!!mentorError} id="Mentor">
                  <FormLabel>Can you be a Mentor</FormLabel>
                  <RadioGroup {...field} isDisabled={edit}>
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
              )}
            />
          </Box>
        )}
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="13px">
            <Controller
              control={control}
              defaultValue={null}
              name="College"
              render={({ field, fieldState: { error: collegeErr } }) => (
                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                  <FormLabel>I currenlty study at</FormLabel>
                  <AsyncSelect
                    {...field}
                    isClearable
                    loadOptions={() => debounceCollege(inputValue)}
                    onInputChange={handleInputChange}
                  />
                  {collegeErr && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                </FormControl>
              )}
            />
          </Box>
        )}
      </Box>
      {prof === 'Student' && (
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            name="Passout"
            render={({ field, fieldState: { error: descError } }) => (
              <FormControl label="Passout" isInvalid={!!descError} id="Passout">
                <FormLabel>Year of Passout</FormLabel>
                <Select
                  options={[
                    { label: dayjs().year(), value: dayjs().year() },
                    { label: dayjs().year() + 1, value: dayjs().year() + 1 },
                    { label: dayjs().year() + 2, value: dayjs().year() + 2 },
                    { label: dayjs().year() + 3, value: dayjs().year() + 3 },
                    { label: dayjs().year() + 4, value: dayjs().year() + 4 },
                  ]}
                  {...field}
                />
                {descError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
              </FormControl>
            )}
          />
        </Box>
      )}
    </VStack>
  );
};
