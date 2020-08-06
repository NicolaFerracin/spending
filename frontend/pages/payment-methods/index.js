import Link from 'next/link';
import Button from '../../componets/Button';
import api from '../../api';

const PaymentMethods = ({ paymentMethods }) => {
  const deletePaymentMethod = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      await api.delete(`api/payment-methods/${id}`);
      location.reload();
    }
  };

  return (
    <>
      <h1>Payment Methods</h1>
      {paymentMethods.map(p => (
        <div key={p._id}>
          Name: {p.name}
          <Link href={`/payment-methods/${p._id}`}>
            <a>Edit Payment Method</a>
          </Link>
          <Button onClick={() => deletePaymentMethod(p._id)}>Delete Payment Method</Button>
          <hr />
        </div>
      ))}
      <Link href="/payment-methods/new">
        <a>Add Payment Method</a>
      </Link>
    </>
  );
};

export default PaymentMethods;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers?.cookie;
  let paymentMethods = [];
  if (cookie) {
    const res = await api.get('api/payment-methods', {
      headers: { cookie }
    });
    paymentMethods = res.data.paymentMethods;
  }

  return {
    props: { paymentMethods }
  };
}
