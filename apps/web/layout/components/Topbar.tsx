/* eslint-disable react/require-default-props */
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { IoMdMoon } from 'react-icons/io';
import { BsFillSunFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
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
  const router = useRouter();
  const SwitchIcon = useColorModeValue(IoMdMoon, BsFillSunFill);
  const { doesSessionExist } = useSessionContext() as any;
  const { toggleColorMode: toggleMode } = useColorMode();
  const theme = useColorModeValue('dark', 'light');

  const logOut = async () => {
    localStorage.removeItem('isWizardCompleted');
    await signOut();
    router.replace('/');
  };

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
          aria-label={`Switch to ${theme} mode`}
          variant="ghost"
          color="current"
          mr={{ base: '3', md: '3' }}
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
        {doesSessionExist && router.pathname !== '/wizard' && (
          <Box display={{ base: 'inline', md: 'none' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu />}
                variant="outline"
              />
              <MenuList>
                <MenuItem icon={<AiOutlineUser />} onClick={() => router.push('/profile')}>
                  My Profile
                </MenuItem>
                <MenuItem icon={<BiLogOut />} onClick={logOut}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}

        <Box display={{ base: 'none', md: 'inline' }}>
          {doesSessionExist && router.pathname === '/' && (
            <Button
              onClick={logOut}
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
        </Box>
        {/* // renders only in  mobile when user is not logged in */}
        {!doesSessionExist && router.pathname === '/' && (
          <Button
            display={{ base: 'inline', md: 'none' }}
            onClick={() => router.push('/auth')}
            _hover={{ cursor: 'pointer', bg: '#1328EC', color: 'white' }}
            px={{ base: '25px', lg: '50px' }}
            mr="20px"
            variant="outline"
          >
            Login
          </Button>
        )}
      </div>
    </Box>
  );
};
