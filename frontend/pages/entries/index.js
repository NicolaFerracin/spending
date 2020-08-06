import Link from 'next/link';
import Button from '../../componets/Button';
import api from '../../api';

const Entries = ({ entries }) => {
  const deleteEntry = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      await api.delete(`api/entries/${id}`);
      location.reload();
    }
  };

  return (
    <>
      <h1>Entries</h1>
      {entries.map(c => {
        return (
          <div key={c._id}>
            <div> Name: {c.name}</div>
            <div>Amount: {c.amount}</div>
            <div>Category: {c.category?.name}</div>
            <div>Method: {c.paymentMethod?.name}</div>
            <div>Date: {new Date(c.date).toString()}</div>
            <Link href={`/entries/${c._id}`}>
              <a>Edit Entry</a>
            </Link>
            <Button onClick={() => deleteEntry(c._id)}>Delete Entry</Button>
            <hr />
          </div>
        );
      })}
      <Link href="/entries/new">
        <a>Add New Entry</a>
      </Link>
    </>
  );
};

export default Entries;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers?.cookie;
  let entries = [];
  if (cookie) {
    const res = await api.get('api/entries', {
      headers: { cookie }
    });
    entries = res.data.entries;
  }

  return {
    props: { entries }
  };
}
