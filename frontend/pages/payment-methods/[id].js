import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import api from '../../api';

export default function EditPaymentMethod() {
  const { query } = useRouter();
  const [paymentMethod, setPaymentMethod] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`api/payment-methods/${query.id}`, {
        haders: { cookie: window.localStorage.getItem('jwt') }
      });
      setPaymentMethod(res.data.paymentMethod);
    };

    fetchData();
  }, []);

  const handleSubmit = async newName => {
    const res = await api.put(
      `api/payment-methods/${query.id}`,
      { name: newName },
      { headers: { cookie: window.localStorage.getItem('jwt') } }
    );
    return { status: res.status };
  };

  return (
    <>
      <h1>Edit Payment Method</h1>
      {paymentMethod.name && (
        <CategoryPaymentMethodForm
          page="payment method"
          handleSubmit={handleSubmit}
          name={paymentMethod.name}
        />
      )}
    </>
  );
}
