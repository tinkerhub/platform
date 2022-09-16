import { CopyIcon } from '@chakra-ui/icons';
import { Heading, Button, Box } from '@chakra-ui/react';

import React from 'react';

interface BarProp {
  copyFile: () => void;
  edit: boolean;
  editHandler: () => void;
  id: string | undefined;
}

export const ProfileBar = ({ copyFile, edit, editHandler, id = 'Error' }: BarProp) => (
  <Box display="flex" justifyContent="space-between" mt="4">
    <Box display="flex" justifyContent="space-between">
      <Heading as="h2" size="xl" alignSelf="center">
        My Profile
      </Heading>
      <Heading as="h2" fontSize={{ base: '16px', md: 'md' }} alignSelf="center" pl={5}>
        {id}
      </Heading>
      <CopyIcon
        onClick={copyFile}
        w={4}
        h={4}
        ml={3}
        _hover={{ cursor: 'pointer', color: 'grey' }}
        alignSelf="center"
      />
    </Box>
    <Box>
      {edit && (
        <Button
          width={{ md: '100px' }}
          colorScheme="blue"
          backgroundColor="rgba(65, 83, 240, 1)"
          alignSelf="center"
          onClick={editHandler}
          color="white"
        >
          Edit
        </Button>
      )}
      {!edit && (
        <Button
          colorScheme="blue"
          alignSelf="center"
          type="submit"
          backgroundColor="rgba(65, 83, 240, 1)"
          color="white"
        >
          Save
        </Button>
      )}
    </Box>
  </Box>
);
