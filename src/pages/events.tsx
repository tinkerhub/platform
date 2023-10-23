import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getUserData } from '@/api/firebase';
import { CreateTeamModal } from '@/views/events/components/CreateTeamModal';
import { EventsLayout } from '@/layout/EventsLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { JoinTeamModal } from '@/views/events/components/JoinTeamModal';
import { Form } from '@/types';
import {CopyText} from "@/components/copy";

const Index = () => {
    const [userInfo, setUserInfo] = useState<Form>();
    const [user, loading, error] = useAuthState(auth);
    const [createOpen, setCreateOpen] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if(!loading && (error || !user))
            router.push('/auth').then();
        else if(user)
            getUserData(user.phoneNumber, user.uid).then(setUserInfo);
    }, [user, loading, error, router, createOpen, joinOpen]);

    return (
        <>
            <CreateTeamModal
                isOpen={createOpen}
                onClose={setCreateOpen}
                user={userInfo} />
            <JoinTeamModal
                isOpen={joinOpen}
                onClose={setJoinOpen}
                user={userInfo}
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
                            {userInfo && userInfo.team && <CopyText label="Team ID" text={userInfo.team} />}
                            {userInfo && !userInfo.team &&
                              <>
                                <Button
                                  onClick={() => setCreateOpen(true)}
                                  variant='solid' colorScheme='blue'>
                                  Create Team
                                </Button>
                                <Button
                                  ml={3}
                                  onClick={() => setJoinOpen(true)}
                                  variant='solid' colorScheme='blue'>
                                  Join Team
                                </Button>
                              </>
                            }
                            {!userInfo && <p>Loading...</p>}
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
