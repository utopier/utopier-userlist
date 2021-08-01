import React from 'react';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import {useTheme} from '@emotion/react';

// emotion theme typescript 
declare module '@emotion/react' {
  export interface Theme {
    color: {
      green: string
      lightGreen: string
      white: string
      black: string
    }
  }
}

// App Public Styles +  reset.css is pulled from kossnocorp/reset.css(style init)
const GlobalStyles = () => {
    const theme = useTheme();
    return (
        <Global styles={css`
        ${emotionReset}
        html, body {
          height: 100vh;
        }
        body {
          background-color: ${theme.color.black};
        }
        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }
      `} />
    );
};

export default GlobalStyles;