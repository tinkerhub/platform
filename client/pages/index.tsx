import { Center, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tinkerhub</title>
      </Head>
      <Center height="100vh" width="100%" bg="black" color="white">
        <Heading>Tinkerhub</Heading>
      </Center>
    </>
  );
};

export default Home;
