'use client';

import { createSlice } from "@reduxjs/toolkit";
import Notification from "../../common/Notification"
import routes from "../../utils/routes";
import { changeLoadingState } from "../customizer/CustomizerSlice";

const initialState = {
    enrollStudents: [],
    deletedStudents: [],

}

export const enrollStudentsSlice = createSlice({
    name: 'enrollStudent',
    initialState,
    reducers: {
        GetEnrollStudent: (state, action) => {
            state.enrollStudents = action.payload;
        },
        getDeleteStudents: (state, action) => {
            state.deletedStudents = action.payload;
        },
    }
})
export const { GetEnrollStudent, getDeleteStudents } = enrollStudentsSlice.actions;

export const createStudents = (data) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));

        console.log("createStudentscreateStudents", data)
        const response = await routes.APIS.createStudents(data)

        if (response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.error('Error creating student:', error);
        Notification({ message: "Error creating student", type: 'error' });

    } finally {
        dispatch(changeLoadingState(false));

    }
};

export const fetchEnrollStudent = () => async (dispatch) => {
    try {
        const response = await routes.APIS.FetchEnrollStudent();
        console.log("fetchEnrollStudent", response)
        dispatch(GetEnrollStudent(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const fetchDeletedStudent = () => async (dispatch) => {
    try {
        const response = await routes.APIS.getAllDeletedStudents();
        console.log("fetchDeletedEnquiry", response)

        dispatch(getDeleteStudents(response.data));
    } catch (error) {
        console.log(error);
    }
};

// restoreEnquiry
export const restoreStudent = (id) => async (dispatch) => {
    try {
        const response = await routes.APIS.restoreStudent({ ids: [id] });
        if (response && response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        await dispatch(fetchEnrollStudent());
        await dispatch(fetchDeletedStudent());
        return response;
    } catch (error) {
        Notification({ message: 'An error occurred during restore.', type: 'error' });
    }
}

export const updateStudents = (id, data) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));

        console.log("createStudentscreateStudents", id, data)
        const response = await routes.APIS.updateStudent(id, data)

        if (response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.error('Error creating student:', error);
        Notification({ message: "Error creating student", type: 'error' });

    } finally {
        dispatch(changeLoadingState(false));

    }
};

export const softDeleteEnrollStudent = (id) => async (dispatch) => {
    try {
        const response = await routes.APIS.softdeleteStudent({ ids: [id] });
        if (response && response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        dispatch(fetchEnrollStudent());
        return response;
    } catch (error) {
        Notification({ message: 'An error occurred during Deleting.', type: 'error' });
    }
};

export const permenantlyDeleteEnrollStudent = (id) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));

        const response = await routes.APIS.permanentDeleteStudents({ ids: [id] });

        if (response && response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        dispatch(fetchDeletedStudent());
        return response;
    } catch (error) {
        console.log(error);
        Notification({ message: 'An error occurred during Deleting.', type: 'error' });
    } finally {
        dispatch(changeLoadingState(false));

    }
}

export default enrollStudentsSlice.reducer;
