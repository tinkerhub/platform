import { Box } from '@chakra-ui/react';

import type { Child } from '../../../types';

export const CardBio = ({ children }: Child) => (
  <Box
    w="400px"
    p="35px"
    borderRadius="lg"
    borderColor="rgba(200, 200, 200, 1)"
    borderWidth=".5px"
    mt="35px"
  >
    {children}
  </Box>
);