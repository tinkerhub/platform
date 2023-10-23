import { Box } from '@chakra-ui/react';

import type { Child } from '@/types';

export const CardBio = ({ children }: Child) => (
  <Box
    w="400px"
    p="35px"
    borderRadius="lg"
    mt={{ base: '0px', md: '35px' }}
    border={{ base: 'none', md: ' .5px solid rgba(200, 200, 200,1)' }}
  >
    {children}
  </Box>
);
