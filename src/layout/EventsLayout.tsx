import {useRouter} from 'next/router';
import {Box, Flex} from '@chakra-ui/react';
import {Footer, Topbar} from './components';
import type {Child} from '@/types';
import {PageLoader} from '@/components/loading';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/api/firebase";
import {signOut} from "@firebase/auth";

export const EventsLayout = ({children}: Child) => {
    const router = useRouter();

    const [_, loading] = useAuthState(auth);

    const logOut = async () => {
      localStorage.removeItem('isWizardCompleted');
      await signOut(auth);
      await router.replace('/');
    };

    if (loading) {
      return (
        <Box>
          <PageLoader/>
          <Box display="none">{children}</Box>
        </Box>
      );
    }

    return (
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        minH="100vh"
        p={{base: '20px', sm: '30px', md: '74px'}}
        pt={{base: '40px', md: '50px'}}>
        <Topbar profileBtn showBtn btnText="Log Out" btnFunc={logOut}/>
        {children}
        <Footer/>
      </Flex>
    );
};
