import { Box } from '@chakra-ui/react';

import type { Child } from '../../types';

export const CardBio = ({ children }: Child) => (
  <Box
    minH="550px"
    w="450px"
    bg="white"
    p="35px"
    borderRadius="lg"
    borderColor="rgba(200, 200, 200, 1)"
    borderWidth=".5px"
  >
    {children}
  </Box>
);
