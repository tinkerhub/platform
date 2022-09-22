import { CopyIcon } from '@chakra-ui/icons';
import { Heading, Button, Box, Flex, Text } from '@chakra-ui/react';

import React from 'react';

interface BarProp {
  copyFile: () => void;
  edit: boolean;
  editHandler: () => void;
  id: string | undefined;
}

export const ProfileBar = ({ copyFile, edit, editHandler, id = 'Error' }: BarProp) => (
  <Box display="flex" justifyContent="space-between" mt="4">
    <Box
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'start', md: 'center' }}
    >
      <Heading as="h2" size="xl">
        My Profile
      </Heading>
      <Flex mt={{ base: '14px', md: '0px' }}>
        <Heading as="h2" fontSize={{ base: '16px', md: 'md' }} pl={{ base: '0px', md: '5' }}>
          <Text fontSize="14px" fontWeight="normal">
            Membership ID
          </Text>
          {id}
        </Heading>
        <CopyIcon
          onClick={copyFile}
          w={4}
          h={4}
          ml={3}
          alignSelf="end"
          _hover={{ cursor: 'pointer', color: 'grey' }}
        />
      </Flex>
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
