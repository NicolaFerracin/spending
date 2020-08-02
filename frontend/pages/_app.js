import { Component } from 'react';
import { AuthProvider } from '../authContext';
import '../styles/globals.css';

export default class MyApp extends Component {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}
