import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';

const NewCategory = () => {
  const handleSubmit = async (cookie, name) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
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

  return <CategoryPaymentMethodForm page="category" handleSubmit={handleSubmit} />;
};

export default NewCategory;
