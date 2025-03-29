'use client';

import { createSlice } from "@reduxjs/toolkit";
import Notification from "../../common/Notification"
import routes from "../../utils/routes";
import { changeLoadingState } from "../customizer/CustomizerSlice";

const initialState = {
    Employee: [],
    deletedEmployee: [],
    getEmployeebyid: {},
}

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {

        GetREGEmployee: (state, action) => {
            state.Employee = action.payload;
        },
        GetDeletedEmployees: (state, action) => {
            state.deletedEmployee = action.payload;
        },
        GetEmployeebyid: (state, action) => {
            state.getEmployeebyid = action.payload;
        },
    }
})
export const { GetREGEmployee, GetDeletedEmployees, GetEmployeebyid } = employeeSlice.actions;

export const createEmployee = (data) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));
        const response = await routes.APIS.createEmployee(data)

        if (response.status === 200) {
            Notification({ message: response.message, type: 'success' });
            // dispatch(getEmployees());
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.error('Error creating Employee:', error);
        Notification({ message: "Error creating Employee", type: 'error' });
    } finally {
        dispatch(changeLoadingState(false));

    }
};

export const getEmployees = () => async (dispatch) => {
    try {
        const response = await routes.APIS.getEmployees();
        console.log("getEmployeesgetEmployees", response)
        dispatch(GetREGEmployee(response.data));
    } catch (error) {
        console.log(error);
    }
};
// getDeletedEmployees
export const getDeletedEmployees = () => async (dispatch) => {
    try {
        const response = await routes.APIS.getDeletedEmployees();
        dispatch(GetDeletedEmployees(response.data));
    } catch (error) {
        console.log(error);
    }
};

// getEmployeebyid
export const getEmployeebyid = (id) => async (dispatch) => {
    try {
        const response = await routes.APIS.getEmployeebyid(id);
        dispatch(GetEmployeebyid(response.data));
    } catch (error) {
        console.log(error);
    }
};
// updateEmployee
export const updateEmployee = (id, data) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));
        const response = await routes.APIS.updateEmployee(id, data)

        if (response.status === 200) {
            Notification({ message: response.message, type: 'success' });
            dispatch(getEmployees());
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.error('Error update Employee:', error);
        Notification({ message: "Error update Employee", type: 'error' });
    } finally {
        dispatch(changeLoadingState(false));

    }
};


export const softDeleteEmployeee = (id) => async (dispatch) => {
    try {
        const response = await routes.APIS.softDeleteEmployeee({ ids: [id] });
        if (response && response.status === 200) {
            Notification({ message: response.message, type: 'success' });
            dispatch(getEmployees());
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        Notification({ message: 'An error occurred during Deleting.', type: 'error' });
    }
};

export const permanentDeleteEmployee = (id) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));

        console.log("permanentDeleteEmployee", id)
        // return;
        const response = await routes.APIS.permanentDeleteEmployee({ ids: [id] });

        if (response && response.status === 200) {
            dispatch(getEmployees());
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.log(error);
        Notification({ message: 'An error occurred during Deleting.', type: 'error' });
    } finally {
        dispatch(changeLoadingState(false));

    }
}

export default employeeSlice.reducer;
