import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import api from '../../api';

const EditPaymentMethod = ({ id, paymentMethod }) => {
  const handleSubmit = async newName => {
    const res = await api.put(`api/payment-methods/${id}`, { name: newName });
    return { status: res.status };
  };

  return (
    <>
      <h1>Edit Payment Method</h1>
      <CategoryPaymentMethodForm
        page="payment method"
        handleSubmit={handleSubmit}
        name={paymentMethod.name}
      />
    </>
  );
};

export default EditPaymentMethod;

export async function getServerSideProps({ query, req }) {
  const cookie = req?.headers?.cookie;
  let paymentMethod = {};
  if (cookie) {
    const res = await api.get(`api/payment-methods/${query.id}`, {
      headers: { cookie }
    });
    paymentMethod = res.data.paymentMethod;
  }

  return {
    props: { paymentMethod, id: query.id }
  };
}
