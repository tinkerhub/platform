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
import {Dispatch, SetStateAction, useMemo, useState} from 'react';
import { Form } from '@/types';
import {arrayUnion, doc, getDoc, writeBatch} from 'firebase/firestore';
import { db } from '@/api/firebase';

interface CreateTeamDisclosure {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    user: Form | undefined;
}

function Success({ onClose }: { onClose: () => void }) {
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

export const JoinTeamModal = ({ isOpen, onClose, user }: CreateTeamDisclosure) => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [teamId, setTeamId] = useState("");

    const toast = useToast();
    const message = useMemo(() => (promise: Promise<unknown>) => {
        toast.promise(promise, {
            success: { title: 'Success', description: 'Team Joined!' },
            error: {},
            loading: { title: 'Creating', description: 'Please wait...' }
        });

        promise.catch((e) => toast({
            title: 'Error',
            description: String(e),
            status: 'error'
        }));
    }, [toast]);

    async function handleJoin() {
        if (!user)
            throw 'Please login';

        const teamRef = doc(db, 'teams', teamId);
        const userRef = doc(db, 'users', user.mobile);

        let team = await getDoc(teamRef);

        if (!team.exists())
            throw 'Invalid Team ID';

        const batch = writeBatch(db);

        batch.update(teamRef, {
            members: arrayUnion(user.id)
        });

        batch.update(userRef, {
            team: teamId
        });

        await batch.commit();
        setIsSuccess(true);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => onClose(false)}>
            <ModalOverlay />
            <ModalContent>
                {isSuccess ? <Success onClose={() => onClose(false)} /> :
                    <>
                        <ModalHeader>Join a team!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Text>
                                Enter the Team Code that you&apos;ve received from your team leader.
                            </Text>
                            <FormControl mt={5}>
                                <FormLabel>Team Code</FormLabel>
                                <Input placeholder='eg. super-duper-team' onChange={(e) => setTeamId(e.target.value)}/>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={() => onClose(false)} mr={3}>Cancel</Button>
                            <Button colorScheme='blue' onClick={() => message(handleJoin())}>
                                Join Team
                            </Button>
                        </ModalFooter>
                    </>
                }
            </ModalContent>
        </Modal>
    );
};
