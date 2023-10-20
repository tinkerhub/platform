/* eslint-disable react/jsx-props-no-spreading */
import {useEffect, useState} from 'react';
import {Box, Button, Flex, useDisclosure, useToast, Card, Image, Stack, CardBody, Heading, Text, CardFooter } from '@chakra-ui/react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {InferType} from 'yup';
import {registerFormValidator} from '@/views/wizard';
import {CancelDialogue, ProfileBar, RowOne, RowThree, RowTwo} from '@/views/profile';
import {Errors, Form} from '@/types';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db, getUserData} from "@/api/firebase";
import { CreateTeamModal } from '@/views/events/components/CreateTeamModal';
import { EventsLayout } from '@/layout/EventsLayout';

type FormType = InferType<typeof registerFormValidator>;

const Index = () => {
  const [pUser] = useAuthState(auth);
  const [user, setUser] = useState<Form>();

  useEffect(() => {
    getUserData(pUser?.phoneNumber, pUser?.uid).then(setUser);
  }, [pUser?.phoneNumber])

  // for cancel dialogue
  const {isOpen, onOpen, onClose} = useDisclosure();

  const toast = useToast();

  return (
    <>
      <CreateTeamModal
        isOpen={isOpen}
        onClose={onClose}
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
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

Index.Layout = EventsLayout;

export default Index;
