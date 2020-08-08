import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import useAuth from '../../authContext';
import api from '../../api';
import { MONTHS } from '../../utils';

const Menu = () => {
  const router = useRouter();
  const { asPath } = router;
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('api/menu');
      setMenu(res.data.menu);
    };

    fetchData();
  }, []);

  const toggleDropdown = year => {
    if (dropdowns.includes(year)) {
      setDropdowns(dropdowns.filter(d => d !== year));
    } else {
      setDropdowns([...dropdowns, year]);
    }
  };

  return (
    <div className={styles.sidebar}>
      <h2>{user.name}'s Spending</h2>
      <nav className={styles.nav}>
        <ul>
          <li className={`${styles.li} ${asPath === '/' ? styles.active : ''}`}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={`${styles.li} ${asPath === '/entries' ? styles.active : ''}`}>
            <Link href="/entries">
              <a>Entries</a>
            </Link>
          </li>
          <li className={`${styles.li} ${asPath === '/categories' ? styles.active : ''}`}>
            <Link href="/categories">
              <a>Categories</a>
            </Link>
          </li>
          <li className={`${styles.li} ${asPath === '/payment-methods' ? styles.active : ''}`}>
            <Link href="/payment-methods">
              <a>Payment Methods</a>
            </Link>
          </li>
          {menu.map(({ _id: year, months }) => (
            <li
              key={year}
              className={`${styles.li} ${
                asPath.startsWith(`/entries/${year}`) ? styles.active : ''
              }`}
              onClick={() => toggleDropdown(Number(year))}
            >
              <Link href="#">
                <a>{year}</a>
              </Link>
              <ul>
                {!dropdowns.includes(Number(year)) &&
                  months
                    .sort((a, b) => b.month - a.month)
                    .map(({ month }) => (
                      <li
                        key={month}
                        className={`${styles.li} ${
                          asPath === `/entries/${year}/${month}` ? styles.active : ''
                        }`}
                      >
                        <Link href="/entries/[...params]" as={`/entries/${year}/${month}`}>
                          <a>{MONTHS[Number(month) - 1].substr(0, 3)}</a>
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
