/* eslint-disable react/jsx-props-no-spreading */
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    useToast,
} from '@chakra-ui/react';
import {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {BaseLayout} from '@/layout';
import {OTP, phoneNumber} from '@/views/wizard/validator';
import {ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber} from "@firebase/auth";
import {auth} from "@/api/firebase";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";

type FormType = Yup.InferType<typeof phoneNumber>;
type OTPType = Yup.InferType<typeof OTP>;


const Auth = () => {
    // this state is used to determine if the user has recieved the otp and is ready to enter the otp
    const [isOTPscreenisVisible, setOTPscreenisVisible] = useState<boolean>(false);
    const [verifier, setVerifier] = useState<RecaptchaVerifier>();
    const [confirm, setConfirm] = useState<ConfirmationResult>();
    const [phone, setPhone] = useState<string>('');

    const toast = useToast();
    const captchaRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            router.push('/wizard').then();
        }
    }, [user, router]);

    useEffect(() => {
        if (!captchaRef.current)
            return ;

        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'expired-callback': () => verifier.render()
        });

        setVerifier(verifier);
    }, [captchaRef]);

    const changePhoneNumber = () => setOTPscreenisVisible(false);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting: isOtpSending},
    } = useForm<FormType>({
        mode: 'onSubmit',
        resolver: yupResolver(phoneNumber),
    });

    const {
        register: registerOTP,
        handleSubmit: handleOTPsubmit,
        formState: {errors: otpError, isSubmitting},
    } = useForm<OTPType>({
        mode: 'onSubmit',
        resolver: yupResolver(OTP),
    });

    const sendOTP = async (phone: string): Promise<void> => {
        try {
            if (!verifier)
                throw new Error("Recaptcha verifier not initialized");

            setPhone(phone);

            const confirm = await signInWithPhoneNumber(auth, `+91${phone}`, verifier);
            setConfirm(confirm);

            toast({
                title: 'OTP sent successfully',
                description: 'Please check your Phone for an OTP',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            setOTPscreenisVisible(true);
        } catch (err: any) {
            console.error(err);

            toast({
                title: "Couldn't send OTP",
                description: 'something went wrong while trying to send otp',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const resendOTP = () => sendOTP(phone);
    const handlePhoneSubmition = async (phoneObj: { phoneNumber: string }) => {
        await sendOTP(phoneObj.phoneNumber);
    };

    // used to verify the otp
    const handleOTPInput = async (otp: string) => {
        try {
            if (!confirm)
                throw new Error("Confirmation result not initialized");

            const response = await confirm.confirm(otp).catch((err) => err.message);

            if (response.user) {
                toast({
                    title: 'Login Successfull',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                await router.push('/wizard');
            } else
                // the user entered an invalid OTP
                toast({
                    title: 'Login Failed',
                    description: response,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
        } catch (err: any) {
            toast({
                title: 'Something went wrong',
                description: 'Please try again later',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    // sending otp to verify
    const handleOTPSubmition = async (OTPObj: { otp: string }) => {
        await handleOTPInput(OTPObj.otp);
    };

    return (
        <Center mb="100px" mt="30px">
            <div id="recaptcha-container" ref={captchaRef}></div>
            <Box
                p="9"
                w="400px"
                borderRadius="lg"
                borderColor={{base: 'none', lg: 'rgba(200, 200, 200, 1)'}}
                borderWidth={{base: 'none', lg: '.5px'}}
            >
                {!isOTPscreenisVisible ? (
                    <>
                        <Heading
                            fontSize="40px"
                            fontWeight="700"
                            marginBottom="10px"
                            mb="25px"
                            textAlign="left"
                        >
                            Welcome to TinkerHub{' '}
                            <Box as="span" alignItems="flex-end">
                                👋
                            </Box>
                        </Heading>

                        <Text mb="20px" textAlign="left" fontWeight={400} maxHeight="300px">
                            We are thrilled to know that you want to join the TinkerHub mission. Let get started.
                        </Text>
                    </>
                ) : (
                    <>
                        <Heading fontSize="2xl" textAlign="center">
                            Enter OTP
                        </Heading>
                        <Text textAlign="center" mt="10px" fontWeight="semibold" fontSize="sm">
                            An OTP was sent to your phone
                        </Text>
                        <Divider my="14px"/>
                    </>
                )}

                <Box>
                    {!isOTPscreenisVisible ? (
                        <form onSubmit={handleSubmit(handlePhoneSubmition)}>
                            <FormControl isInvalid={!!errors.phoneNumber}>
                                <FormLabel>Phone number</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>+91</InputLeftAddon>
                                    <Input type="number" {...register('phoneNumber')} />
                                </InputGroup>
                                <FormErrorMessage>Phone number is not valid</FormErrorMessage>

                                <Button
                                    colorScheme="blue"
                                    width="100%"
                                    backgroundColor="rgba(65, 83, 240, 1)"
                                    color="white"
                                    _hover={{cursor: 'pointer', bg: '#1328EC'}}
                                    marginTop="16px"
                                    type="submit"
                                    isLoading={isOtpSending}
                                >
                                    Send OTP
                                </Button>
                            </FormControl>
                        </form>
                    ) : (
                        <form onSubmit={handleOTPsubmit(handleOTPSubmition)}>
                            <FormControl isInvalid={!!otpError.otp}>
                                <Flex justifyContent="space-between">
                                    <FormLabel>OTP</FormLabel>
                                    <FormLabel
                                        onClick={resendOTP}
                                        color="#0075E4"
                                        _hover={{cursor: 'pointer', textDecoration: 'underline'}}
                                    >
                                        Resend SMS
                                    </FormLabel>
                                </Flex>
                                <Input type="number" {...registerOTP('otp')} placeholder="Enter otp"/>
                                <FormErrorMessage>Please enter a valid OTP</FormErrorMessage>
                                <Button
                                    colorScheme="blue"
                                    width="100%"
                                    backgroundColor="rgba(65, 83, 240, 1)"
                                    color="white"
                                    _hover={{cursor: 'pointer', bg: '#1328EC'}}
                                    marginTop="16px"
                                    type="submit"
                                    isLoading={isSubmitting}
                                >
                                    Verify OTP
                                </Button>
                                <Button
                                    variant="outline"
                                    width="100%"
                                    marginTop="16px"
                                    type="submit"
                                    onClick={changePhoneNumber}
                                >
                                    Change phone number
                                </Button>
                            </FormControl>
                        </form>
                    )}
                </Box>
            </Box>
        </Center>
    );
};

Auth.Layout = BaseLayout;

export default Auth;
