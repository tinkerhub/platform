/* eslint-disable react/require-default-props */
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { IoMdMoon } from 'react-icons/io';
import { BsFillSunFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '@/api/firebase';
import { signOut } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

interface NavProp {
  btnText?: string;
  btnFunc?: () => void;
  showBtn: boolean;
  profileBtn?: boolean;
}

export const Topbar = ({ btnFunc, btnText = 'Login/Signup', showBtn, profileBtn }: NavProp) => {
  const router = useRouter();
  const SwitchIcon = useColorModeValue(IoMdMoon, BsFillSunFill);
  const { toggleColorMode: toggleMode } = useColorMode();
  const theme = useColorModeValue('dark', 'light');

  const [user] = useAuthState(auth);

  const logOut = async () => {
    localStorage.removeItem('isWizardCompleted');
    await signOut(auth);
    await router.replace('/');
  };

  return (
    <Box display='flex' justifyContent='space-between' h={65} alignItems='center'>
      <Flex flexDirection='column'>
        <Link href='/' passHref>
          <Flex>
            <Heading size='lg'>Tinker</Heading>
            <Heading fontWeight='normal' size='lg'>
              Hub
            </Heading>
          </Flex>
          <Heading fontSize='13px' fontWeight='500' ml='2.5px'>
            Foundation
          </Heading>
        </Link>
      </Flex>
      <div>
        <IconButton
          size='md'
          fontSize='xl'
          aria-label={`Switch to ${theme} mode`}
          variant='ghost'
          color='current'
          mr={{ base: '3', md: '3' }}
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
        {user && router.pathname !== '/wizard' && (
          <Box display={{ base: 'inline', md: 'none' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<GiHamburgerMenu />}
                variant='outline'
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
          {user && router.pathname === '/' && (
            <Button
              onClick={logOut}
              _hover={{ cursor: 'pointer', bg: '#1328EC', color: 'white' }}
              px={{ base: '25px', lg: '50px' }}
              mr='20px'
              variant='outline'
            >
              Logout
            </Button>
          )}
          {
            profileBtn && (
              <Button
                colorScheme='blue'
                backgroundColor='rgba(65, 83, 240, 1)'
                onClick={btnFunc}
                _hover={{ cursor: 'pointer', bg: '#1328EC' }}
                mr={2}
                color='white'>
                My Profile
              </Button>
            )
          }
          {showBtn && (
            <Button
              colorScheme='blue'
              backgroundColor='rgba(65, 83, 240, 1)'
              onClick={btnFunc}
              _hover={{ cursor: 'pointer', bg: '#1328EC' }}
              color='white'
            >
              {btnText}
            </Button>
          )}
        </Box>
        {/* // renders only in  mobile when user is not logged in */}
        {!user && router.pathname === '/' && (
          <Button
            display={{ base: 'inline', md: 'none' }}
            onClick={() => router.push('/auth')}
            _hover={{ cursor: 'pointer', bg: '#1328EC', color: 'white' }}
            px={{ base: '25px', lg: '50px' }}
            mr='20px'
            variant='outline'
          >
            Login
          </Button>
        )}
      </div>
    </Box>
  );
};
