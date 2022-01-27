import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { observer } from 'mobx-react'

@observer
class MyDocument extends Document {
  static async getInitialProps({ renderPage, mobxStore }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, theme: mobxStore.appStore.theme, styleTags }

    // const initialProps = await Document.getInitialProps(ctx)
    // return { ...initialProps }
  }

  render() {
    return (
      <Html theme-mode={this.props.theme}>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
