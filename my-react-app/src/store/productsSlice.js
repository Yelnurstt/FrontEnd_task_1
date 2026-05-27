import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// GET
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров с сервера');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST
export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (newProduct) => {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    return await response.json();
  }
);

// DELETE
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    });
    return id; 
  }
);

// PUT (НОВОЕ: Редактирование товара)
export const editProductAsync = createAsyncThunk(
  'products/editProduct',
  async (updatedProduct) => {
    const response = await fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });
    return await response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.items = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.payload; 
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      })
      // НОВОЕ: Обновляем товар в стейте после успешного ответа сервера
      .addCase(editProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default productsSlice.reducer;