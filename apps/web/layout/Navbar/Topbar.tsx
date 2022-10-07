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
import { IoMdMoon } from 'react-icons/io';
import { BsFillSunFill } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

interface NavProp {
  btnText?: string;
  btnFunc?: () => void;
  showBtn: boolean;
}

export const Topbar = ({ btnFunc, btnText = 'Login/Signup', showBtn }: NavProp) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const router = useRouter();
  console.log(router.pathname);
  const SwitchIcon = useColorModeValue(IoMdMoon, BsFillSunFill);
  const { doesSessionExist } = useSessionContext() as any;
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
          fontSize="xl"
          aria-label={`Switch to ${text} mode`}
          variant="ghost"
          color="current"
          mr={{ base: '3', md: '3' }}
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
        {doesSessionExist && router.pathname === '/' && (
          <Button
            onClick={() => signOut}
            _hover={{ cursor: 'pointer', bg: '#1328EC', color: 'white' }}
            px={{ base: '25px', lg: '50px' }}
            mr="20px"
            variant="outline"
          >
            Logout
          </Button>
        )}
        {showBtn && (
          <Button
            colorScheme="blue"
            backgroundColor="rgba(65, 83, 240, 1)"
            onClick={btnFunc}
            _hover={{ cursor: 'pointer', bg: '#1328EC' }}
            color="white"
          >
            {btnText}
          </Button>
        )}
      </div>
    </Box>
  );
};
