import React from 'react';
import type { NextPage } from 'next';
import { signOut } from 'supertokens-auth-react/recipe/passwordless';
import { ArrowBackIcon, CopyIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { Topbar, BottomBar } from '../../components/Navbar';

const index: NextPage = () => {
  const LogOut = async () => {
    await signOut();
    window.location.href = '/';
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();
  const copyFile = () => {
    toast({
      title: 'Membership id copied.',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <>
      <Topbar showBtn btnText="Log Out" btnFunc={LogOut} />
      <Box bg="white" minH="94vh" p={5}>
        <Box>
          <ArrowBackIcon
            color="black"
            w={8}
            h={8}
            ml={8}
            _hover={{ cursor: 'pointer', color: 'grey' }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" p={5}>
          <Box display="flex" justifyContent="space-between">
            <Heading color="black" as="h2" size="xl">
              My Profile
            </Heading>
            <Heading color="black" as="h2" size="sm" alignSelf="center" pl={5}>
              membership ID
            </Heading>
            <CopyIcon
              onClick={copyFile}
              color="black"
              w={6}
              h={6}
              ml={8}
              _hover={{ cursor: 'pointer', color: 'grey' }}
            />
          </Box>
          <Button colorScheme="blue" alignSelf="center">
            Edit
          </Button>
        </Box>
        <Flex flexDirection="column" pl="40px">
          <HStack spacing="120px">
            <Box w="250px" p="10px">
              <Text color="black">Name</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">Best way to describe yourself</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">House Name</Text>
              <Input
                color="black"
                variant="filled"
                placeholder="jhondoe"
                bg="rgba(240, 240, 240, 1)"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
          </HStack>
          <HStack spacing="120px">
            <Box w="250px" p="10px">
              <Text color="black">Mobile number</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">Can you be a mentor</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">Street Name</Text>
              <Input
                color="black"
                variant="filled"
                placeholder="jhondoe"
                bg="rgba(240, 240, 240, 1)"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
          </HStack>
          <HStack spacing="120px">
            <Box w="250px" p="10px">
              <Text color="black">Email</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">Select Your campus</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">District</Text>
              <Input
                color="black"
                variant="filled"
                placeholder="jhondoe"
                bg="rgba(240, 240, 240, 1)"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
          </HStack>
          <HStack spacing="120px">
            <Box w="250px" p="10px">
              <Text color="black">Date of Birth</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">Skill</Text>
              <Input
                variant="filled"
                placeholder="Filled"
                bg="rgba(240, 240, 240, 1)"
                color="black"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
            <Box w="250px">
              <Text color="black">Pincode</Text>
              <Input
                color="black"
                variant="filled"
                placeholder="jhondoe"
                bg="rgba(240, 240, 240, 1)"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
          </HStack>
          <HStack>
            <Box w="250px" ml="5px">
              <Text color="black">Prefered Pronoun</Text>
              <Input
                color="black"
                variant="filled"
                placeholder="jhondoe"
                bg="rgba(240, 240, 240, 1)"
                _focus={{ bg: 'rgba(240, 240, 240, 1)' }}
              />
            </Box>
          </HStack>
        </Flex>
        <Box p={6}>
          <BottomBar />
        </Box>
      </Box>
    </>
  );
};

export default index;
