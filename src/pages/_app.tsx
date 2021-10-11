import "../styles/tailwind.css";
import { AuthProvider } from "../providers/Auth";
import App, { AppInitialProps } from 'next/app';
import { CookieMessage } from '../@types';
import cookie from 'cookie';

type AppProps = {
  authenticated: boolean;
};

function MyApp({ Component, pageProps, authenticated }) {
  return (
    <AuthProvider authenticated={authenticated}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}


MyApp.getInitialProps = async (
  appContext
): Promise<AppInitialProps & AppProps> => {
  let authenticated = false;
  const request = appContext.ctx.req as CookieMessage;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    authenticated = !!request.cookies.session;
  }

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated };
};


export default MyApp;
