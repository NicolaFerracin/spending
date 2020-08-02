import { useRouter } from 'next/router';
import EntryForm from '../../componets/EntryForm';
import SpendingContext from '../../componets/context';

const Editentry = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (cookie, updatedEntry) => {
    // TODO abstract all this config away
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/entries/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEntry)
    });
    return { status: res.status };
  };

  return (
    <SpendingContext.Consumer>
      {ctx => (
        <>
          <h1>Edit Entry</h1>
          <EntryForm handleSubmit={handleSubmit} {...ctx.entries.find(e => e._id === id)} />
        </>
      )}
    </SpendingContext.Consumer>
  );
};

export default Editentry;
