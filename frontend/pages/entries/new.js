import EntryForm from '../../componets/EntryForm';
import api from '../../api';

const NewEntry = ({ categories, paymentMethods }) => {
  const handleSubmit = async newEntry => {
    const res = await api.post('api/entries', newEntry);
    return { status: res.status };
  };

  return (
    <>
      <h1>New Entry</h1>
      <EntryForm
        handleSubmit={handleSubmit}
        categories={categories}
        paymentMethods={paymentMethods}
      />
    </>
  );
};

export default NewEntry;

export async function getServerSideProps({ query, req }) {
  const cookie = req?.headers?.cookie;
  let categories = [];
  let paymentMethods = [];
  if (cookie) {
    const options = { headers: { cookie } };
    const p1 = api.get('api/categories', options);
    const p2 = api.get('api/payment-methods', options);

    [categories, paymentMethods] = await Promise.all([p1, p2]).then(([data1, data2]) => {
      return [data1.data.categories, data2.data.paymentMethods];
    });
  }

  return {
    props: { categories, paymentMethods }
  };
}
