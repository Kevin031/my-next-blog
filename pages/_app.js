import 'core-js/features/set-immediate'

import App from 'next/app'
import { Layout } from 'components/layout'
import React from 'react'
import { Provider } from 'mobx-react'
import { createStore } from 'stores'
import { setRequestTime } from 'layer'
import GlobalTheme from 'ui/global-theme'

class MyApp extends App {
  static async getInitialProps(appContext) {
    setRequestTime(Date.now())
    const ctx = appContext.ctx
    ctx.mobxStore = createStore()
    const appProps = await App.getInitialProps(appContext)
    return {
      ...appProps,
      initializeMobxState: ctx.mobxStore,
    }
  }

  constructor(props) {
    super(props)

    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initializeMobxState : createStore(props.initializeMobxState)

    // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //   setThemeName("dark")
    // } else {
    //   setThemeName("light")
    // }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider {...this.mobxStore}>
        <GlobalTheme />
        <Component {...pageProps} />
      </Provider>
    )
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
