import { ReactNode } from 'react';
import { ThemeProvider } from '../ThemeProvider';

interface Cllaude99UIProviderProps {
  children: ReactNode;
}

export const Cllaude99UIProvider = ({ children }: Cllaude99UIProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
