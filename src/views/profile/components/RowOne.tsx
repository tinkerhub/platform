/* eslint-disable react/jsx-props-no-spreading */
import {Box, FormControl, FormErrorMessage, FormLabel, Input, VStack} from '@chakra-ui/react';
import {OptionBase, Select} from 'chakra-react-select';
import {Controller, useFormContext} from 'react-hook-form';
import {InferType} from 'yup';
import {firstFormValidator} from '../../wizard';
import {IsEdit} from '../types';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/api/firebase";
import {PageLoader} from "@/components/loading";

interface Options extends OptionBase {
    label: string;
    value: string;
}

const PronounOpt: Options[] = [
    {label: 'He/Him', value: 'He/Him'},
    {label: 'She/Her', value: 'She/Her'},
    {label: 'They/Them', value: 'They/Them'},
];
type FormType = InferType<typeof firstFormValidator>;

export const RowOne = ({isEdit}: IsEdit) => {
    // Auth context use
    const [user, loading] = useAuthState(auth);

    const {
        register,
        control,
        formState: {errors},
    } = useFormContext<FormType>();

    return (
        <VStack spacing={2} align="stretch" w="100%">
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <FormControl label="Name" isInvalid={!!errors.name} id="FullName">
                    <FormLabel>Name</FormLabel>
                    <Input variant="filled" placeholder="JhonDoe" {...register('name')} isDisabled={isEdit}/>
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
            </Box>

            <Box display="flex" flexDirection="column" justifyContent="space-between" mt="29px">
                <FormLabel>Mobile Number</FormLabel>
                <Input type="string" isDisabled value={user?.phoneNumber || undefined}/>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <FormControl label="Email" isInvalid={!!errors.email} id="Email">
                    <FormLabel>Email</FormLabel>
                    <Input {...register('email')} isDisabled={isEdit}/>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
                <FormControl label="DOB" isInvalid={!!errors.dob} id="DOB">
                    <FormLabel>Date of Birth</FormLabel>
                    <Input {...register('dob')} type="date" isDisabled={isEdit}/>
                    <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
                </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between" mb="30px">
                <Controller
                    control={control}
                    name="pronoun"
                    render={({field, fieldState: {error: proError}}) => (
                        <FormControl label="Pronoun" isInvalid={!!proError} id="Pronoun">
                            <FormLabel>Prefered Pronoun</FormLabel>
                            <Select options={PronounOpt} {...field} isDisabled={isEdit}/>
                            {proError && <FormErrorMessage>Please pick an option</FormErrorMessage>}
                        </FormControl>
                    )}
                />
            </Box>
        </VStack>
    );
};
