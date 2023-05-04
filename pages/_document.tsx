import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
          async
        />
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </body>
    </Html>
  );
}
