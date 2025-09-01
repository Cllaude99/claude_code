import { Cllaude99UIProvider } from '@cllaude99/ui';
import { RouteProvider } from './routes/RouteProvider';
import { QueryClientProvider, QueryDevTools } from '@cllaude99/apis';

function App() {
  return (
    <QueryClientProvider>
      <QueryDevTools />
      <Cllaude99UIProvider>
        <RouteProvider />
      </Cllaude99UIProvider>
    </QueryClientProvider>
  );
}

export default App;
