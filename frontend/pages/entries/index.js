import Link from 'next/link';
import SpendingContext from '../../componets/context';

const Entries = () => {
  const deleteEntry = async (cookie, id) => {
    // TODO abstract all this away
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/entries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    location.reload();
  };

  return (
    <SpendingContext.Consumer>
      {ctx => (
        <>
          <h1>Entries</h1>
          {ctx.entries.map(c => {
            return (
              <div key={c._id}>
                Name: {c.name}
                <Link href={`/entries/${c._id}`}>
                  <a>Edit Entry</a>
                </Link>
                <button onClick={() => deleteEntry(ctx.cookie, c._id)}>Delete Entry</button>
                <hr />
              </div>
            );
          })}
          <Link href="/entries/new">
            <a>Add New Entry</a>
          </Link>
        </>
      )}
    </SpendingContext.Consumer>
  );
};

export default Entries;
