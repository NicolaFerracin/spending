import Link from 'next/link';
import SpendingContext from '../../componets/context';

const Categories = () => {
  const deleteCategory = async (cookie, id) => {
    // TODO abstract all this away
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`, {
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
          <h1>Categories</h1>
          {ctx.categories.map(c => {
            return (
              <div key={c._id}>
                Name: {c.name}
                <Link href={`/categories/${c._id}`}>
                  <a>Edit Category</a>
                </Link>
                <button onClick={() => deleteCategory(ctx.cookie, c._id)}>Delete Category</button>
                <hr />
              </div>
            );
          })}
          <Link href="/categories/new">
            <a>Add New Category</a>
          </Link>
        </>
      )}
    </SpendingContext.Consumer>
  );
};

export default Categories;
