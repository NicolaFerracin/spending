import Link from 'next/Link';
import EntriesList from '../../componets/EntriesList';
import AddButton from '../../componets/AddButton';
import { MONTHS } from '../../utils';
import api from '../../api';

const Editentry = ({ year, month, entries }) => {
  return (
    <>
      <h1>
        Entries for {MONTHS[Number(month) - 1]} {year}
      </h1>
      <EntriesList entries={entries} />
      <Link href="/entries/new">
        <a>
          <AddButton to="/payment-methods/new" />
        </a>
      </Link>
    </>
  );
};

export default Editentry;

export async function getServerSideProps({ query, req }) {
  const [year, month] = query.params;
  const cookie = req.headers?.cookie;
  let entries = [];
  if (cookie) {
    const res = await api.get(`api/entries/${year}/${month}`, {
      headers: { cookie }
    });
    entries = res.data.entries;
  }

  return {
    props: { entries, year, month }
  };
}
