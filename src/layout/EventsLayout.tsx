import {Box, Flex} from '@chakra-ui/react';
import {Footer, TopBar} from './components';
import type {Child} from '@/types';
import {PageLoader} from '@/components/loading';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/api/firebase";

export const EventsLayout = ({children}: Child) => {
    const [_, loading] = useAuthState(auth);


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
        <TopBar/>
        {children}
        <Footer/>
      </Flex>
    );
};
