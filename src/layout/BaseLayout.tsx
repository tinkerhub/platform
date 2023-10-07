import {useRouter} from 'next/router';
import {Box, Flex} from '@chakra-ui/react';
import {Footer, Topbar} from './components';
import type {Child} from '@/types';
import {PageLoader} from '@/components/loading';
import {auth} from "@/api/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export const BaseLayout = ({children}: Child) => {
    const router = useRouter();

    const [user, loading, error] = useAuthState(auth);

    const redirect = () => {
        router.push('/auth');
    };

    const profileDirect = () => {
        router.push('/profile');
    };
    const path = router.pathname;

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
            p={{base: '20px', sm: '30px', md: '55px'}}
            pt={{base: '40px', md: '50px'}}
        >
            <Topbar
                showBtn={path === '/'}
                btnText={user ? 'My Profile' : 'Login'}
                btnFunc={user ? profileDirect : redirect}
            />
            {children}
            <Footer/>
        </Flex>
    );
};
