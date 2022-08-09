/* eslint-disable react/require-default-props */
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

interface NavProp {
  btnText?: string;
  btnFunc?: () => void;
  showBtn: boolean;
}

export const Topbar = ({ btnFunc, btnText = 'Login/Signup', showBtn }: NavProp) => (
  <Box
    display="flex"
    justifyContent="space-between"
    h={65}
    alignItems="center"
    bg="white"
    color="black"
  >
    <Flex flexDirection="column">
      <Flex>
        <Heading size="lg">Tinker</Heading>
        <Heading fontWeight="normal" size="lg">
          Hub
        </Heading>
      </Flex>
      <Heading fontSize="13px" fontWeight="500">
        Foundation
      </Heading>
    </Flex>
    {showBtn && (
      <Button
        colorScheme="blue"
        backgroundColor="rgba(65, 83, 240, 1)"
        onClick={btnFunc}
        px={{ base: '15px', lg: '80px' }}
      >
        {btnText}
      </Button>
    )}
  </Box>
);
