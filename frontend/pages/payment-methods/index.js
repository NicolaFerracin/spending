import { useState, useEffect } from 'react';
import Link from 'next/link';
import Table from '../../componets/Table';
import Svg from '../../componets/Svg';
import AddButton from '../../componets/AddButton';
import api from '../../api';

const COLS = [
  { id: 'name', header: 'Name', order: 1 },
  { id: 'actions', header: 'Actions', order: 2 }
];

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('api/payment-methods', {
        haders: { cookie: window.localStorage.getItem('jwt') }
      });
      setPaymentMethods(res.data.paymentMethods);
    };

    fetchData();
  }, []);

  const deletePaymentMethod = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      await api.delete(`api/payment-methods/${id}`, {
        headers: { cookie: window.localStorage.getItem('jwt') }
      });
      location.reload();
    }
  };

  return (
    <>
      <h1>Payment Methods</h1>
      <Table
        cols={COLS}
        data={paymentMethods.map(p => ({
          id: p._id,
          name: p.name,
          actions: (
            <>
              <Link href="/payment-methods/[id]" as={`/payment-methods/${p._id}`}>
                <a>
                  <Svg.Edit />
                </a>
              </Link>
              <Svg.Delete onClick={() => deletePaymentMethod(p._id)} />
            </>
          )
        }))}
      />
      <Link href="/payment-methods/new">
        <a>
          <AddButton />
        </a>
      </Link>
    </>
  );
}
