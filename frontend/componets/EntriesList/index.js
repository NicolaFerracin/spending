import Link from 'next/Link';
import Svg from '../../componets/Svg';
import Table from '../../componets/Table';
import api from '../../api';

const COLS = [
  { id: 'amount', header: 'Amount', order: 1 },
  { id: 'name', header: 'Name', order: 2 },
  { id: 'category', header: 'Category', order: 3 },
  { id: 'paymentMethod', header: 'Payment Method', order: 4 },
  { id: 'actions', header: 'Actions', order: 5 }
];

export default function EntriesList({ entries }) {
  const deleteEntry = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      await api.delete(`api/entries/${id}`);
      location.reload();
    }
  };

  return (
    <Table
      cols={COLS}
      data={entries.map(e => ({
        id: e._id,
        name: e.name,
        amount: e.amount,
        category: e.category.name,
        paymentMethod: e.paymentMethod.name,
        actions: (
          <>
            <Link href="/entries/[id]" as={`/entries/${e._id}`}>
              <a>
                <Svg.Edit />
              </a>
            </Link>
            <Svg.Copy />
            <Svg.Delete onClick={() => deleteEntry(e._id)} />
          </>
        )
      }))}
    />
  );
}
