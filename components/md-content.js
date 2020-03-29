import React from 'react'
import Markdown from 'markdown-to-jsx'
import Highlight from 'react-highlight'

export default function MdContent ({ content }) {
  return <Markdown
    options={{
      overrides: {
        pre: {
          component: Highlight,
          props: {
            language: 'javascript'
          }
        }
      }
    }}
  >
    {content}
  </Markdown>
}
