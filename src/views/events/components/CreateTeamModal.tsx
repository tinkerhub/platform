import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
  Box
} from '@chakra-ui/react';
import { useState } from 'react';

interface CreateTeamDisclosure {
  isOpen: boolean;
  onClose: () => void;
  handleModalAction: () => void;
  isJoin?: boolean;
}

export const CreateTeamModal = ({ isOpen, onClose, handleModalAction, isJoin }: CreateTeamDisclosure) => {

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ isSuccess ? 'Congratulations! 🎉': isJoin ? 'Join a team!' : 'Create your team!'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {
            isJoin ? (
              isSuccess ? (
                <>
                  <Text
                    as="b">
                    You've joined the team!
                  </Text>
                  <Text mt={1}>
                    All set, you're ready to go!
                  </Text>
                </>
              ) : (
                <>
                  <Text>
                    Enter the Team Code that you've received from your team leader.
                  </Text>
                  <FormControl mt={5}>
                    <FormLabel>Team Code</FormLabel>
                    <Input placeholder='eg. 123456' />
                  </FormControl>
                </>
              )
            ) : (
              isSuccess ? (
                <>
                  <Text
                    as="b">
                    You're registered for StackUp!
                  </Text>
                  <Text mt={2}>
                    Your Team's Code is: <b>123456</b>
                  </Text>
                  <Text 
                    fontSize={'sm'}
                    as='i'
                    mt={1}>
                    Ask your teammates to join your team using this Team Code.
                  </Text>
                </>
              ) : (
                <>
                  <FormControl>
                    <FormLabel>Your Team's Name</FormLabel>
                    <Input placeholder='eg. BitBytes' />
                  </FormControl>
                  <Box
                    mt={3}
                    ml={1}
                    mr={1}>
                    <Text
                      fontSize={'sm'}
                      pt={2}
                      as="i" >
                      A team should have a minimum of <b>3 members</b> and maximum of <b>4 members</b>.
                    </Text>
                  </Box>
                </>
              )
            )
          }
        </ModalBody>
        
        {
          isJoin ? (
            isSuccess ? (
              <ModalFooter>
                <Button onClick={onClose} mr={3}>Done</Button>
              </ModalFooter>
            ) : (
              <ModalFooter>
                <Button onClick={onClose} mr={3}>Cancel</Button>
                <Button colorScheme='blue' onClick={() => setIsSuccess(true)}>
                  Join Team
                </Button>
              </ModalFooter>
            )
          ) : (
            isSuccess ? (
              <ModalFooter>
                <Button onClick={onClose} mr={3}>Done</Button>
              </ModalFooter>
            ) : (
              <ModalFooter>
                <Button onClick={onClose} mr={3}>Cancel</Button>
                <Button colorScheme='blue' onClick={() => setIsSuccess(true)}>
                  Create Team
                </Button>
              </ModalFooter>
            )
          )
        }
      </ModalContent>
    </Modal>
  );
};
