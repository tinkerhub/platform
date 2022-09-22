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
import { Option } from '../wizard/validator';
import { IsEdit } from './types';

export const RowTwo = ({ edit }: IsEdit) => {
  const tempArr: Option[] = [];
  const { control, watch, setValue } = useFormContext();
  const { user: userInfo } = useAuthCtx();
  const [work, setWork] = useState(0);

  userInfo?.skills?.map((el) => tempArr.push({ value: el, label: el }));

  const [prof, setProf] = useState<string | null>(null);

  useEffect(() => {
    const val = watch('describe')?.value;
    setProf(val);

    if (prof === 'Student') {
      setValue('mentor', undefined);
    }

    // setting the value related to opposite of decription to undefined
    if (prof === 'Professional') {
      setValue('CampusCommunityActive', undefined);
      setValue('My_Skills', undefined);
      setValue('College', undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('describe')]);

  useEffect(() => {
    const ind = Desp.findIndex((el) => el.value === userInfo?.desc);
    if (userInfo?.desc) {
      setProf(userInfo.desc);
      setWork(ind);
    }
  }, [userInfo]);

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'Mentor',
    control,
  });

  return (
    <VStack spacing={2} align="stretch" w="100%" mb="20px" mx="90px">
      <Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Controller
            control={control}
            defaultValue={Desp[work]}
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
              defaultValue={{
                vale: userInfo?.CampusCommunityActive,
                label: userInfo?.CampusCommunityActive,
              }}
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
              defaultValue={tempArr.map((el) => el)}
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
                defaultValue={Number(userInfo?.mentor)}
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
              defaultValue={{ vale: userInfo?.campus, label: userInfo?.campus }}
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
