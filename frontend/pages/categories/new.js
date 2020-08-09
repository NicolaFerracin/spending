import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import api from '../../api';

const NewCategory = () => {
  const handleSubmit = async name => {
    const res = await api.post(
      `api/categories`,
      {
        name
      },
      { headers: { cookie: window.localStorage.getItem('jwt') } }
    );
    return { status: res.status };
  };

  return (
    <>
      <CategoryPaymentMethodForm page="category" handleSubmit={handleSubmit} />
    </>
  );
};

export default NewCategory;
