import '../app/globals.css'; 
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <NavBar /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
