import { useRouter } from 'next/router';
import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import SpendingContext from '../../componets/context';

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (cookie, newName) => {
    // TODO abstract all this config away
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        cookie,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    });
    return { status: res.status };
  };

  return (
    <SpendingContext.Consumer>
      {ctx => (
        <>
          <h1>Edit Category</h1>
          <CategoryPaymentMethodForm
            page="category"
            handleSubmit={handleSubmit}
            name={ctx.categories.find(c => c._id === id).name}
          />
        </>
      )}
    </SpendingContext.Consumer>
  );
};

export default EditCategory;
