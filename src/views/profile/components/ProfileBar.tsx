import {Box, Button, Flex, Heading} from '@chakra-ui/react';
import {MdOutlineCancel} from 'react-icons/md';
import {BiArrowBack} from 'react-icons/bi';
import {FiEdit} from 'react-icons/fi';
import {AiOutlineSave} from 'react-icons/ai';
import {useRouter} from 'next/router';
import {Form} from "@/types";

interface BarProp {
    isEdit: boolean;
    editHandler: () => void;
    cancelEditHandler: () => void;
    user: Form;
}

export const ProfileBar = ({
                               isEdit,
                               editHandler,
                               user,
                               cancelEditHandler,
                           }: BarProp) => {
    const router = useRouter();

    const handleConnectDiscord = () => {
        const state = encodeURIComponent(user.mobile);
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/discord`);
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        return router.push(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=identify&state=${state}`);
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            mt="4"
            flexDirection={{base: 'column-reverse', lg: 'row'}}
        >
            <Box
                display="flex"
                flexDirection={{base: 'column', md: 'row'}}
                alignItems={{base: 'start', md: 'center'}}
            >
                <Heading as="h2" size="xl">
                    My Profile
                </Heading>
            </Box>
            <Flex gap="3" wrap="wrap" mb={{base: '20px', lg: '0px'}}>

              <Button
                  p="3"
                  colorScheme="blue"
                  variant="outline"
                  alignSelf="center"
                  _hover={{
                    cursor: 'pointer',
                    bg: '#1328EC',
                    color: 'white',
                    borderColor: 'transparent',
                  }}
                  onClick={handleConnectDiscord}
              >
                  Join Discord
              </Button>
                {isEdit && (
                    <Button
                        p="3"
                        colorScheme="blue"
                        variant="outline"
                        alignSelf="center"
                        _hover={{
                            cursor: 'pointer',
                            bg: '#1328EC',
                            color: 'white',
                            borderColor: 'transparent',
                        }}
                        leftIcon={<BiArrowBack/>}
                        onClick={() => router.push('/')}
                    >
                        Back to home
                    </Button>
                )}
                {!isEdit && (
                    <Button
                        p="5"
                        colorScheme="blue"
                        variant="outline"
                        alignSelf="center"
                        _hover={{
                            cursor: 'pointer',
                            bg: '#1328EC',
                            color: 'white',
                            borderColor: 'transparent',
                        }}
                        leftIcon={<MdOutlineCancel/>}
                        onClick={cancelEditHandler}
                    >
                        cancel
                    </Button>
                )}
                {isEdit && (
                    <Button
                        p="5"
                        colorScheme="blue"
                        backgroundColor="rgba(65, 83, 240, 1)"
                        alignSelf="center"
                        onClick={editHandler}
                        _hover={{cursor: 'pointer', bg: '#1328EC'}}
                        leftIcon={<FiEdit/>}
                        color="white"
                    >
                        Edit
                    </Button>
                )}
                {!isEdit && (
                    <Button
                        colorScheme="blue"
                        alignSelf="center"
                        type="submit"
                        backgroundColor="rgba(65, 83, 240, 1)"
                        color="white"
                        _hover={{cursor: 'pointer', bg: '#1328EC'}}
                        leftIcon={<AiOutlineSave/>}
                    >
                        Save
                    </Button>
                )}
            </Flex>
        </Box>
    );
};
