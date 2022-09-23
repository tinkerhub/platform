import '@fontsource/archivo/700.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';

export const userInputCodeFormStyle = {
  button: {
    backgroundColor: 'rgba(65, 83, 240, 1)',
    border: '0px',
    width: '100%',
    margin: '0 auto',
  },
  superTokensBranding: {
    display: 'none',
  },
  headerTitle: {
    fontFamily: `'Archivo', sans-serif`,
  },
  container: {
    height: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    ':focus-within ': {
      border: '2.5px solid rgba(66, 153, 225, 0.6)',
      boxShadow: 'none',
    },
  },
};

export const emailOrPhoneFormStyle = {
  label: {
    display: 'none',
  },
  button: {
    backgroundColor: 'rgba(65, 83, 240, 1)',
    border: '0px',
    width: '100%',
    margin: '0 auto',
    height: '33px',
  },
  superTokensBranding: {
    display: 'none',
  },
  headerTitle: {
    fontFamily: 'sans-serif',
  },
  container: {
    height: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    height: '40px',
    ':focus-within ': {
      border: '2.5px solid rgba(66, 153, 225, 0.6)',
      boxShadow: 'none',
    },
  },
};
