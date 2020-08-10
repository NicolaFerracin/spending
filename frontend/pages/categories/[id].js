import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CategoryPaymentMethodForm from '../../componets/CategoryPaymentMethodForm';
import api from '../../api';

export default function EditCategory() {
  const { query } = useRouter();
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`api/categories/${query.id}`, {
        haders: { cookie: window.localStorage.getItem('jwt') }
      });
      setCategory(res.data.category);
    };

    fetchData();
  }, []);

  const handleSubmit = async newName => {
    const res = await api.put(
      `api/categories/${query.id}`,
      {
        name: newName
      },
      { headers: { cookie: window.localStorage.getItem('jwt') } }
    );
    return { status: res.status };
  };

  return (
    <>
      <h1>Edit Category</h1>
      {category.name && (
        <CategoryPaymentMethodForm
          page="category"
          handleSubmit={handleSubmit}
          name={category.name}
        />
      )}
    </>
  );
}
