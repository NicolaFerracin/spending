import Link from 'next/Link';
import Table from '../../componets/Table';
import Svg from '../../componets/Svg';
import AddButton from '../../componets/AddButton';
import api from '../../api';

const COLS = [
  { id: 'name', header: 'Name', order: 1 },
  { id: 'actions', header: 'Actions', order: 2 }
];

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
