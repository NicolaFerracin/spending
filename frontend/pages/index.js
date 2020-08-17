import { useState, useEffect } from 'react';
import api from '../api';
import StatsByYear from '../componets/StatsByYear';
import styles from './styles.module.scss';

export default function Home() {
  const [stats, setStats] = useState({});
  const [toggles, setToggle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('api/stats', {
        haders: { cookie: window.localStorage.getItem('jwt') }
      });
      setStats(res.data);
    };

    fetchData();
  }, []);

  const toggle = year => {
    if (toggles.includes(year)) {
      setToggle(toggles.filter(d => d !== year));
    } else {
      setToggle([...toggles, year]);
    }
  };

  if (!stats.total) {
    return null;
  }

  const today = new Date();
  const years = Object.keys(stats.byYear).sort((a, b) => b - a);

  return (
    <div>
      <h1>Stats</h1>
      {
        <>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>Overall</span>
              <span>{stats.total}€</span>
            </div>
            <div className={styles.stat}>
              <span>This year</span>
              <span>{stats.byYear[today.getFullYear()]}€</span>
            </div>
            <div className={styles.stat}>
              <span>This month</span>
              <span>{stats.byMonth[today.getFullYear()][today.getMonth() + 1]}€</span>
            </div>
            <div className={styles.stat}>
              <span>Average per month</span>
              <span>{stats.byYear[today.getFullYear()] / (today.getMonth() + 1)}€</span>
            </div>
          </div>
          <hr />
          {years.map(year => (
            <StatsByYear
              key={year}
              toggle={toggle}
              year={year}
              data={stats.byMonth[year]}
              total={stats.byYear[year]}
              shouldDisplay={toggles.includes(year)}
            />
          ))}
        </>
      }
    </div>
  );
}
