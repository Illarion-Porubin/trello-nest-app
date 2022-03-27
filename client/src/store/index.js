import { configureStore } from '@reduxjs/toolkit';
import listsSlice from "./listsSlice";


export default configureStore ({
    reducer: {
        lists: listsSlice
    }
})
