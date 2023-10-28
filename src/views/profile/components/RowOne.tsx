/* eslint-disable react/jsx-props-no-spreading */
import {Box, FormControl, FormErrorMessage, FormLabel, Input, VStack} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import {InferType} from 'yup';
import {firstFormValidator} from '../../wizard';
import {IsEdit} from '../types';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/api/firebase";
import {CopyText} from "@/components/copy";

type FormType = InferType<typeof firstFormValidator>;

export const RowOne = ({isEdit}: IsEdit) => {
    // Auth context use
    const [user] = useAuthState(auth);

    const {
        register,
        formState: {errors: {dob, email, name}},
    } = useFormContext<FormType>();

    return (
        <VStack spacing={2} align="stretch" w="100%">
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <FormControl label="Name" isInvalid={!!name} id="FullName">
                </FormControl>
                <CopyText label="Copy Memership ID: " text={user?.uid || 'User id not found!'} />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <FormControl label="Name" isInvalid={!!name} id="FullName">
                    <FormLabel>Name</FormLabel>
                    <Input variant="filled" placeholder="JhonDoe" {...register('name')} isDisabled={isEdit}/>

                    <FormErrorMessage>{name?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between" mt="29px">
                <FormLabel>Mobile Number</FormLabel>
                <Input type="string" isDisabled value={user?.phoneNumber || undefined}/>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <FormControl label="Email" isInvalid={!!email} id="Email">
                    <FormLabel>Email</FormLabel>
                    <Input {...register('email')} isDisabled={isEdit}/>
                    <FormErrorMessage>{email?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <FormControl label="DOB" isInvalid={!!dob} id="DOB">
                    <FormLabel>Date of Birth</FormLabel>
                    <Input {...register('dob')} type="date" isDisabled={isEdit}/>
                    <FormErrorMessage>{dob?.message}</FormErrorMessage>
                </FormControl>
            </Box>

        </VStack>
    );
};
