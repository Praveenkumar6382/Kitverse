import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Jersey");

  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/products`,
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= CLEAR FORM =================

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setImage("");
    setCategory("Jersey");
    setEditId(null);
  };

  // ================= OPEN ADD MODAL =================

  const handleAddProduct = () => {
    clearForm();
    setShowModal(true);
  };

  // ================= OPEN EDIT MODAL =================

  const handleEdit = (product) => {
    setEditId(product._id);

    setTitle(product.title || "");
    setDescription(product.description || "");
    setPrice(product.price || "");
    setQuantity(product.quantity || "");
    setImage(product.image || "");
    setCategory(product.category || "Jersey");

    setShowModal(true);
  };

  // ================= CLOSE MODAL =================

  const handleCloseModal = () => {
    setShowModal(false);
    clearForm();
  };

  // ================= ADD / UPDATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const productData = {
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      image,
      category,
    };

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/product/update/${editId}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        toast.success("Product updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/create`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Product added successfully");
      }

      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= HEADER ================= */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>

            <p className="text-gray-500 mt-1">Manage all KitVerse products</p>
          </div>

          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* ================= PRODUCT COUNT ================= */}

        <div className="mb-6">
          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold">
            {products.length} Products
          </span>
        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading products...</p>
          </div>
        )}

        {/* ================= PRODUCT LIST ================= */}

        {!loading && products.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500 mb-4">No products found.</p>

            <button
              onClick={handleAddProduct}
              className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
            >
              Add Your First Product
            </button>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition"
              >
                {/* IMAGE */}

                <div className="h-56 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}

                <div className="p-4">
                  <h2 className="font-bold text-lg text-slate-900">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-emerald-600 font-bold text-lg">
                      ₹{product.price}
                    </p>

                    <span className="text-sm text-gray-500">
                      Stock: {product.quantity}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* ================= PRODUCT MODAL ================= */}
      {/* ================================================= */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}

            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-slate-900">
                {editId ? "Edit Product" : "Add Product"}
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="p-6">
              {/* TITLE */}

              <label className="block text-sm font-semibold mb-1">
                Product Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
                className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />

              {/* DESCRIPTION */}

              <label className="block text-sm font-semibold mb-1">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows="3"
                className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />

              {/* PRICE + QUANTITY */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Price
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="₹ Price"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Quantity
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Stock"
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-400"
                    required
                  />
                </div>
              </div>

              {/* IMAGE */}

              <label className="block text-sm font-semibold mb-1 mt-4">
                Image URL
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />

              {/* CATEGORY */}

              <label className="block text-sm font-semibold mb-1">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg p-3 mb-6 outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="Jersey">Jersey</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
              </select>

              {/* BUTTONS */}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold"
                >
                  {editId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminProducts;
