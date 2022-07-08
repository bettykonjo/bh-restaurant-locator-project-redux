import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import detailsReducer from './detailsSlice';

export default configureStore({
  reducer: {
    search: searchReducer,
    details: detailsReducer,
  },
});
