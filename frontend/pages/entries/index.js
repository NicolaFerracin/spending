import Link from 'next/Link';
import EntriesList from '../../componets/EntriesList';
import api from '../../api';

const Entries = ({ entries }) => {
  return (
    <>
      <h1>Entries</h1>
      <EntriesList entries={entries} />
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
