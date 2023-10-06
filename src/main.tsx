import theme from '@style/themes/default';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import App from './App';
import Providers from './Providers';
import i18n from './i18n';

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error?.message}</pre>
      <pre style={{ color: 'red' }}>{error?.stack}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </Providers>
);
