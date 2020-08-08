import Link from 'next/Link';
import AddButton from '../../componets/AddButton';
import Table from '../../componets/Table';
import Layout from '../../componets/Layout';
import Svg from '../../componets/Svg';
import api from '../../api';

const COLS = [
  { id: 'name', header: 'Name', order: 1 },
  { id: 'actions', header: 'Actions', order: 2 }
];

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
        <Table
          cols={COLS}
          data={this.props?.categories?.map(c => ({
            id: c._id,
            name: c.name,
            actions: (
              <>
                <Link href="/categories/[id]" as={`/categories/${c._id}`}>
                  <a>
                    <Svg.Edit />
                  </a>
                </Link>
                <Svg.Delete onClick={() => this.deleteCategory(c._id)} />
              </>
            )
          }))}
        />
        <Link href="/categories/new">
          <a>
            <AddButton />
          </a>
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
