const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Product API calls
export const productApi = {
  getAll: async (params?: { category?: string; search?: string; sort?: string }) => {
    try {
      const queryString = new URLSearchParams();
      if (params?.category) queryString.append('category', params.category);
      if (params?.search) queryString.append('search', params.search);
      if (params?.sort) queryString.append('sort', params.sort);

      const response = await fetch(`${API_URL}/products?${queryString.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const response = await fetch(`${API_URL}/products/slug/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
};

// Category API calls
export const categoryApi = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const response = await fetch(`${API_URL}/categories/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },
};

// Contact API calls
export const contactApi = {
  submit: async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
};
