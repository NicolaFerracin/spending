import styles from './styles.module.scss';

const Button = ({ type, isDisabled, onClick, children }) => (
  <button className={styles.button} onClick={onClick} type={type} disabled={isDisabled}>
    {children}
  </button>
);

export default Button;
