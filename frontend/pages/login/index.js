import styles from './styles.module.scss';

export default function Login() {
  return (
    <div className={styles.loginBtnWrapper}>
      <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`}>
        <img alt="Login" src="/login_button.png" />
      </a>
    </div>
  );
}
