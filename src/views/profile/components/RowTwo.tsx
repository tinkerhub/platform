/* eslint-disable react/jsx-props-no-spreading */
import {Box, FormControl, FormErrorMessage, FormLabel, Radio, RadioGroup, Stack, VStack,} from '@chakra-ui/react';
import {AsyncCreatableSelect, AsyncSelect, OptionBase, Select} from 'chakra-react-select';
import {useCallback} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import dayjs from 'dayjs';
import {Desp} from '../../wizard/components/Two';
import {IsEdit} from '../types';
import {debounce} from '@/utils';
import {getCollege, getSkills} from "@/api/firebase";

interface Options extends OptionBase {
    label: string;
    value: string;
}
export const RowTwo = ({isEdit}: IsEdit) => {
    const {control, watch} = useFormContext();

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
        debounce((_: string, callback: (options: any) => void) => {
            getSkills().then((options) => {
                callback(options);
            });
        }),
        []
    );
    const PronounOpt: Options[] = [
        {label: 'He/Him', value: 'He/Him'},
        {label: 'She/Her', value: 'She/Her'},
        {label: 'They/Them', value: 'They/Them'},
    ];
    const role = watch('description')?.value;

    const yaerOfPassout = new Array(6).fill(null).map((_, index) => ({
        label: dayjs().year() + index,
        value: dayjs().year() + index,
    }));

    // debounce function to  limit the user search

    return (
        <VStack
            as="div"
            spacing={2}
            align="stretch"
            w="100%"
            height={{base: '10%', lg: '400px'}}
            mx="90px"
            justifyContent="flex-start"
            mt={{base: '14px', lg: '0'}}
            mb={{base: '10px', lg: '0px'}}
        >
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
            <Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Controller
                        control={control}
                        name="description"
                        render={({field, fieldState: {error: descError}}) => (
                            <FormControl label="describe" isInvalid={!!descError} id="describe">
                                <FormLabel>Best way to describe yourself</FormLabel>
                                <Select options={Desp} {...field} isDisabled={isEdit}/>
                                <FormErrorMessage>Please pick an option</FormErrorMessage>
                            </FormControl>
                        )}
                    />
                </Box>
                {role === 'Student' && (
                    <Box display="flex" flexDirection="column" justifyContent="space-between" mt="18px">
                        <Controller
                            control={control}
                            name="skills"
                            render={({field, fieldState: {error: skillError}}) => (
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
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            mt={{sm: '3px', md: '18px'}}
                        >
                            <Controller
                                name="mentor"
                                defaultValue="NO"
                                control={control}
                                render={({field: {onChange, value}, fieldState: {error: mentorError}}) => (
                                    <FormControl label="Mentor" isInvalid={!!mentorError} id="Mentor">
                                        <FormLabel>Can you be a Mentor</FormLabel>
                                        <RadioGroup onChange={onChange} value={value} isDisabled={isEdit}>
                                            <Stack spacing={5} direction="row">
                                                <Radio colorScheme="blue" value="YES">
                                                    Yes
                                                </Radio>
                                                <Radio colorScheme="blue" value="NO">
                                                    No
                                                </Radio>
                                            </Stack>
                                        </RadioGroup>
                                        <FormErrorMessage>{mentorError?.message}</FormErrorMessage>
                                    </FormControl>
                                )}
                            />
                        </Box>
                    </Box>
                )}
                {role === 'Student' && (
                    <Box display="flex" flexDirection="column" justifyContent="space-between" mt="13px">
                        <Controller
                            control={control}
                            name="collegeId"
                            render={({field, fieldState: {error: collegeErr}}) => (
                                <FormControl label="College" isInvalid={!!collegeErr} id="College">
                                    <FormLabel>I currenlty study at</FormLabel>
                                    <AsyncCreatableSelect
                                        isDisabled={isEdit}
                                        {...field}
                                        isClearable
                                        defaultOptions
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
                        render={({field, fieldState: {error: descError}}) => (
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
