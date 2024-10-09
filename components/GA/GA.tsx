import Script from "next/script";

export const GA = () => {

  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VD897NGQX9"/>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VD897NGQX9');
                `}
      </Script>
    </>
 );
}

