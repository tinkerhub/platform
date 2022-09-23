import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export const Arrow = () => {
  const router = useRouter();
  return (
    <Flex>
      <ArrowBackIcon
        // color="black"
        w={8}
        h={8}
        _hover={{ cursor: 'pointer', color: 'grey' }}
        onClick={() => router.push('/')}
      />
      <Heading size="sm" alignSelf="center" ml="20px" fontSize="14px">
        Back to home
      </Heading>
    </Flex>
  );
};
