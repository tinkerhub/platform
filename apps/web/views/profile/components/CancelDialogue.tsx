import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface Disclosure {
  isOpen: boolean;
  onClose: () => void;
  handleModalAction: () => void;
}

export const CancelDialogue = ({ isOpen, onClose, handleModalAction }: Disclosure) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Are you sure you want to discard all of your changes?</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleModalAction}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
