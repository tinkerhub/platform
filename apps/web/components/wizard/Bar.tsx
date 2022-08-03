import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export interface Prop {
  val: number;
  back: () => void;
}

export const Bar = ({ val, back }: Prop) => {
  const step = [1, 2, 3];
  return (
    <Box display="flex" justifyContent="space-between">
      {val > 1 && (
        <ArrowBackIcon
          color="black"
          _hover={{ cursor: 'pointer', bg: 'grey', color: 'white', transition: '.2s' }}
          fontSize="20px"
          borderRadius="3xl"
          w="40px"
          h="40px"
          p="1"
          onClick={back}
        />
      )}

      <Heading as="h2" size="lg" color="black">
        About You
      </Heading>
      <Box display="flex" justifyContent="space-between" alignSelf="center" w="50px">
        {step.map((el) => (
          <Text color="black" fontWeight={el === val ? 'extrabold' : 'normal'} fontSize="20px">
            {el}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
