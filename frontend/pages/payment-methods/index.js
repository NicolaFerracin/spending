import Link from 'next/link';
import SpendingContext from '../../componets/context';

const PaymentMethods = () => {
  const deletePaymentMethod = async (cookie, id) => {
    // TODO abstract all this away
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment-methods/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    location.reload();
  };

  return (
    <SpendingContext.Consumer>
      {ctx => (
        <>
          <h1>Payment Methods</h1>
          {ctx.paymentMethods.map(p => {
            return (
              <div key={p._id}>
                Name: {p.name}
                <Link href={`/payment-methods/${p._id}`}>
                  <a>Edit Payment Method</a>
                </Link>
                <button onClick={() => deletePaymentMethod(ctx.cookie, p._id)}>
                  Delete Payment Method
                </button>
                <hr />
              </div>
            );
          })}
          <Link href="/payment-methods/new">
            <a>Add Payment Method</a>
          </Link>
        </>
      )}
    </SpendingContext.Consumer>
  );
};

export default PaymentMethods;
