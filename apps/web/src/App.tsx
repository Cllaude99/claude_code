import { Cllaude99UIProvider } from '@cllaude99/ui';
import { QueryClientProvider, QueryDevTools } from '@cllaude99/apis';
import RouteProvider from './routes/RouteProvider';

const App = () => {
  return (
    <QueryClientProvider>
      <QueryDevTools />
      <Cllaude99UIProvider>
        <RouteProvider />
      </Cllaude99UIProvider>
    </QueryClientProvider>
  );
};

export default App;
