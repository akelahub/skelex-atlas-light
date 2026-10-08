import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * The static render does not apply the phone-column classes after hydration.
 * This rule keeps a 420px column on a wide browser, including before JavaScript runs.
 */
const phoneColumn = `
@media (min-width: 521px) {
  [data-atlas-root="1"] {
    background-color: #09090b !important;
    align-items: center !important;
  }
  [data-atlas-column="1"] {
    width: 420px !important;
    max-width: 420px !important;
    border-left: 1px solid #222226;
    border-right: 1px solid #222226;
    box-sizing: border-box;
  }
}
`;

export default function Root({ children }: PropsWithChildren) {
  const { htmlAttributes, bodyAttributes, headNodes, bodyNodes } = useServerDocumentContext();
  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <ScrollViewStyleReset />
        <style id="atlas-phone" dangerouslySetInnerHTML={{ __html: phoneColumn }} />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
