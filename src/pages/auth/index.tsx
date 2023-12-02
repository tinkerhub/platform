import { Box, Center, Heading, Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BaseLayout } from '@/layout';
import { auth } from '@/api/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { OAuthProvider, signInWithPopup } from '@firebase/auth';



const Auth = () => {
    const toast = useToast();
    const router = useRouter();

    const [user, loading] = useAuthState(auth);

    const loginWithOtpLess = async () => {
        const provider = new OAuthProvider('oidc.otpless');
        provider.addScope('phone');
        const result = await signInWithPopup(auth, provider).catch((e) => e.message as string);

        if(typeof result === 'string')
            toast({
                title: 'Error',
                description: result,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });

        return router.push('/wizard')
    };

    useEffect(() => {
        if (user)
            router.push('/wizard').then();
        else if(!loading)
            loginWithOtpLess().then();
    }, [user, loading, router]);

    return (
        <Center mb='100px' mt='30px'>
            <Box
                p='9'
                w='400px'
                borderRadius='lg'
                borderColor={{ base: 'none', lg: 'rgba(200, 200, 200, 1)' }}
                borderWidth={{ base: 'none', lg: '.5px' }}
            >
                <Heading
                    fontSize='40px'
                    fontWeight='700'
                    marginBottom='10px'
                    mb='25px'
                    textAlign='left'
                >
                    Welcome to TinkerHub{' '}
                    <Box as='span' alignItems='flex-end'>
                        👋
                    </Box>
                </Heading>

                <Text mb='20px' textAlign='left' fontWeight={400} maxHeight='300px'>
                    We are thrilled to know that you want to join the TinkerHub mission. Let get started.
                </Text>
            </Box>
        </Center>
    );
};

Auth.Layout = BaseLayout;

export default Auth;
