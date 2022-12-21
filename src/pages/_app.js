import './index.scss';
import Script from 'next/script'
import App from 'next/app';

function MyApp({Component, pageProps}) {
  return (
    <>
      <Script strategy={"afterInteractive"} src={"https://www.googletagmanager.com/gtag/js?id=G-EDVGXF7XWR"} />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
        
            gtag("config", "G-EDVGXF7XWR")
          `
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
}
export default MyApp
