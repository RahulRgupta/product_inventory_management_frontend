// src/components/ProductTable.js
import React, { useEffect, useState } from 'react';
import ProductModal from './productForm';
import Logout from './logout';
import axios from 'axios';
import Cookies from 'js-cookie';
export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Fetch products from the backend API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = Cookies.get('token'); 
        const response = await axios.get('https://productinventory.vercel.app/getProduct', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
          },
        });
        const data = response.data;
        if (data.success) {
          setProducts(data.products); 
        } else {
          console.error('Failed to fetch products:', data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddProducts = () => {
    setSelectedProduct(null); // 
    setIsModalOpen(true);    // Open the modal
  };

  //add product
  const handleAddProduct = async (product) => {
    try {
      const token = Cookies.get('token');

      const response = await axios.post('https://productinventory.vercel.app/addProduct', product, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.data.success) {
        const newProduct = response.data.newProduct;
        console.log(newProduct,products)
        setProducts([...products, ...newProduct]); // Add the new product to the state
      } else {
        console.error('Failed to add product:', response.data.message);
      }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };


    const handleEditProduct = async (product) => {
      try {
        const { _id, ...productData } = product;
        const token = Cookies.get('token'); // Replace 'token' with the actual cookie name
    
        // Configure Axios request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure content type is set correctly
          },
        };
    
        // Send PATCH request with headers
        await axios.patch(`https://productinventory.vercel.app/updateProduct?id=${_id}`, productData, config);
    
        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item._id === _id ? { ...item, ...productData } : item
          )
        );
      } catch (error) {
        console.error('Error editing product:', error);
      }
    };

    //delete product
    const handleDeleteProduct = async (productId) => {
      try {
        const token = Cookies.get('token'); // Assuming token is stored in cookies
    
        const response = await axios.delete(`https://productinventory.vercel.app/deleteProduct`, {
          params: { id: productId },
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        });
    
        if (response.data.success) {
          // Remove the deleted product from the state
          const updatedProducts = products.filter((product) => product._id !== productId);
          setProducts(updatedProducts);
        } else {
          console.error('Failed to delete product:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    const openEditModal = (product) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
    };

  return (
    <div className="overflow-x-auto">
      
      <Logout/>
        <div className='flex justify-center items-center mt-0'>
            <h1 className='font-sans font-bold text-2xl'>Product Inventory Management</h1>
        </div>
        <div className='mt-8 flex ml-4'>
            <button className='bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded-md text-white' onClick={handleAddProducts}>+Add Product</button>
        </div>
      <table className="mt-4 min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
          <th className="py-2 px-4 border">Sr. No.</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product,index) => (
              <tr key={product._id} className="border-b items-center">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border text-center">{product.name}</td>
                <td className="py-2 px-4 border">{product.description}</td>
                <td className="py-2 px-4 border text-center">{product.price}</td>
                <td className="py-2 px-4 border text-center">{product.category}</td>
                <td className="py-2 px-4 border text-center">{product.stock}</td>
                <td className="py-2 px-4 border flex justify-center">
                  <button className="bg-blue-500 text-white py-1 px-4  rounded"  onClick={() => openEditModal(product)}>Edit</button>
                  <button className="bg-red-500 text-white py-1 px-2 ml-2 rounded" onClick={()=>handleDeleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        initialData={selectedProduct}
      />
    </div>
  );
}
