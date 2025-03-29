'use client';

import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import enquiryReducer from './AllSlices/enquiry.slice';
import adminReducer from './AllSlices/admin.slice';
import enrollStudentReducer from './AllSlices/enrollStudent.slice';
import employeeReducer from './AllSlices/employee.slice';


export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    enquiryReducer: enquiryReducer,
    adminReducer: adminReducer,
    enrollStudentReducer: enrollStudentReducer,
    employeeReducer: employeeReducer,

  },
});

export default store;
