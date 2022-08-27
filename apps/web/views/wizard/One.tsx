/* eslint-disable react/jsx-props-no-spreading */
import { Box, Text, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormContext, Controller } from 'react-hook-form';
import { Select as MultiSeclect, OptionBase, GroupBase } from 'chakra-react-select';
import { Form } from '../../types';

interface Options extends OptionBase {
  label: string;
  value: string;
}

const PronounOpt: Options[] = [
  { label: 'He/Him', value: 'He/Him' },
  { label: 'She/Her', value: 'She/Her' },
  { label: 'They/Them', value: 'They/Them' },
];

export const One = () => {
  const {
    register,
    setFocus,
    control,
    formState: { errors },
  } = useFormContext<Form>();

  useEffect(() => {
    setFocus('FullName');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt="30px" display="flex" flexDirection="column" justifyContent="space-between">
        <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input mt="7px" variant="filled" placeholder="JhonDoe" {...register('FullName')} />
            <Text color="red" fontSize="12px" mt="6px">
              {errors.FullName?.message}
            </Text>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="29px"
        >
          <FormControl>
            <FormLabel>Mobile Number</FormLabel>
            <Input {...register('Mobile')} type="number" />
            <Text color="red" fontSize="12px" mt="6px">
              {errors.Mobile?.message}
            </Text>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="25px"
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input {...register('Email')} />
            <Text color="red" fontSize="12px" mt="6px">
              {errors.Email?.message}
            </Text>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="25px"
        >
          <FormControl>
            <FormLabel>Date of Birth</FormLabel>
            <Input {...register('DOB')} type="date" />
            <Text color="red" fontSize="12px" mt="6px">
              {errors.DOB?.message}
            </Text>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          h="75px"
          justifyContent="space-between"
          mt="25px"
        >
          <Controller
            control={control}
            name="Pronoun"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <>
                <FormControl>
                  <FormLabel>Select your Pronoun</FormLabel>
                  <MultiSeclect<Options, true, GroupBase<Options>>
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    options={PronounOpt}
                    placeholder="Select Your Pronoun"
                    closeMenuOnSelect
                    size="md"
                  />
                </FormControl>
                <Text color="red" fontSize="12px" mt="12px">
                  {errors.Pronoun?.message}
                </Text>
              </>
            )}
          />
        </Box>
        <Box mt="25px">
          <Button
            colorScheme="blue"
            width="100%"
            type="submit"
            backgroundColor="rgba(65, 83, 240, 1)"
            disabled={false}
            color="white"
          >
            Next
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};
