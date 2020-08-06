import Link from 'next/link';
import Button from '../../componets/Button';
import Layout from '../../componets/Layout';
import api from '../../api';

class Categories extends React.Component {
  deleteCategory = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      api.delete(`api/categories/${id}`);
      location.reload();
    }
  };

  render() {
    return (
      <>
        <h1>Categories</h1>
        {this.props?.categories?.map(c => {
          return (
            <div key={c._id}>
              Name: {c.name}
              <Link href={`/categories/${c._id}`}>
                <a>Edit Category</a>
              </Link>
              <Button onClick={() => this.deleteCategory(c._id)}>Delete Category</Button>
              <hr />
            </div>
          );
        })}
        <Link href="/categories/new">
          <a>Add New Category</a>
        </Link>
      </>
    );
  }
}

Categories.Layout = Layout;

export default Categories;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers?.cookie;
  let categories = [];
  if (cookie) {
    const res = await api.get('api/categories', {
      headers: { cookie }
    });
    categories = res.data.categories;
  }

  return {
    props: { categories }
  };
}
