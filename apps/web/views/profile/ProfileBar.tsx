import { Heading, Button, Box, Flex, Text, Icon } from '@chakra-ui/react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineSave } from 'react-icons/ai';
import { useRouter } from 'next/router';

import React from 'react';

interface BarProp {
  copyFile: () => void;
  edit: boolean;
  editHandler: () => void;
  id: string | undefined;
}

export const ProfileBar = ({ copyFile, edit, editHandler, id = 'Error' }: BarProp) => {
  const router = useRouter();

  return (
    <Box display="flex" justifyContent="space-between" mt="4">
      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'start', md: 'center' }}
      >
        <Heading as="h2" size="xl">
          My Profile
        </Heading>
        <Flex mt={{ base: '14px', md: '0px' }} ml={{ sm: '0px', lg: '30px' }}>
          <Heading as="h2" fontSize={{ base: '16px', md: 'md' }} pl={{ base: '0px', md: '5' }}>
            <Text fontSize="14px" fontWeight="normal">
              Membership ID
            </Text>
            {id}
          </Heading>

          <Icon
            as={MdOutlineContentCopy}
            onClick={copyFile}
            w={4}
            h={4}
            ml={3}
            alignSelf="end"
            _hover={{ cursor: 'pointer', color: 'grey' }}
          />
        </Flex>
      </Box>
      <Flex justifyContent="space-between" w="290px" flexDirection={{ base: 'column', lg: 'row' }}>
        <Button
          p="5"
          colorScheme="blue"
          variant="outline"
          alignSelf="center"
          bg="white"
          onClick={() => router.push('/')}
        >
          <Flex justifyContent="space-between" color="rgba(65, 83, 240, 1)">
            <Icon as={BiArrowBack} alignSelf="center" mr="10px" /> Back to home
          </Flex>
        </Button>
        {edit && (
          <Button
            p="5"
            colorScheme="blue"
            backgroundColor="rgba(65, 83, 240, 1)"
            alignSelf="center"
            onClick={editHandler}
            color="white"
          >
            <Flex justifyContent="space-between">
              <Icon as={FiEdit} alignSelf="center" mr="10px" /> Edit
            </Flex>
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
            <Flex justifyContent="space-between">
              <Icon as={AiOutlineSave} alignSelf="center" mr="10px" fontSize="20px" />
              Save
            </Flex>
          </Button>
        )}
      </Flex>
    </Box>
  );
};
