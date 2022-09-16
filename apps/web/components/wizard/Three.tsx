/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { WizardContext } from '../../context/wizardContext';
import { Form } from '../../pages/profile';
import { Prop } from './One';

export const Three = ({ next }: Prop) => {
  const { register, handleSubmit } = useForm<Form>();
  const wizardCtx = useContext(WizardContext);

  const handleData = async (data: Form) => {
    wizardCtx.addData(data);
    // sending the all user info to database
    await wizardCtx.sendData();
    next();
  };
  return (
    <form onSubmit={handleSubmit(handleData)}>
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <Box mt="30px">
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">House Name</Text>
            <Input bg="rgba(240, 240, 240, 1)" {...register('house')} type="string" />
          </Box>
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">Street Name</Text>
            <Input bg="rgba(240, 240, 240, 1)" />
          </Box>
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">District</Text>
            <Input bg="rgba(240, 240, 240, 1)" {...register('district')} />
          </Box>
          <Box display="flex" flexDirection="column" h="75px" justifyContent="space-between">
            <Text color="black">Pincode</Text>
            <Input bg="rgba(240, 240, 240, 1)" {...register('pin')} />
          </Box>
          <Box mt="25px">
            <Button colorScheme="blue" width="100%" type="submit">
              Next
            </Button>
          </Box>
        </Box>
      </motion.div>
    </form>
  );
};
