import { Box, Flex, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Topbar, BottomBar } from '../components/Navbar';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Tinkerhub</title>
      </Head>
      <Topbar btnText="Login/Signup" showBtn btnFunc={() => router.push('/auth')} />
      <Box bg="white" minH="90vh" p={10} pt={20} w="100%">
        <Flex direction="column" justifyContent="space-around" h="300px">
          <Box p={2} maxW="600px">
            <Heading as="h2" size="4xl" color="rgba(65, 83, 240, 1)">
              {' '}
              What are you learning today?
            </Heading>
          </Box>
          <Box p={4} bg="rgba(65, 83, 240, 1)" fontSize={20} maxW="600px" mt="30px" color="white">
            The world is changing, and we want India to be ready. We are here to make sure that
            everyone has access to the knowledge required to set the course for a better future.
          </Box>
        </Flex>

        <BottomBar />
      </Box>
    </>
  );
};

export default Home;
