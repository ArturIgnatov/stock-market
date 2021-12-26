import React from 'react';
import { SnackProvider } from '@components/snack-provider/SnackProvider';
import { AppContainer } from './main/AppContainer';

// PURE, ONLY PROVIDERS COMPONENT

const App = () => {
  return (
    <SnackProvider>
      <AppContainer />
    </SnackProvider>
  );
};

export default App;
