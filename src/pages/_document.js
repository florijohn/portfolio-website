import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang='en-GB'>
        <Head>
          <meta charSet='utf-8' />
          <title>Floris John | Personal Website</title>
          <meta name="robots" content="index, follow" />
          <meta name='description' content='Floris John' />
          <meta name='author' content='Floris John' />
          <meta name='keywords' content='Floris John' />
          <link href="/fonts/fonts.css" rel="stylesheet"/>
          <link rel="preload" as="font" />
          <meta name="theme-color" content="#000"/>
          
          <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WWD88KL');</script>
        </Head>
        <body>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWD88KL"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}