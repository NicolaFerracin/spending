import Link from 'next/Link';
import Button from '../Button';
import api from '../../api';

export default function EntriesList({ entries }) {
  const deleteEntry = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      await api.delete(`api/entries/${id}`);
      location.reload();
    }
  };

  return entries.map(c => (
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
  ));
}
