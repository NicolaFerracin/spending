import EntryForm from '../../componets/EntryForm';

export default () => {
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

  return <EntryForm handleSubmit={handleSubmit} />;
};
