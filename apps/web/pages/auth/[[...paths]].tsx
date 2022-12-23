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
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SuperTokens from 'supertokens-auth-react';
import { useForm } from 'react-hook-form';
import { redirectToAuth, createCode, resendCode } from 'supertokens-auth-react/recipe/passwordless';
import { BaseLayout } from '../../layout';
import { phoneNumber } from '../../views/wizard/validator';

type FormType = Yup.InferType<typeof phoneNumber>;

const Auth = () => {
  // redirect to "/auth" page if "/auth/random" route occur

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: yupResolver(phoneNumber),
  });

  const sendOTP = async (phone: string) => {
    try {
      await createCode({
        phoneNumber: phone,
      });

      // OTP sent successfully.
      // 'Please check your Phone for an OTP')
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you,
        // or if the input email / phone number is not valid.
        //   window.alert(err.message);
      } else {
        //  window.alert('Oops! Something went wrong.');
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        window.location.assign('/auth');
      } else {
        // OTP resent successfully.
        // 'Please check your email for the OTP');
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
      } else {
        //         window.alert('Oops! Something went wrong.');
      }
    }
  };

  const handlePhoneSubmition = async (phoneObj: { phoneNumber: string }) => {
    await sendOTP(phoneObj.phoneNumber);
  };

  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  return (
    <Center mb="100px" mt="30px">
      <Box
        p="9"
        w="400px"
        borderRadius="lg"
        borderColor={{ base: 'none', lg: 'rgba(200, 200, 200, 1)' }}
        borderWidth={{ base: 'none', lg: '.5px' }}
      >
        <Heading fontSize="40px" fontWeight="700" marginBottom="10px" mb="25px" textAlign="left">
          Welcome to TinkerHub{' '}
          <Box as="span" alignItems="flex-end">
            👋
          </Box>
        </Heading>

        <Text mb="20px" textAlign="left" fontWeight={400} maxHeight="300px">
          We are thrilled to know that you want to join the TinkerHub mission. Let get started.
        </Text>
        <Box>
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
        </Box>
      </Box>
    </Center>
  );
};

Auth.Layout = BaseLayout;

export default Auth;
