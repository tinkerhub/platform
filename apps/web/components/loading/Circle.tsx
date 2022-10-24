import { CircularProgress } from '@chakra-ui/react';

type Prop = {
  size?: string;
};
const defaultProps = {
  size: '120px',
};

export const Circle = ({ size = '120px' }: Prop & typeof defaultProps) => (
  <CircularProgress size={size} isIndeterminate />
);

Circle.defaultProps = defaultProps;
