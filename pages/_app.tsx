import { Refine } from '@pankod/refine';
import '@pankod/refine/dist/styles.min.css';
import type { AppProps } from 'next/app';
import React from 'react';
import refineProps from 'src/refineConfig';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine {...refineProps}>
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
