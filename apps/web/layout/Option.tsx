import React from 'react';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';

export const Option = () => {
  const router = useRouter();
  const logOut = async () => {
    localStorage.removeItem('isWizardComplted');
    await signOut();
    router.replace('/');
  };
  return (
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
  );
};
