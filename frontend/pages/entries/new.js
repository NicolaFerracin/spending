import { useState, useEffect } from 'react';
import EntryForm from '../../componets/EntryForm';
import api from '../../api';

export default function NewEntry() {
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = { headers: { cookie: window.localStorage.getItem('jwt') } };
      const p1 = api.get('api/categories', options);
      const p2 = api.get('api/payment-methods', options);

      const [c, p] = await Promise.all([p1, p2]).then(([data1, data2]) => {
        return [data1.data.categories, data2.data.paymentMethods];
      });
      setCategories(c);
      setPaymentMethods(p);
    };

    fetchData();
  }, []);

  const handleSubmit = async newEntry => {
    const res = await api.post('api/entries', newEntry, {
      headers: { cookie: window.localStorage.getItem('jwt') }
    });
    return { status: res.status };
  };

  return (
    <>
      <h1>New Entry</h1>
      <EntryForm
        handleSubmit={handleSubmit}
        categories={categories}
        paymentMethods={paymentMethods}
      />
    </>
  );
}
