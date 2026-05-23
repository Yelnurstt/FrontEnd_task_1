import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//GET
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('http://localhost:5000/products');
      
      if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров с сервера');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//POST
export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (newProduct) => {
    const response = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    return await response.json();
  }
);

//DELETE
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE'
    });
    return id; 
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    updateProductPrice: (state, action) => {
      const { id, newPrice } = action.payload;
      const product = state.items.find(p => p.id === id);
      if (product) {
        product.price = newPrice;
      }
    }
  },
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
        state.status = 'failed'; // ошибка
        state.error = action.payload; 
      })
      
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      });
  },
});

export const { updateProductPrice } = productsSlice.actions;
export default productsSlice.reducer;