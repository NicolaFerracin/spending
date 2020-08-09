import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import api from '../../api';

class EditCategory extends React.Component {
  handleSubmit = async newName => {
    const res = await api.put(
      `api/categories/${this.props.id}`,
      {
        name: newName
      },
      { headers: { cookie: window.localStorage.getItem('jwt') } }
    );
    return { status: res.status };
  };

  render() {
    return (
      <>
        <h1>Edit Category</h1>
        <CategoryPaymentMethodForm
          page="category"
          handleSubmit={this.handleSubmit}
          name={this.props.category.name}
        />
      </>
    );
  }
}

export default EditCategory;

export async function getServerSideProps({ query, req }) {
  const cookie = req?.headers?.cookie;
  let category = {};
  if (cookie) {
    const res = await api.get(`api/categories/${query.id}`, {
      headers: { cookie }
    });
    category = res.data.category;
  }

  return {
    props: { category, id: query.id }
  };
}
