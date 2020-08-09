import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import api from '../../api';

const NewPaymentMethod = () => {
  const handleSubmit = async name => {
    const res = await api.post(
      'api/payment-methods',
      { name },
      { headers: { cookie: window.localStorage.getItem('jwt') } }
    );
    return { status: res.status };
  };

  return (
    <>
      <CategoryPaymentMethodForm page="payment method" handleSubmit={handleSubmit} />
    </>
  );
};

export default NewPaymentMethod;
