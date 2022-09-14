import { Box, Flex, Heading, Text } from '@chakra-ui/react';
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
    <Box px="13px">
      {val === 3 && (
        <Flex justifyContent="flex-end" mb="12px">
          <Text
            display="inline"
            bg="rgba(240, 240, 240, 1)"
            borderRadius="3xl"
            px="2.5"
            py="1.6"
            color="black"
          >
            Optional
          </Text>
        </Flex>
      )}
      <Box display="flex" justifyContent="space-between">
        {val > 1 && (
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowBackIcon
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
          <Heading as="h2" size="lg" fontWeight="bold">
            About You
          </Heading>
        </motion.div>

        <Box display="flex" justifyContent="space-between" alignSelf="center" w="50px">
          {step.map((el) => (
            <Text
              fontWeight={el === val ? 'extrabold' : 'normal'}
              fontSize={el === val ? '22px' : '20px'}
              key={el}
            >
              {el}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
