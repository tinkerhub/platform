/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  InputGroup,
  InputLeftAddon,
  Divider,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SuperTokens, { redirectToAuth } from 'supertokens-auth-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  createCode,
  resendCode,
  consumeCode,
  getLoginAttemptInfo,
} from 'supertokens-auth-react/recipe/passwordless';
import { BaseLayout } from '../../layout';
import { phoneNumber, OTP } from '../../views/wizard/validator';

type FormType = Yup.InferType<typeof phoneNumber>;
type OTPType = Yup.InferType<typeof OTP>;

const Auth = () => {
  // redirect to "/auth" page if "/auth/random" route occur
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  const router = useRouter();

  // this state is used to determine if the user has recieved the otp and is ready to enter the otp
  const [isOTPscreenisVisible, setOTPscreenisVisible] = useState<boolean>(false);

  const hasInitialOTPBeenSent = async () => (await getLoginAttemptInfo()) !== undefined;

  const toast = useToast();

  const changePhoneNumber = () => {
    // supertokens check whether an otp is sended or not by accessing the local storage
    // so here we are removing it
    localStorage.removeItem('supertokens-passwordless-loginAttemptInfo');
    setOTPscreenisVisible(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: yupResolver(phoneNumber),
  });

  const {
    register: registerOTP,
    handleSubmit: handleOTPsubmit,
    formState: { errors: otpError },
  } = useForm<OTPType>({
    mode: 'onSubmit',
    resolver: yupResolver(OTP),
  });

  const sendOTP = async (phone: string): Promise<void> => {
    try {
      await createCode({
        phoneNumber: `+91${phone}`,
      }); // OTP sent successfully.

      toast({
        title: 'OTP sent successfully',
        description: 'Please check your Phone for an OTP',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      // 'Please check your Phone for an OTP')
      setOTPscreenisVisible(true);
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you,
        // or if the input email / phone number is not valid.
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        //  window.alert('Oops! Something went wrong.');
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const resendOTP = async () => {
    try {
      const response = await resendCode();

      if (response.status === 'RESTART_FLOW_ERROR') {
        // this can happen if the user has already successfully logged in into
        // another device whilst also trying to login to this one.
        //  'Login failed. Please try again');
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        // OTP resent successfully.
        // 'Please check your phone for the OTP');
        toast({
          title: 'OTP resent succesfully',
          description: 'Please check your phone for the OTP',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        // this may be a custom error message sent from the API by you.
      } else {
        //         window.alert('Oops! Something went wrong.');
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const handlePhoneSubmition = async (phoneObj: { phoneNumber: string }) => {
    await sendOTP(phoneObj.phoneNumber);
  };

  useEffect(() => {
    (async () => {
      const loginAttemptInfo = await hasInitialOTPBeenSent();
      setOTPscreenisVisible(loginAttemptInfo);
    })();
  }, [handleSubmit]);

  // used to verify the otp
  const handleOTPInput = async (otp: string) => {
    try {
      const response = await consumeCode({
        userInputCode: otp,
      });
      localStorage.removeItem('supertokens-passwordless-loginAttemptInfo');

      if (response.status === 'OK') {
        // if (response.createdNewUser) {
        //   // user sign up success
        // } else {
        //   // user sign in success
        // }
        router.push('/profile');
      } else if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
        // the user entered an invalid OTP
        toast({
          title: 'Incorrect OTP',
          description: 'The enterd OTP is wrong please try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
        // it can come here if the entered OTP was correct, but has expired because
        // it was generated too long ago.
        toast({
          title: 'OTP Expired',
          description: 'Old OTP entered , Please regenerate a new one and try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        // this can happen if the user tried an incorrect OTP too many times.
        toast({
          title: 'Login Failed',
          description: 'multiple incorrect otp entry, please try again later',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      // if (err.isSuperTokensGeneralError === true) {
      //   // this may be a custom error message sent from the API by you.
      //   window.alert(err.message);
      // } else {
      //   window.alert('Oops! Something went wrong.');
      // }
    }
    toast({
      title: 'Something went wrong',
      description: 'Please try again later',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  // sending otp to verify
  const handleOTPSubmition = async (OTPObj: { otp: string }) => {
    await handleOTPInput(OTPObj.otp);
  };

  return (
    <Center mb="100px" mt="30px">
      <Box
        p="9"
        w="400px"
        borderRadius="lg"
        borderColor={{ base: 'none', lg: 'rgba(200, 200, 200, 1)' }}
        borderWidth={{ base: 'none', lg: '.5px' }}
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
            <Divider my="14px" />
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
                  _hover={{ cursor: 'pointer', bg: '#1328EC' }}
                  marginTop="16px"
                  type="submit"
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
                    _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Resend SMS
                  </FormLabel>
                </Flex>
                <Input type="number" {...registerOTP('otp')} placeholder="Enter otp" />
                <FormErrorMessage>Please enter a valid OTP</FormErrorMessage>
                <Button
                  colorScheme="blue"
                  width="100%"
                  backgroundColor="rgba(65, 83, 240, 1)"
                  color="white"
                  _hover={{ cursor: 'pointer', bg: '#1328EC' }}
                  marginTop="16px"
                  type="submit"
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
                  Change phoneNumber
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
