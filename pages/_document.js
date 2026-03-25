import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../lib/theme'

export default class Document extends NextDocument {
  render() {
    const colorModeInitScript = `
      (function() {
        try {
          var now = new Date();
          var hour = now.getHours();
          var mode = (hour >= 7 && hour < 19) ? 'light' : 'dark';
          localStorage.setItem('chakra-ui-color-mode', mode);
          document.cookie = 'chakra-ui-color-mode=' + mode + '; path=/; max-age=31536000';
        } catch (e) {}
      })();
    `

    return (
      <Html lang="en">
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: colorModeInitScript }} />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
