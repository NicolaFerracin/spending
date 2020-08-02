import { useRouter } from 'next/router';
import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import SpendingContext from '../../componets/context';
import { ProtectedRoute } from '../../authContext';

const EditPaymentMethod = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (cookie, newName) => {
    // TODO abstract all this config away
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    });
    return { status: res.status };
  };

  return (
    <SpendingContext.Consumer>
      {ctx => (
        <>
          <h1>Edit Payment Method</h1>
          <CategoryPaymentMethodForm
            page="payment method"
            handleSubmit={handleSubmit}
            name={ctx.paymentMethods.find(c => c._id === id).name}
          />
        </>
      )}
    </SpendingContext.Consumer>
  );
};

export default ProtectedRoute(EditPaymentMethod);
