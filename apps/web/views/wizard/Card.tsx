import { Box } from '@chakra-ui/react';

import type { Child } from '../../types';

export const CardBio = ({ children }: Child) => (
  <Box
    w="400px"
    p="35px"
    borderRadius="lg"
    // borderColor="rgba(200, 200, 200, 1)"
    borderColor="transparent"
    borderWidth=".5px"
    mt="35px"
    boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
  >
    {children}
  </Box>
);
