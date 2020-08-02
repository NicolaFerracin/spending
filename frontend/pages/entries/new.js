import EntryForm from '../../componets/EntryForm';

const NewEntry = () => {
  const handleSubmit = async (cookie, newEntry) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/entries`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    });
    return { status: res.status };
  };

  return (
    <>
      <h1>New Entry</h1>
      <EntryForm handleSubmit={handleSubmit} />
    </>
  );
};

export default NewEntry;
