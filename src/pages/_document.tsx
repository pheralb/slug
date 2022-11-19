import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-midnight text-white text-custom font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
