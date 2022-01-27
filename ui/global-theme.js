import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { useStore } from 'stores/hooks'

const GlobalStyle = createGlobalStyle`
  :root {
    --color-text-main: rgb(38,38,38);
    --color-text-secondary: rgb(142,142,142);
    --color-text-highlight: rgb(0, 149, 246);
    --color-border-main: rgb(219,219,219);
    --color-border-secondary: #ddd;
    --color-bg-main: #fafafa;
    --color-bg-content: #fff;
    --color-bg-tag: #f2f2f2;
    --color-bg-tag-hover: #f0f0f0;
  }

  :root[theme-mode=dark] {
    --color-text-main: #d3d3d3;
    --color-text-secondary: #999;
    --color-text-highlight: rgb(0, 149, 246);
    --color-border-main: rgb(219,219,219);
    --color-border-secondary: #16161a;
    --color-bg-main: #0c0c0c;
    --color-bg-content: #16161a;
    --color-bg-tag: #0c0c0c;
    --color-bg-tag-hover: #000;
  }

  html body {
    color: var(--color-text-main);
  }
`

export default function GlobalTheme(props) {
  return <GlobalStyle whiteColor />
}
