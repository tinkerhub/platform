/* eslint-disable react/require-default-props */
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';
import Link from 'next/link';

interface NavProp {
  btnText?: string;
  btnFunc?: () => void;
  showBtn: boolean;
}

export const Topbar = ({ btnFunc, btnText = 'Login/Signup', showBtn }: NavProp) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const text = useColorModeValue('dark', 'light');
  return (
    <Box display="flex" justifyContent="space-between" h={65} alignItems="center">
      <Flex flexDirection="column">
        <Link href="/" passHref>
          <a href="replace">
            <Flex>
              <Heading size="lg">Tinker</Heading>
              <Heading fontWeight="normal" size="lg">
                Hub
              </Heading>
            </Flex>
            <Heading fontSize="13px" fontWeight="500">
              Foundation
            </Heading>
          </a>
        </Link>
      </Flex>
      <div>
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${text} mode`}
          variant="ghost"
          color="current"
          mr={{ base: '3', md: '3' }}
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
        {showBtn && (
          <Button
            colorScheme="blue"
            backgroundColor="rgba(65, 83, 240, 1)"
            onClick={btnFunc}
            color="white"
            px={{ base: '25px', lg: '80px' }}
          >
            {btnText}
          </Button>
        )}
      </div>
    </Box>
  );
};
