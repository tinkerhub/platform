import { Box, Flex, Heading, useColorMode } from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { BaseLayout } from '../layout';

const Home: NextPageWithLayout = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>Tinkerhub</title>
      </Head>
      <Flex
        justifyContent="space-between"
        minH="450px"
        alignItems="center"
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
      >
        <Box p={2} maxW="600px">
          <Heading as="h2" size="4xl" color="rgba(65, 83, 240, 1)" fontWeight="extrabold">
            {' '}
            What are you learning today?
          </Heading>
          <Box
            p={4}
            fontSize={20}
            maxW="600px"
            mt="30px"
            color={colorMode === 'light' ? 'rgba(27, 27, 27, 1)' : '#e0e0e0'}
          >
            The world is changing, and we want India to be ready. We are here to make sure that
            everyone has access to the knowledge required to set the course for a better future.
          </Box>
        </Box>
        <Box>
          <Image src="/hero1.png" width={550} height={500} />
        </Box>
      </Flex>
    </>
  );
};

Home.Layout = BaseLayout;

export default Home;
