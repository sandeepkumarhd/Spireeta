'use client';

import { createSlice } from "@reduxjs/toolkit";
// import Notification from "@/components/common/Notification";
import Notification from "../../common/Notification"
import routes from "../../utils/routes";
import { changeLoadingState } from "../customizer/CustomizerSlice";
// import { changeLoadingState } from "../customizer/CustomizerSlice";

const initialState = {
    REGenquiry: [],
    deletedEnquiry: [],
}

export const enquirySlice = createSlice({
    name: 'enquiry',
    initialState,
    reducers: {
        saveEnquiry: (state, action) => {
            state.enquiry = action.payload;
        },
        GetREGenquiry: (state, action) => {
            state.REGenquiry = action.payload;
        },
        getDeleteEnquiry: (state, action) => {
            state.deletedEnquiry = action.payload;
        },
    }
})
export const { saveEnquiry, GetREGenquiry, getDeleteEnquiry } = enquirySlice.actions;

export const createEnquiry = (data) => async (dispatch) => {
    try {
        // dispatch(changeLoadingState(true));
        // console.log("createEnquiry slice",data)s
        // return
        dispatch(changeLoadingState(true));

        const response = await routes.APIS.AddEnquiry(data)

        if (response.status === 200) {
            dispatch(saveEnquiry(response.data));

            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.error('Error creating enquiry:', error);
        Notification({ message: "Error creating enquiry", type: 'error' });

    }
    finally {
        dispatch(changeLoadingState(false));
    }
};

export const fetchRegistrationsEnquiry = () => async (dispatch) => {
    try {
        const response = await routes.APIS.getAllEnquiry();
        console.log("fetchRegistrationsEnquiryresponse", response)

        dispatch(GetREGenquiry(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const fetchDeletedEnquiry = () => async (dispatch) => {
    try {
        const response = await routes.APIS.getAllDeletedEnquiry();
        console.log("fetchDeletedEnquiry", response)

        dispatch(getDeleteEnquiry(response.data));
    } catch (error) {
        console.log(error);
    }
};

// restoreEnquiry
export const restoreEnquiry = (id) => async (dispatch) => {
    try {
        const response = await routes.APIS.restoreEnquiry({ ids: [id] });
        if (response && response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        await dispatch(fetchRegistrationsEnquiry());
        await dispatch(fetchDeletedEnquiry());
        return response;
    } catch (error) {
        Notification({ message: 'An error occurred during restore.', type: 'error' });
    }
}

export const softDeleteEnquiry = (id) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));

        const response = await routes.APIS.softDeleteEnquiry({ ids: [id] });
        if (response && response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        dispatch(fetchRegistrationsEnquiry());
        return response;
    } catch (error) {
        Notification({ message: 'An error occurred during Deleting.', type: 'error' });
    }
    finally{
        dispatch(changeLoadingState(false));
    }
};

export const permenantlyDeleteEnquiry = (id) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));

        const response = await routes.APIS.permenantlyDeleteEnquiry({ ids: [id] });

        if (response && response.status === 200) {
            Notification({ message: response.message, type: 'success' });
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        dispatch(fetchDeletedEnquiry());
        return response;
    } catch (error) {
        console.log(error);
        Notification({ message: 'An error occurred during Deleting.', type: 'error' });
    } finally {
        dispatch(changeLoadingState(false));

    }
}



export default enquirySlice.reducer;
