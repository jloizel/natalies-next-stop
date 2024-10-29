// pages/_document.tsx

import { GA } from '@/components/GA/GA';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Title and Meta tags */}
          <title>Natalie&apos;s Next Stop</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1"/>
          <meta name="description" content="Welcome to my travel blog"/>
          <meta name="author" content="Jack Loizel"/>
          <meta charSet="UTF-8"/>
          
          {/* Favicon Links */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>

          <GA/>

        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
