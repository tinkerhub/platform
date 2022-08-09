import { Box, Flex, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { LayoutLogin } from '../layout';

const Home: NextPage = () => (
  <LayoutLogin>
    <Head>
      <title>Tinkerhub</title>
    </Head>
    <Box bg="white" pt={20} w="100%" minH={{ sm: '65vh', xl: '35vh' }}>
      <Flex direction="column" justifyContent="space-around" h="100px">
        <Box p={2} maxW="600px" mt="200px">
          <Heading as="h2" size="4xl" color="rgba(65, 83, 240, 1)" fontWeight="extrabold">
            {' '}
            What are you learning today?
          </Heading>
        </Box>
        <Box p={4} bg="rgba(65, 83, 240, 1)" fontSize={20} maxW="600px" mt="30px" color="white">
          The world is changing, and we want India to be ready. We are here to make sure that
          everyone has access to the knowledge required to set the course for a better future.
        </Box>
      </Flex>
    </Box>
  </LayoutLogin>
);

export default Home;
