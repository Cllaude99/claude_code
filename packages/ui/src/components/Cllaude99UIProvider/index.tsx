import ThemeProvider from '../ThemeProvider';

interface Cllaude99UIProviderProps {
  children: React.ReactNode;
}

const Cllaude99UIProvider = ({ children }: Cllaude99UIProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Cllaude99UIProvider;
