import Lottie from 'react-lottie';
import Anim from '../../../../public/final.json';

type LottieProp = {
  setResult: React.Dispatch<boolean>;
};

export const LottieAnim = ({ setResult }: LottieProp) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Anim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={400}
      width={400}
      eventListeners={[
        {
          eventName: 'complete',
          callback: () => setResult(true),
        },
      ]}
    />
  );
};
