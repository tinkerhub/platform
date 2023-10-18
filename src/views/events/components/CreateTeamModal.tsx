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
} from '@chakra-ui/react';
import { useRef } from 'react';

interface Disclosure {
  isOpen: boolean;
  onClose: () => void;
  handleModalAction: () => void;
}

export const CreateTeamModal = ({ isOpen, onClose, handleModalAction }: Disclosure) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your team!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
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
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>Cancel</Button>
          <Button colorScheme='blue'>
            Create Team
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
