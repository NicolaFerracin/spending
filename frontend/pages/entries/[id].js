import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EntryForm from '../../componets/EntryForm';
import api from '../../api';

export default function Editentry() {
  const { query } = useRouter();
  const [entry, setEntry] = useState({});
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = { headers: { cookie: window.localStorage.getItem('jwt') } };
      const p1 = api.get(`api/entries/${query.id}`, options);
      const p2 = api.get('api/categories', options);
      const p3 = api.get('api/payment-methods', options);

      const [e, c, p] = await Promise.all([p1, p2, p3]).then(([data1, data2, data3]) => {
        return [data1.data.entry, data2.data.categories, data3.data.paymentMethods];
      });
      setEntry(e);
      setCategories(c);
      setPaymentMethods(p);
    };

    fetchData();
  }, []);

  const handleSubmit = async updatedEntry => {
    const res = await api.put(`api/entries/${query.id}`, updatedEntry);
    return { status: res.status };
  };

  return (
    <>
      <h1>Edit Entry</h1>
      {entry._id && (
        <EntryForm
          handleSubmit={handleSubmit}
          {...entry}
          categories={categories}
          paymentMethods={paymentMethods}
        />
      )}
    </>
  );
}
