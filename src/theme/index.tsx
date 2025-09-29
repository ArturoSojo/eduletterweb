import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { useAppStore } from '@/store/app.store';

export function ThemeProvider({ children }: PropsWithChildren) {
  const themeMode = useAppStore((state) => state.theme);

  const theme = useMemo(() => {
    if (themeMode === 'sepia') {
      return createTheme({
        palette: {
          mode: 'light',
          background: {
            default: '#F5ECD9'
          },
          text: {
            primary: '#5B4636'
          }
        }
      });
    }

    return createTheme({
      palette: { mode: themeMode }
    });
  }, [themeMode]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
