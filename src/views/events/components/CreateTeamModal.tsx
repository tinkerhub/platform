import {
    Box,
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
import {doc, getDoc, serverTimestamp, writeBatch} from 'firebase/firestore';
import { db } from '@/api/firebase';
import { Form } from '@/types';


interface CreateTeamDisclosure {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    user: Form | undefined;
}

function Success({ onClose, teamCode }: { onClose: () => void, teamCode: string }) {
    return (
        <>
            <ModalHeader>Congratulations! 🎉</ModalHeader>
            <ModalCloseButton />;
            <ModalBody pb={6}>
                <Text
                    as='b'>
                    You&apos;re registered for StackUp!
                </Text>
                <Text mt={2}>
                    Your Team&apos;s Code is: <b>{teamCode}</b>
                </Text>
                <Text
                    fontSize={'sm'}
                    as='i'
                    mt={1}>
                    Ask your teammates to join your team using this Team Code.
                </Text>
            </ModalBody>;

            <ModalFooter>
                <Button onClick={onClose} mr={3}>Done</Button>
            </ModalFooter>
        </>
    );
}

export const CreateTeamModal = ({ isOpen, onClose, user }: CreateTeamDisclosure) => {

    const [teamId, setTeamId] = useState<string>();
    const [teamName, setTeamName] = useState('');

    const toast = useToast();
    const message = useMemo(() => (promise: Promise<unknown>) => {
        toast.promise(promise, {
            success: { title: 'Success', description: 'Team created!' },
            error: {},
            loading: { title: 'Creating', description: 'Please wait...' }
        });

        promise.catch((e) => toast({
            title: 'Error',
            description: String(e),
            status: 'error'
        }));
    }, [toast]);

    async function handleCreate() {
        if (!user)
            throw 'Please login';

        const name = teamName.toLowerCase().replace(' ', '-').trim();
        const teamRef = doc(db, 'teams', name);
        const userRef = doc(db, 'users', user.mobile);

        let team = await getDoc(teamRef);

        if (team.exists())
            throw 'Team name already taken';

        const batch = writeBatch(db);

        batch.set(teamRef, {
            name,
            lead: user,
            createdAt: serverTimestamp(),
            members: []
        });

        batch.update(userRef, {
            team: name
        });

        await batch.commit();

        setTeamId(name);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => onClose(false)}>
            <ModalOverlay />
            <ModalContent>
                {teamId ? <Success onClose={() => onClose(false)} teamCode={teamId} /> :
                    <>
                        <ModalHeader>Create your team!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Your Team&apos;s Name</FormLabel>
                                <Input placeholder='eg. BitBytes' onChange={(e) => setTeamName(e.target.value)} />
                            </FormControl>
                            <Box
                                mt={3}
                                ml={1}
                                mr={1}>
                                <Text
                                    fontSize={'sm'}
                                    pt={2}
                                    as='i'>
                                    A team should have a minimum of <b>3 members</b> and maximum of <b>4 members</b>.
                                </Text>
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={() => onClose(false)} mr={3}>Cancel</Button>
                            <Button colorScheme='blue' onClick={() => message(handleCreate())}>
                                Create Team
                            </Button>
                        </ModalFooter>
                    </>
                }
            </ModalContent>
        </Modal>
    );
};
