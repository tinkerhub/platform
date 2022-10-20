import Lottie from 'react-lottie';
import Anim from '../../public/final.json';

export const LottieAnim = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Anim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};
