import React from 'react'
import { Layout } from '../components/layout'
import Card from '../ui/card'
import MdContent from '../components/md-content'
import styled from 'styled-components'
import colors from '../ui/colors'

const Article = styled(Card)`
  padding: 16px;
  .head {
    margin-bottom: 30px;
  }
  .create-time {
    font-size: 14px;
    color: ${colors.secondary};
  }
  .body {
    line-height: 2;
    p {
      margin-bottom: 20px;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    menu,
    nav,
    section,
    summary {
      display: block;
    }
    audio,
    canvas,
    progress,
    video {
      display: inline-block; /* 1 */
      vertical-align: baseline; /* 2 */
    }
    audio:not([controls]) {
      display: none;
      height: 0;
    }
    [hidden],
    template {
      display: none;
    }
    a {
      background-color: transparent;
    }
    a:active,
    a:hover {
      outline: 0;
    }
    abbr[title] {
      border-bottom: 1px dotted;
    }
    b,
    strong {
      font-weight: bold;
    }
    dfn {
      font-style: italic;
    }
    h1 {
      font-size: 2em;
      margin: 0.67em 0;
    }
    mark {
      background: #ff0;
      color: #000;
    }
    small {
      font-size: 80%;
    }
    sub,
    sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }
    sup {
      top: -0.5em;
    }
    sub {
      bottom: -0.25em;
    }
    img {
      border: 0;
    }
    svg:not(:root) {
      overflow: hidden;
    }
    figure {
      margin: 1em 40px;
    }
    hr {
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      height: 0;
    }
    pre {
      margin: 20px 0;
      overflow: auto;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
      color: inherit; /* 1 */
      font: inherit; /* 2 */
      margin: 0; /* 3 */
    }
    button {
      overflow: visible;
    }
    button,
    select {
      text-transform: none;
    }
    button,
    html input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      -webkit-appearance: button; /* 2 */
      cursor: pointer; /* 3 */
    }
    button[disabled],
    html input[disabled] {
      cursor: default;
    }
    button::-moz-focus-inner,
    input::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
    input {
      line-height: normal;
    }
    input[type="checkbox"],
    input[type="radio"] {
      box-sizing: border-box; /* 1 */
      padding: 0; /* 2 */
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      height: auto;
    }
    input[type="search"] {
      -webkit-appearance: textfield; /* 1 */
      -moz-box-sizing: content-box;
      -webkit-box-sizing: content-box; /* 2 */
      box-sizing: content-box;
    }
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    fieldset {
      border: 1px solid #c0c0c0;
      margin: 0 2px;
      padding: 0.35em 0.625em 0.75em;
    }
    legend {
      border: 0; /* 1 */
      padding: 0; /* 2 */
    }
    textarea {
      overflow: auto;
    }
    optgroup {
      font-weight: bold;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    td,
    th {
      padding: 0;
    }
    ::selection {
      background: #262a30;
      color: #fff;
    }
    body {
      position: relative;
      font-family: 'PingFang SC', "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 14px;
      line-height: 2;
      color: #555;
      background: #f5f7f9;
    }
    @media (max-width: 767px) {
      body {
        padding-right: 0 !important;
      }
    }
    @media (min-width: 768px) and (max-width: 991px) {
      body {
        padding-right: 0 !important;
      }
    }
    @media (min-width: 1600px) {
      body {
        font-size: 16px;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
      font-weight: bold;
      line-height: 1.5;
      font-family: 'PingFang SC', "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 20px 0 15px;
    }
    h1 {
      font-size: 22px;
    }
    @media (max-width: 767px) {
      h1 {
        font-size: 18px;
      }
    }
    h2 {
      font-size: 20px;
    }
    @media (max-width: 767px) {
      h2 {
        font-size: 16px;
      }
    }
    h3 {
      font-size: 18px;
    }
    @media (max-width: 767px) {
      h3 {
        font-size: 14px;
      }
    }
    h4 {
      font-size: 16px;
    }
    @media (max-width: 767px) {
      h4 {
        font-size: 12px;
      }
    }
    h5 {
      font-size: 14px;
    }
    @media (max-width: 767px) {
      h5 {
        font-size: 10px;
      }
    }
    h6 {
      font-size: 12px;
    }
    @media (max-width: 767px) {
      h6 {
        font-size: 8px;
      }
    }
    p {
      margin: 0 0 20px 0;
    }
    a {
      color: #555;
      text-decoration: none;
      outline: none;
      border-bottom: 1px solid #999;
      word-wrap: break-word;
    }
    a:hover {
      color: #495a80;
      border-bottom-color: #495a80;
    }
    blockquote {
      margin: 0;
      padding: 0;
    }
    img {
      display: block;
      margin: auto;
      max-width: 100%;
      height: auto;
    }
    hr {
      margin: 40px 0;
      height: 3px;
      border: none;
      background-color: #ddd;
      background-image: repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 4px, transparent 8px);
    }
    blockquote {
      padding: 0 15px;
      color: #666;
      border-left: 4px solid #ddd;
    }
    blockquote cite::before {
      content: "-";
      padding: 0 5px;
    }
    dt {
      font-weight: 700;
    }
    dd {
      margin: 0;
      padding: 0;
    }
    kbd {
      border: 1px solid #ccc;
      border-radius: 0.2em;
      box-shadow: 0.1em 0.1em 0.2em rgba(0,0,0,0.1);
      background-color: #f9f9f9;
      font-family: inherit;
      background-image: -webkit-linear-gradient(top, #eee, #fff, #eee);
      padding: 0.1em 0.3em;
      white-space: nowrap;
    }
    .text-left {
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    .text-justify {
      text-align: justify;
    }
    .text-nowrap {
      white-space: nowrap;
    }
    .text-lowercase {
      text-transform: lowercase;
    }
    .text-uppercase {
      text-transform: uppercase;
    }
    .text-capitalize {
      text-transform: capitalize;
    }
    .center-block {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .clearfix:before,
    .clearfix:after {
      content: " ";
      display: table;
    }
    .clearfix:after {
      clear: both;
    }
    .pullquote {
      width: 45%;
    }
    .pullquote.left {
      float: left;
      margin-left: 5px;
      margin-right: 10px;
    }
    .pullquote.right {
      float: right;
      margin-left: 10px;
      margin-right: 5px;
    }
    .affix.affix.affix {
      position: fixed;
    }
    .translation {
      margin-top: -20px;
      font-size: 14px;
      color: #999;
    }
    .scrollbar-measure {
      width: 100px;
      height: 100px;
      overflow: scroll;
      position: absolute;
      top: -9999px;
    }
    .use-motion .motion-element {
      opacity: 0;
    }
    table {
      margin: 20px 0;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #ddd;
      font-size: 14px;
      table-layout: fixed;
      word-wrap: break-all;
    }
    table>tbody>tr:nth-of-type(odd) {
      background-color: #f9f9f9;
    }
    table>tbody>tr:hover {
      background-color: #f5f5f5;
    }
    caption,
    th,
    td {
      padding: 8px;
      text-align: left;
      vertical-align: middle;
      font-weight: normal;
    }
    th,
    td {
      border-bottom: 3px solid #ddd;
      border-right: 1px solid #eee;
    }
    th {
      padding-bottom: 10px;
      font-weight: 700;
    }
    td {
      border-bottom-width: 1px;
    }
    code {
      word-wrap: break-word;
    }
  }
`

const Post = ({ detail }) => {
  return <Layout>
    <Article>
      <div className='head'>
        <div className='title'>
          <h3>{detail.title}</h3>
        </div>
        <div className='meta'>
          <span className='create-time'>
            发表于{detail.created}
          </span>
        </div>
      </div>
      <div className='body'>
        <MdContent content={detail.body} />
      </div>
    </Article>
  </Layout>
}

Post.getInitialProps = async ({ query, mobxStore }) => {
  const { id } = query
  const { columnStore } = mobxStore
  if (!columnStore.list.length) {
    await Promise.all([
      mobxStore.columnStore.fetch(),
      mobxStore.tagStore.fetch()
    ])
  }
  const detail = await mobxStore.postStore.fetchNode(id)
  return { detail, query }
}

export default Post
