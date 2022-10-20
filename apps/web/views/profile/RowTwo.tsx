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
import { Controller, useFormContext, useController } from 'react-hook-form';
import dayjs from 'dayjs';
import { useAuthCtx } from '../../hooks';
import { Clg, Comm, Desp, Skills } from '../wizard/Two';
import { IsEdit, Options } from './types';
import { apiHandler } from '../../api';

export const RowTwo = ({ edit }: IsEdit) => {
  const { control, watch, setValue } = useFormContext();
  const { user: userInfo } = useAuthCtx();
  const skillArr: Options[] = [];
  // userinfo.skills returns an array of string so converting to a object here and pushing to a array
  userInfo?.skills?.map((el) => skillArr.push({ value: el, label: el }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputValue, setInputValue] = useState<string>('');

  const getCollege = async (input: string) => {
    const college: Options[] = [];
    const { data } = await apiHandler.get(`/college?search=${input}&limit=20&page=1`);
    // pushing the fetched data to a array to make sure that it is in right format
    data.map((el: Clg) => college.push({ label: el.name, value: el.name }));
    return college;
  };

  // handle input change event
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'Mentor',
    control,
  });

  const role = watch('describe')?.value;
  useEffect(() => {
    if (role === 'Student') {
      setValue('Mentor', null);
    }

    // setting the value related to opposite of decription to undefined
    // making sure that user wont send data from both student and professionall to DB
    if (role === 'Professional') {
      setValue('CampusCommunityActive', null);
      setValue('My_Skills', null);
      setValue('College', null);
      setValue('Passout', null);
    }
  }, [role, setValue]);

  // debounce function to  limit the user search

  useEffect(() => {
    if (userInfo?.desc) {
      // setting the state to change on frontend
      setValue('describe', { value: userInfo?.desc, label: userInfo?.desc });
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
      setValue('Mentor', userInfo.mentor ? 1 : 0);
    }
    if (userInfo?.passyear) {
      setValue('Passout', {
        value: userInfo?.passyear?.toString(),
        label: userInfo.passyear.toString(),
      });
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
        {role === 'Student' && (
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
        {role === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="10px">
            <Controller
              control={control}
              name="My_Skills"
              render={({ field, fieldState: { error: skillError } }) => (
                <FormControl label="My_Skills" isInvalid={!!skillError} id="My_Skills">
                  <FormLabel>Your skills</FormLabel>
                  <Select options={Skills} {...field} isMulti isDisabled={edit} />
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
                  isDisabled={edit}
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
            {/* <Controller
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
            /> */}
          </Box>
        )}
        {role === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="13px">
            <Controller
              control={control}
              name="College"
              render={({ field, fieldState: { error: collegeErr } }) => (
                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                  <FormLabel>I currenlty study at</FormLabel>
                  <AsyncSelect
                    isDisabled={edit}
                    {...field}
                    isClearable
                    loadOptions={getCollege}
                    onInputChange={handleInputChange}
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
            name="Passout"
            render={({ field, fieldState: { error: descError } }) => (
              <FormControl label="Passout" isInvalid={!!descError} id="Passout">
                <FormLabel>Year of Passout</FormLabel>
                <Select
                  isDisabled={edit}
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
