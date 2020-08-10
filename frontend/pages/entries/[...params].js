import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EntriesList from '../../componets/EntriesList';
import AddButton from '../../componets/AddButton';
import { MONTHS } from '../../utils';
import api from '../../api';

export default function Editentry() {
  const {
    query: {
      params: [year, month]
    }
  } = useRouter();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`api/entries/${year}/${month}`, {
        headers: { cookie: window.localStorage.getItem('jwt') }
      });
      setEntries(res.data.entries);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>
        Entries for {MONTHS[Number(month) - 1]} {year}
      </h1>
      <EntriesList entries={entries} />
      <Link href="/entries/new">
        <a>
          <AddButton to="/payment-methods/new" />
        </a>
      </Link>
    </>
  );
}
