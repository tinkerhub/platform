import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getUserData } from '@/api/firebase';
import { CreateTeamModal } from '@/views/events/components/CreateTeamModal';
import { EventsLayout } from '@/layout/EventsLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { JoinTeamModal } from '@/views/events/components/JoinTeamModal';
import { Form } from '@/types';

const Index = () => {
    const [user, setUser] = useState<Form>();
    const [pUser] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (pUser === null)
            router.push('/auth').then();
        else if (pUser)
            getUserData(pUser.phoneNumber, pUser.uid).then((user) => setUser(user));

    }, [pUser, router]);

    // for cancel dialogue
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isJoinOpen, onOpen: onJoinOpen, onClose: onJoinClose } = useDisclosure();


    return (
        <>
            <CreateTeamModal
                isOpen={isOpen}
                onClose={onClose}
                handleModalAction={() => false} />
            <JoinTeamModal
                isOpen={isJoinOpen}
                onClose={onJoinClose}
            />
            <Box mt='2' mb='50px'>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'>
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src='https://www.helsinki.fi/assets/drupal/styles/16_10_fallback/s3/media-image/fullstack_stack_1842x1080.png.jpeg?itok=zEKFAthk'
                        alt='Full-stack icon'
                        borderRight={'1px'}
                        borderColor={'gray.200'} />
                    <Stack ml={1}>
                        <CardBody>
                            <Heading size='md'>Stack Up</Heading>
                            <Text py='1'>
                                Full-stack developer skill up program for students.
                            </Text>
                            <Text
                                as='b'
                                color={'gray.500'}
                                fontSize='md'>
                                November 1 - 14
                            </Text>
                        </CardBody>
                        <CardFooter>
                            {user && user.team && <p>Joined</p>}
                            {user && !user.team &&
                              <>
                                <Button
                                  onClick={onOpen}
                                  variant='solid' colorScheme='blue'>
                                  Create Team
                                </Button>
                                <Button
                                  ml={3}
                                  onClick={onJoinOpen}
                                  variant='solid' colorScheme='blue'>
                                  Join Team
                                </Button>
                              </>
                            }
                            {!user && <p>Loading...</p>}
                        </CardFooter>
                    </Stack>
                </Card>
            </Box>
        </>
    )
        ;
};

Index.Layout = EventsLayout;

export default Index;
