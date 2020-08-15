import { useState, useEffect } from 'react';
import api from '../api';
import styles from './index.module.scss';

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

  console.log(stats);

  const today = new Date();
  return (
    <div>
      <h1>Stats</h1>
      {!!stats.total && (
        <>
          <h2>Overall: {stats.total}€</h2>
          <h2>This year: {stats.byYear[today.getFullYear()]}€</h2>
          <h2>This month: {stats.byMonth[today.getFullYear()][today.getMonth() + 1]}€</h2>
          <h2>Average per month: {stats.byYear[today.getFullYear()] / today.getMonth() + 1}€</h2>
          <hr />
          {Object.keys(stats.byYear)
            .sort((a, b) => b - a)
            .map(year => (
              <>
                <h3 className={styles.toggle} onClick={() => toggle(year)}>
                  <span>+</span> {year}
                </h3>
                {toggles.includes(year) && <div>Chart</div>}
                <hr />
              </>
            ))}
        </>
      )}
    </div>
  );
}
