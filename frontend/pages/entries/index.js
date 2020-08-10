import { useState, useEffect } from 'react';
import Link from 'next/link';
import EntriesList from '../../componets/EntriesList';
import AddButton from '../../componets/AddButton';
import api from '../../api';

export default function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('api/entries', {
        haders: { cookie: window.localStorage.getItem('jwt') }
      });
      setEntries(res.data.entries);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Entries</h1>
      <EntriesList entries={entries} />
      <Link href="/entries/new">
        <a>
          <AddButton to="/payment-methods/new" />
        </a>
      </Link>
    </>
  );
}
