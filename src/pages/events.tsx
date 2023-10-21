import {Box, Button, useDisclosure, useToast, Card, Image, Stack, CardBody, Heading, Text, CardFooter } from '@chakra-ui/react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/api/firebase";
import { CreateTeamModal } from '@/views/events/components/CreateTeamModal';
import { EventsLayout } from '@/layout/EventsLayout';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";

const Index = () => {
  const [teamId, setTeamId] = useState<string>();
  const [pUser] = useAuthState(auth);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("teamId") || localStorage.getItem("teamId");
    if(id) {
      localStorage.setItem("teamId", id);
      setTeamId(id);
    }

    if (pUser === null)
      router.push('/auth').then();

  }, [pUser, router, searchParams]);

  // for cancel dialogue
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isJoinOpen, onOpen: onJoinOpen, onClose: onJoinClose} = useDisclosure();

  const toast = useToast();

  return (
    <>
      <CreateTeamModal
        isOpen={isOpen}
        onClose={onClose}
        handleModalAction={() => false} />
      <CreateTeamModal
        isJoin
        isOpen={isJoinOpen}
        onClose={onJoinClose}
        handleModalAction={() => false} />
      <Box mt="2" mb="50px">
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
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

Index.Layout = EventsLayout;

export default Index;
