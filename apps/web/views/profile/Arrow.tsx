import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';

export const Arrow = () => {
  const router = useRouter();
  return (
    <ArrowBackIcon
      // color="black"
      w={8}
      h={8}
      _hover={{ cursor: 'pointer', color: 'grey' }}
      onClick={() => router.back()}
    />
  );
};