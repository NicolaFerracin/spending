import { Component } from 'react';
import SpendingContext from '../componets/context';
import Login from '../componets/Login';
import ApiHandler from '../apiHandler';
import '../styles/globals.css';

export default class MyApp extends Component {
  static async getInitialProps({ ctx }) {
    const cookie = ctx?.req?.headers?.cookie;
    const apiHandler = new ApiHandler(cookie);
    apiHandler.get('something');
    const initialState = { apiHandler };

    const profileRes = await apiHandler.get('profile');
    if (profileRes.status === 200) {
      const { _id, email, name } = (await profileRes.json()).user;
      initialState.user = { _id, email, name };
      initialState.cookie = cookie;

      const paths = ['api/entries', 'api/categories', 'api/payment-methods'];
      return await Promise.all(
        paths.map(path => apiHandler.get(path).then(res => res.json()))
      ).then(([{ entries }, { categories }, { paymentMethods }]) => ({
        ...initialState,
        entries,
        categories,
        paymentMethods
      }));
    }
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
