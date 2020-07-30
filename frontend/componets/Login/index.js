import React, { Component } from 'react';
import styles from './styles.module.scss';

class Login extends Component {
  render() {
    return (
      <div className={styles.loginBtnWrapper}>
        <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`}>
          <img alt="Login" src="/login_button.png" />
        </a>
      </div>
    );
  }
}

export default Login;
