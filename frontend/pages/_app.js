import { Component } from 'react';
import SpendingContext from '../componets/context';
import Login from '../componets/Login';
import '../styles/globals.css';

export default class MyApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };
  }

  static async getInitialProps({ ctx }) {
    const initialState = {};
    const res = await fetch(`${process.env.BACKEND_URL}/private`, {
      headers: { cookie: ctx?.req?.headers?.cookie }
    });

    if (res.status === 200) {
      initialState.user = true;
    }

    return initialState;
  }

  render() {
    const { Component, pageProps } = this.props;
    const { user } = this.state;

    return (
      <SpendingContext.Provider value={{ user }}>
        {user ? <Component {...pageProps} /> : <Login />}
      </SpendingContext.Provider>
    );
  }
}
