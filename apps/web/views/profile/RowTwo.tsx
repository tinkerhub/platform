/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Comm, Desp, Skills } from '../wizard/Two';
import { IsEdit } from './types';

export const RowTwo = ({ edit }: IsEdit) => {
  const { control, watch } = useFormContext();

  const [prof, setProf] = useState<string | null>(null);

  useEffect(() => {
    const val = watch('describe')?.value;
    setProf(val || 'Student');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('describe')]);

  const {
    field: { onChange: skillChange, onBlur: oskillBlur, ref: skillRef, value: skillValue },
    fieldState: { error: skillError },
  } = useController({
    name: 'My_Skills',
    control,
  });

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
    <Center>
      <Stack
        spacing={{ base: '10px', lg: '120px' }}
        direction={{ base: 'column', lg: 'row' }}
        mb={{ sm: '0px', lg: '62px' }}
      >
        <Box mt="30px" w="350px">
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
                isDisabled={edit}
              />
              <FormErrorMessage>Please pick an option</FormErrorMessage>
            </FormControl>
          </Box>
          {prof === 'Student' && (
            <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
              <FormControl label="community" isInvalid={!!activeError} id="community">
                <FormLabel>Tinkerhub campus community is active</FormLabel>
                <Select
                  options={Comm}
                  ref={activeRef}
                  name="CampusCommunityActive"
                  onChange={activeChange}
                  onBlur={activeBlur}
                  value={activeVal}
                  isDisabled={edit}
                />
                <FormErrorMessage>{activeError?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          )}
          {prof === 'Student' && (
            <Box display="flex" flexDirection="column" justifyContent="space-between" mt="15px">
              <FormControl label="Skills" isInvalid={!!skillError} id="Skills">
                <FormLabel>Select Your Skill</FormLabel>
                <Select
                  isMulti
                  options={Skills}
                  ref={skillRef}
                  name="signupReasons"
                  onChange={skillChange}
                  onBlur={oskillBlur}
                  value={skillValue}
                  isDisabled={edit}
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
                  isDisabled={edit}
                  value={campusVal}
                />
                <FormErrorMessage>{campusError?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          )}
        </Box>
      </Stack>
    </Center>
  );
};
