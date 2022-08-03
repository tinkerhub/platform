import { Box, Button, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';

export interface Prop {
  next: () => void;
}

export const One = ({ next }: Prop) => (
  <motion.div
    animate={{ scale: 1, opacity: 1 }}
    initial={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <Box mt="30px">
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
        <Text color="black">Name</Text>
        <Input bg="rgba(240, 240, 240, 1)" />
      </Box>
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
        <Text color="black">Mobile Number</Text>
        <Input bg="rgba(240, 240, 240, 1)" />
      </Box>
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
        <Text color="black">Email</Text>
        <Input bg="rgba(240, 240, 240, 1)" />
      </Box>
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
        <Text color="black">Date of Birth</Text>
        <Input bg="rgba(240, 240, 240, 1)" />
      </Box>
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
        <Text color="black">Preferred pronoun</Text>
        <Input bg="rgba(240, 240, 240, 1)" />
      </Box>
      <Box mt="25px">
        <Button colorScheme="blue" width="100%" onClick={next}>
          Next
        </Button>
      </Box>
    </Box>
  </motion.div>
);
