import { Heading, Button, Box, Flex, Text, Icon } from '@chakra-ui/react';
import { MdOutlineContentCopy, MdOutlineCancel } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineSave } from 'react-icons/ai';
import { useRouter } from 'next/router';

interface BarProp {
  copyMembershipId: () => void;
  isEdit: boolean;
  editHandler: () => void;
  id: string | undefined;
  cancelEditHandler: () => void;
}

export const ProfileBar = ({
  copyMembershipId,
  isEdit,
  editHandler,
  id = 'Error',
  cancelEditHandler,
}: BarProp) => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mt="4"
      flexDirection={{ base: 'column-reverse', lg: 'row' }}
    >
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
            onClick={copyMembershipId}
            w={4}
            h={4}
            ml={3}
            alignSelf="end"
            _hover={{ cursor: 'pointer', color: 'grey' }}
          />
        </Flex>
      </Box>
      <Flex
        justifyContent="space-between"
        w={{ base: '100%', lg: isEdit ? '280px' : '230px' }}
        mb={{ base: '20px', lg: '0px' }}
      >
        {isEdit && (
          <Button
            p="3"
            colorScheme="blue"
            variant="outline"
            alignSelf="center"
            _hover={{ cursor: 'pointer', bg: '#1328EC', color: 'white', border: 'none' }}
            leftIcon={<BiArrowBack />}
            onClick={() => router.push('/')}
          >
            Back to home
          </Button>
        )}
        {!isEdit && (
          <Button
            p="5"
            colorScheme="blue"
            variant="outline"
            alignSelf="center"
            _hover={{ cursor: 'pointer', bg: '#1328EC', color: 'white', border: 'none' }}
            leftIcon={<MdOutlineCancel />}
            onClick={cancelEditHandler}
          >
            cancel
          </Button>
        )}
        {isEdit && (
          <Button
            p="5"
            colorScheme="blue"
            backgroundColor="rgba(65, 83, 240, 1)"
            alignSelf="center"
            onClick={editHandler}
            _hover={{ cursor: 'pointer', bg: '#1328EC' }}
            leftIcon={<FiEdit />}
            color="white"
          >
            Edit
          </Button>
        )}
        {!isEdit && (
          <Button
            colorScheme="blue"
            alignSelf="center"
            type="submit"
            backgroundColor="rgba(65, 83, 240, 1)"
            color="white"
            _hover={{ cursor: 'pointer', bg: '#1328EC' }}
            leftIcon={<AiOutlineSave />}
          >
            Save
          </Button>
        )}
      </Flex>
    </Box>
  );
};
