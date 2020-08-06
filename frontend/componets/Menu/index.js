import { useState, useEffect } from 'react';
import Link from 'next/Link';
import styles from './styles.module.scss';
import useAuth from '../../authContext';
import api from '../../api';

const Menu = () => {
  const { pathname } = { pathname: 'hey' };
  const { user, logout } = useAuth();
  const [menu, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('api/menu');
      setData(res.data.menu);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.sidebar}>
      <h2>{user.name}'s Spending</h2>
      <nav className={styles.nav}>
        <ul>
          <li className={`${styles.li} ${pathname === '/all' ? styles.active : ''}`}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {menu.map(({ _id: year, months }) => (
            <li
              key={year}
              className={`${styles.li} ${pathname === `/${year}` ? styles.active : ''}`}
            >
              <Link href={`/${year}`}>
                <a>{year}</a>
              </Link>
              <ul>
                {months.map(({ month }) => (
                  <li
                    key={month}
                    className={`${styles.li} ${pathname === `/${month}` ? styles.active : ''}`}
                  >
                    <Link href={`/${month}`}>
                      <a>{month}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
