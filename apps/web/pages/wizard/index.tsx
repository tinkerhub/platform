import { Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CardBio, Bar, One, Two, Three } from '../../components/wizard';
import { Topbar } from '../../components/Navbar';

const Index = () => {
  const [step, setStep] = useState<number>(1);

  const stepAdd = () => {
    setStep((ste) => ste + 1);
  };

  const stepSub = () => {
    setStep((ste) => ste - 1);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Design = () => {
    if (step === 1) {
      return <One next={stepAdd} />;
    }
    if (step === 2) {
      return <Two next={stepAdd} />;
    }
    return <Three next={stepAdd} />;
  };
  return (
    <>
      <Topbar showBtn={false} />
      <Center bg="white" minH="93vh">
        <CardBio>
          <Bar val={step} back={stepSub} />
          <Design />
        </CardBio>
      </Center>
    </>
  );
};

export default Index;
