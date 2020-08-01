import { Component } from 'react';
import SpendingContext from '../componets/context';
import Login from '../componets/Login';
import '../styles/globals.css';

export default class MyApp extends Component {
  static async getInitialProps({ ctx }) {
    // TODO 1 refactor for parallel requests
    // TODO 2 fix issue with losing credentials when changing route
    const initialState = {};
    const cookie = ctx?.req?.headers?.cookie;
    const fetchOpts = {
      headers: { cookie }
    };
    const profileRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, fetchOpts);

    if (profileRes.status === 200) {
      const { _id, email, name } = (await profileRes.json()).user;
      initialState.user = { _id, email, name };
      initialState.cookie = cookie;

      const entriesRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/entries`,
        fetchOpts
      );
      const entries = (await entriesRes.json()).entries;
      initialState.entries = entries;

      const categoriesRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        fetchOpts
      );
      const categories = (await categoriesRes.json()).categories;
      initialState.categories = categories;

      const paymentMethodsRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods`,
        fetchOpts
      );
      const paymentMethods = (await paymentMethodsRes.json()).paymentMethods;
      initialState.paymentMethods = paymentMethods;
    }

    return initialState;
  }

  render() {
    const { Component, pageProps, user, cookie, entries, categories, paymentMethods } = this.props;

    return (
      <SpendingContext.Provider value={{ user, cookie, entries, categories, paymentMethods }}>
        {user ? <Component {...pageProps} /> : <Login />}
      </SpendingContext.Provider>
    );
  }
}
