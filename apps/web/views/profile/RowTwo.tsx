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
import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { useAuthCtx } from '../../hooks';
import { Comm, Desp, Skills } from '../wizard/Two';
import { IsEdit, Options } from './types';

export const RowTwo = ({ edit }: IsEdit) => {
  const { control, watch, setValue } = useFormContext();

  const { user: userInfo } = useAuthCtx();
  const skillArr: Options[] = [];
  // for conditional rendering of prfessional and student
  const [prof, setProf] = useState<string | null>(null);
  // userinfo.skills returns an array of string so converting to a object here and pushing to a array
  userInfo?.skills?.map((el) => skillArr.push({ value: el, label: el }));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'Mentor',
    control,
  });

  return (
    <VStack spacing={2} align="stretch" w="100%" mb={{ base: '16px', lg: '67px' }} mx="90px">
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
                  <Select options={Comm} {...field} isDisabled={edit} />
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
            <FormControl label="Mentor" isInvalid={!!mentorError} id="Mentor">
              <FormLabel>Can you be a Mentor</FormLabel>
              <RadioGroup
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
        )}
        {prof === 'Student' && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" mt="13px">
            <Controller
              control={control}
              name="College"
              render={({ field, fieldState: { error: collegeErr } }) => (
                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                  <FormLabel>I currenlty study at</FormLabel>
                  <Select options={Skills} {...field} isDisabled={edit} />
                  <FormErrorMessage>Please pick an option</FormErrorMessage>
                </FormControl>
              )}
            />
          </Box>
        )}
      </Box>
    </VStack>
  );
};
