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
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

interface Disclosure {
  isOpen: boolean;
  onClose: () => void;
  handleModalAction: () => void;
}

export const CreateTeamModal = ({ isOpen, onClose, handleModalAction }: Disclosure) => {

  const [isCreated, setIsCreated] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ isCreated ? 'Congratulations! 🎉': 'Create your team!'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {
            isCreated ? (
              <>
                <Text
                  as="b">
                  Your team is registered for StackUp!
                </Text>
                <Text mt={2}>
                  Make sure that all of the team members check their emails to join this team and complete their registration.
                </Text>
              </>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Github ID of Team Member #1 (Yourself)</FormLabel>
                  <Input placeholder='eg. @yanchummar' />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Github ID of Team Member #2</FormLabel>
                  <Input placeholder='eg. @rohittp0' />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Github ID of Team Member #3</FormLabel>
                  <Input placeholder='eg. @appukurian' />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Github ID of Team Member #4 (Optional)</FormLabel>
                  <Input placeholder='eg. @akhilmhdh' />
                </FormControl>
              </>
            )
          }
        </ModalBody>
        
        {
          !isCreated ? (
            <ModalFooter>
              <Button onClick={onClose} mr={3}>Cancel</Button>
              <Button colorScheme='blue'>
                Create Team
              </Button>
            </ModalFooter>
          ) : false
        }
      </ModalContent>
    </Modal>
  );
};
