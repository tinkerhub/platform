import {Box, Flex, Heading, useColorMode} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import {BaseLayout} from '@/layout';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/api/firebase";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Home = () => {
    const [pUser] = useAuthState(auth);
    const {colorMode} = useColorMode();

    const router = useRouter();

    useEffect(() => {
        if(pUser)
            router.push('/events').then();
    }, [pUser, router]);

    return (
        <>
            <Head>
                <title>Tinkerhub</title>
            </Head>
            <Flex
                justifyContent="space-between"
                minH="450px"
                alignItems="center"
                flexDirection={{base: 'column-reverse', lg: 'row'}}
            >
                <Box p={2} maxW="600px">
                    <Heading as="h2" size="4xl" color="rgba(65, 83, 240, 1)" fontWeight="extrabold">
                        What are you learning today?
                    </Heading>
                    <Box
                        py={4}
                        fontSize={{base: '16px', md: '20px'}}
                        maxW="600px"
                        mt="30px"
                        color={colorMode === 'light' ? 'rgba(27, 27, 27, 1)' : '#e0e0e0'}
                    >
                        The world is changing, and we want India to be ready. We are here to make sure that
                        everyone has access to the knowledge required to set the course for a better future.
                    </Box>
                </Box>
                <Box>
                    <Image src="/hero1.png" width={550} height={500} alt=""/>
                </Box>
            </Flex>
        </>
    );
};

Home.Layout = BaseLayout;

export default Home;
