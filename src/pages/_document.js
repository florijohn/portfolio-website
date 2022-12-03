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
          
          <meta property="og:title" content="Floris John | Personal Website" />
          <meta property="og:description" content="Floris John" />
          <meta property="og:image" content="https://florisjohn.de/images/foris_bild.jpg" />
          <meta property="og:url" content="https://florisjohn.de" />
          <meta property="og:site_name" content="Floris John | Personal Website" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_GB" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}