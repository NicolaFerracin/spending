import { useRouter } from 'next/router';
import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import SpendingContext from '../../componets/context';
import { ProtectedRoute } from '../../authContext';

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (ctx, newName) => {
    console.log(ctx.apiHandler);
    const res = await ctx.apiHandler.put(`api/categories/${id}`, { name: newName });
    return { status: res.status };
  };

  return (
    <SpendingContext.Consumer>
      {ctx => (
        <>
          <h1>Edit Category</h1>
          <CategoryPaymentMethodForm
            page="category"
            handleSubmit={newName => handleSubmit(ctx, newName)}
            name={ctx.categories.find(c => c._id === id).name}
          />
        </>
      )}
    </SpendingContext.Consumer>
  );
};

export default ProtectedRoute(EditCategory);
