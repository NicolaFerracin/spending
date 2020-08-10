import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddButton from '../../componets/AddButton';
import Table from '../../componets/Table';
import Svg from '../../componets/Svg';
import api from '../../api';

const COLS = [
  { id: 'name', header: 'Name', order: 1 },
  { id: 'actions', header: 'Actions', order: 2 }
];

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('api/categories', {
        haders: { cookie: window.localStorage.getItem('jwt') }
      });
      setCategories(res.data.categories);
    };

    fetchData();
  }, []);

  const deleteCategory = async id => {
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      api.delete(`api/categories/${id}`, {
        headers: { cookie: window.localStorage.getItem('jwt') }
      });
      location.reload();
    }
  };

  return (
    <>
      <h1>Categories</h1>
      <Table
        cols={COLS}
        data={categories.map(c => ({
          id: c._id,
          name: c.name,
          actions: (
            <>
              <Link href="/categories/[id]" as={`/categories/${c._id}`}>
                <a>
                  <Svg.Edit />
                </a>
              </Link>
              <Svg.Delete onClick={() => deleteCategory(c._id)} />
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
