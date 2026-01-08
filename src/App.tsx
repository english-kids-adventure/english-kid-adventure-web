import { AppRoutes } from '@routes/AppRoutes';
import { AppProviders } from '@store/AppProviders';

const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;

