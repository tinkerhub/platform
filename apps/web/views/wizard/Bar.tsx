import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

export interface Prop {
  val: number;
  back: () => void;
}

export const Bar = ({ val, back }: Prop) => {
  const [x, setX] = useState(-10);
  useEffect(() => {
    if (val === 2) {
      setX(6);
    } else {
      setX(-10);
    }
    return () => {
      setX(0);
    };
  }, [val]);
  const step = [1, 2, 3];
  return (
    <Box display="flex" justifyContent="space-between">
      {val > 1 && (
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>
      )}
      <motion.div
        animate={{ x, scale: 1, opacity: 1, alignSelf: 'center' }}
        initial={{ opacity: 0, scale: 0.5, alignSelf: 'start' }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2" size="lg" color="black">
          About You
        </Heading>
      </motion.div>

      <Box display="flex" justifyContent="space-between" alignSelf="center" w="50px">
        {step.map((el) => (
          <Text
            color="black"
            fontWeight={el === val ? 'extrabold' : 'normal'}
            fontSize="20px"
            key={el}
          >
            {el}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
