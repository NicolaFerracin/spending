import EntryForm from '../../componets/EntryForm';
import api from '../../api';

const Editentry = ({ id, entry, categories, paymentMethods }) => {
  const handleSubmit = async updatedEntry => {
    const res = await api.put(`api/entries/${id}`, updatedEntry);
    return { status: res.status };
  };

  return (
    <>
      <h1>Edit Entry</h1>
      <EntryForm
        handleSubmit={handleSubmit}
        {...entry}
        categories={categories}
        paymentMethods={paymentMethods}
      />
    </>
  );
};

export default Editentry;

export async function getServerSideProps({ query, req }) {
  const cookie = req?.headers?.cookie;
  let entry = {};
  let categories = [];
  let paymentMethods = [];
  if (cookie) {
    const options = { headers: { cookie } };
    const p1 = api.get(`api/entries/${query.id}`, options);
    const p2 = api.get('api/categories', options);
    const p3 = api.get('api/payment-methods', options);

    [entry, categories, paymentMethods] = await Promise.all([p1, p2, p3]).then(
      ([data1, data2, data3]) => {
        return [data1.data.entry, data2.data.categories, data3.data.paymentMethods];
      }
    );
  }

  return {
    props: { entry, categories, paymentMethods, id: query.id }
  };
}
