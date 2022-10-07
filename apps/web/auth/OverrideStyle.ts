import '@fontsource/archivo/700.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';

export const userInputCodeFormStyle = {
  button: {
    ':hover': {
      backgroundColor: '#1328EC',
    },
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
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    ':focus-within ': {
      border: '2.5px solid rgba(66, 153, 225, 0.6)',
      boxShadow: 'none',
      backgroundColor: 'white',
      color: 'black',
    },
  },
};

export const emailOrPhoneFormStyle = {
  button: {
    backgroundColor: 'rgba(65, 83, 240, 1)',
    border: '0px',
    width: '100%',
    margin: '0 auto',
    height: '40px',
  },
  superTokensBranding: {
    display: 'none',
  },
  headerTitle: {
    fontFamily: 'sans-serif',
  },
  formRow: {
    paddingBottom: '17px',
  },
  container: {
    height: '550px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    height: '40px',
    ':focus-within ': {
      border: '2.5px solid rgba(66, 153, 225, 0.6)',
      boxShadow: 'none',
      backgroundColor: 'white',
      color: 'black',
    },
  },
  label: {
    fontFamily: `'Archivo', sans-serif`,
  },
};
