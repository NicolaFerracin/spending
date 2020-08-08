import Link from 'next/link';
import Svg from '../../componets/Svg';
import Table from '../../componets/Table';
import api from '../../api';
import styles from './styles.module.scss';

const COLS = [
  { id: 'amount', header: 'Amount', order: 1 },
  { id: 'name', header: 'Name', order: 2 },
  { id: 'category', header: 'Category', order: 3 },
  { id: 'paymentMethod', header: 'Payment Method', order: 4 },
  { id: 'actions', header: 'Actions', order: 5 }
];

const groupEntriesByDate = entries =>
  entries.reduce((entriesByDate, entry) => {
    const date = `${entry.day}-${entry.month - 1}-${entry.year}`;
    console.log(date);
    if (entriesByDate[date]) {
      entriesByDate[date].entries.push(entry);
      entriesByDate[date].sum += entry.amount;
    } else {
      entriesByDate[date] = {
        entries: [entry],
        sum: entry.amount
      };
    }
    return entriesByDate;
  }, {});

const dateOptions = {
  weekday: 'short',
  month: 'short',
  day: '2-digit'
};

export default function EntriesList({ entries }) {
  const deleteEntry = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      await api.delete(`api/entries/${id}`);
      location.reload();
    }
  };

  const entriesBydate = groupEntriesByDate(entries);

  console.log(entriesBydate);
  return Object.keys(entriesBydate).map(date => (
    <>
      <h3 className={styles.heading}>
        {new Date(...date.split('-').reverse()).toLocaleDateString('en', dateOptions)}
        <span className={styles.textRight}>Spent: {entriesBydate[date].sum}€</span>
      </h3>
      <Table
        cols={COLS}
        data={entriesBydate[date].entries.map(e => ({
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
    </>
  ));
}
