import { Box, Button, Checkbox, HStack, Input, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Prop } from './One';

export const Two = ({ next }: Prop) => (
  <motion.div
    animate={{ scale: 1, opacity: 1 }}
    initial={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <Box mt="30px">
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
        <Text color="black">Best way to describe yourself</Text>
        <Input bg="rgba(240, 240, 240, 1)" />
      </Box>
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between" mt="15px">
        <Text color="black">Skill</Text>
        <Input bg="rgba(240, 240, 240, 1)" />
      </Box>
      <Box display="flex" flexDirection="column" h="60px" justifyContent="space-between" mt="15px">
        <Text color="black">Can you be a Mentor</Text>
        <HStack spacing="20px" bg="rgba(240, 240, 240, 1)">
          <Checkbox colorScheme="black" defaultChecked borderColor="black">
            <Text color="black">Yes</Text>
          </Checkbox>

          <Checkbox colorScheme="black" borderColor="black">
            <Text color="black">No</Text>
          </Checkbox>
        </HStack>
      </Box>
      <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between" mt="15px">
        <Text color="black">Select Your campus</Text>
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
