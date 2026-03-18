'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, Plus, Edit2, Trash2, Search, X, FolderTree } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  sku: string;
  basePrice: number;
  discountPrice?: number;
  stock: number;
  status: string;
  isFeatured: boolean;
  categories: { name: string }[];
}

export default function ProductsPage() {
  const searchParams   = useSearchParams();
  const router         = useRouter();
  const categoryId     = searchParams.get('categoryId') || '';
  const categoryName   = searchParams.get('categoryName') || '';

  const [products, setProducts]         = useState<Product[]>([]);
  const [loading, setLoading]           = useState(true);
  const [searchQuery, setSearchQuery]   = useState('');
  const [uploading, setUploading]       = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const url = categoryId ? `/api/admin/products?categoryId=${categoryId}` : '/api/admin/products';
      const response = await fetch(url);
      if (response.ok) setProducts(await response.json());
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/admin/products/import', { method: 'POST', body: formData });
      if (response.ok) {
        const result = await response.json();
        alert(`Successfully imported ${result.importedCount} products, ${result.variantCount} variants, ${result.categoryCount} categories`);
        fetchProducts();
      } else {
        alert('Failed to import CSV');
      }
    } catch (error) {
      console.error('Error uploading CSV:', error);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
      if (response.ok) setProducts(products.filter((p) => p.id !== productId));
      else alert('Failed to delete product');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.sku || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            {categoryName && (
              <div className="flex items-center gap-1.5 text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-medium">
                <FolderTree className="w-3.5 h-3.5" />
                {categoryName}
                <button onClick={() => router.push('/admin/products')} className="ml-0.5 hover:text-indigo-900" title="Clear filter">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mt-1">
            {categoryName
              ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} in this category`
              : `Manage your product inventory (${products.length} total)`}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/add" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5" /> Add Product
          </Link>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            {uploading ? 'Importing...' : 'Import CSV'}
            <input type="file" accept=".csv" onChange={handleCSVUpload} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="DRAFT">Draft</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {products.length === 0 ? 'No products found.' : 'No products match your search.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Categories</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Featured</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.sku || '—'}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {product.categories?.length > 0
                          ? product.categories.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">{c.name}</span>
                            ))
                          : <span className="text-gray-300">—</span>
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.discountPrice ? (
                        <>
                          <span className="line-through text-gray-400">₹{Number(product.basePrice).toLocaleString('en-IN')}</span>
                          <span className="ml-2 font-semibold text-green-600">₹{Number(product.discountPrice).toLocaleString('en-IN')}</span>
                        </>
                      ) : (
                        <span className="font-semibold">₹{Number(product.basePrice || 0).toLocaleString('en-IN')}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      {product.isFeatured ? <span className="text-amber-500 text-lg">★</span> : <span className="text-gray-300 text-lg">☆</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
