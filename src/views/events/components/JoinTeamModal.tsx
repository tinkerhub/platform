import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

interface CreateTeamDisclosure {
    isOpen: boolean;
    onClose: () => void;
}

export default function Success({ onClose }: { onClose: () => void }) {
    return (
        <>
            <ModalHeader>Congratulations! 🎉</ModalHeader>
            <ModalCloseButton />;
            <ModalBody pb={6}>
                <Text as='b'>
                    You&apos;ve joined the team!
                </Text>
                <Text mt={1}>
                    All set, you&apos;re ready to go!
                </Text>
            </ModalBody>;

            <ModalFooter>
                <Button onClick={onClose} mr={3}>Done</Button>
            </ModalFooter>
        </>
    );
}

export const JoinTeamModal = ({ isOpen, onClose }: CreateTeamDisclosure) => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const toast = useToast();
    const messages = useMemo(() => ({
        success: { title: 'Success', description: "Joined the team" },
        error: { title: 'Oops', description: "Something went wrong" },
        loading: { title: 'Joining', description: "Please wait..." }
    }), []);

    async function handleJoin() {
        setIsSuccess(true);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {isSuccess ? <Success onClose={onClose} /> :
                    <>
                        <ModalHeader>Join a team!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Text>
                                Enter the Team Code that you&apos;ve received from your team leader.
                            </Text>
                            <FormControl mt={5}>
                                <FormLabel>Team Code</FormLabel>
                                <Input placeholder='eg. 123456' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose} mr={3}>Cancel</Button>
                            <Button colorScheme='blue' onClick={() => toast.promise(handleJoin(), messages)}>
                                Join Team
                            </Button>
                        </ModalFooter>
                    </>
                }
            </ModalContent>
        </Modal>
    );
};
