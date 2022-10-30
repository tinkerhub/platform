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
import { useEffect, useState } from 'react';
import { Controller, useFormContext, useController } from 'react-hook-form';
import dayjs from 'dayjs';
import { useAuthCtx } from '../../../hooks';
import { Clg, Comm, Desp, Skills } from '../../wizard/components/Two';
import { IsEdit, Options } from '../types';
import { platformAPI } from '../../../config';

export const RowTwo = ({ isEdit }: IsEdit) => {
  const { control, watch, setValue } = useFormContext();
  const { user: userInfo } = useAuthCtx();
  const skillArr: Options[] = [];
  // userinfo.skills returns an array of string so converting to a object here and pushing to a array
  userInfo?.skills?.map((el) => skillArr.push({ value: el, label: el }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputValue, setInputValue] = useState<string>('');

  const getCollege = async (input: string) => {
    const { data } = await platformAPI.get(`/college?search=${input}&limit=20&page=1`);
    // pushing the fetched data to a array to make sure that it is in right format
    const college = data.map((el: Clg) => ({ label: el.name, value: el.name }));
    return college;
  };

  // handle input change event
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const role = watch('desc')?.value;

  const {
    field: { onChange: mentorChange, ref: mentorRef, value: mentorVal },
    fieldState: { error: mentorError },
  } = useController({
    name: 'mentor',
    control,
  });

  const yaerOfPassout = new Array(4).fill(null).map((el, index) => ({
    label: dayjs().year() + index,
    value: dayjs().year() + index,
  }));

  useEffect(() => {
    if (role === 'Student') {
      setValue('mentor', null);
    }

    // setting the value related to opposite of decription to undefined
    // making sure that user wont send data from both student and professionall to DB
    if (role === 'Professional') {
      setValue('CampusCommunityActive', null);
      setValue('My_Skills', null);
      setValue('campus', null);
      setValue('passyear', null);
    }
  }, [role, setValue]);

  // debounce function to  limit the user search

  useEffect(() => {
    if (userInfo?.desc) {
      // setting the state to change on frontend
      setValue('desc', { label: userInfo?.desc, value: userInfo?.desc });
    }
    if (userInfo?.skills) {
      setValue('My_Skills', skillArr);
    }
    if (userInfo?.campus) {
      setValue('college', { label: userInfo.campus, value: userInfo.campus });
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
    if (userInfo?.passyear) {
      setValue('passyear', {
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
            name="desc"
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
                  <Select options={Comm} {...field} isDisabled={isEdit} styles={customStyles} />
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
                  <Select options={Skills} {...field} isMulti isDisabled={isEdit} />
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
              name="campus"
              render={({ field, fieldState: { error: collegeErr } }) => (
                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                  <FormLabel>I currenlty study at</FormLabel>
                  <AsyncSelect
                    isDisabled={isEdit}
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
