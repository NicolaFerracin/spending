import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';

const NewPaymentMethod = () => {
  const handleSubmit = async (cookie, name) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    return { status: res.status };
  };

  return <CategoryPaymentMethodForm page="payment method" handleSubmit={handleSubmit} />;
};

export default NewPaymentMethod;
