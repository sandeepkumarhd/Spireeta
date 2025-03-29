'use client';

import { createSlice } from "@reduxjs/toolkit";
import Notification from "../../common/Notification"
import routes from "../../utils/routes";
import Localstorage from "../../utils/storage/Localstorage";
import { changeLoadingState } from "../customizer/CustomizerSlice";

const initialState = {
    adminInfo: {},
}

export const adminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        saveAdminInfo: (state, action) => {
            state.adminInfo = action.payload;
        },
        // saveAdminInfo: (state, action) => {
        //     // state.adminInfo = action.payload;
        //     state.adminEmail = action.payload.email || action.payload.adminEmail;
        //     console.log(state.adminEmail)
        //     state.adminId = action.payload.id || action.payload._id;
        //     state.adminLoginTime = action.payload.loginTime;
        //     state.adminName = action.payload.adminName || action.payload.name;
        // },

    }
})

export const { saveAdminInfo } = adminSlice.actions;

export const  adminSignUp= (data) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));
        const resp = await routes.APIS.adminSignup(data);
        console.log("resp>>>>>>>>vender", resp)

        if (resp.status === 201) {
            Notification({ message: resp.message, type: 'success' });
        } else {
            Notification({ message: resp.message, type: 'error' });
        }
        return resp;
    } catch (error) {
        Notification({ message: 'An error occurred during account creation.', type: 'error' });

    } finally {
        dispatch(changeLoadingState(false));

    }
}

export const adminLogin = (data) => async (dispatch) => {
    try {
        dispatch(changeLoadingState(true));

        const response = await routes.APIS.login(data);
        console.log("response", response);
        if (response.status === 200) {
            Notification({ message: response.message, type: 'success' });
            await Localstorage.JWT_TOKEN.set(response.token);
            dispatch(saveAdminInfo(response.data));
            // router.push('/dashboard');
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.log(error);
        Notification({ message: 'An error occurred during login.', type: 'error' });

    } finally {
        dispatch(changeLoadingState(false));

    }
}

export const fetchAdminInfo = () => async (dispatch) => {
    const response = await routes.APIS.getAdminInfo();
    console.log("fetchAdminInfo***", response)
    dispatch(saveAdminInfo(response.data));
    return response;
}

export const UpdatePasswordByID = (id, data) => async (dispatch) => {
    try {
        // dispatch(changeLoadingState(true))
        console.log(id, data);
        const response = await routes.APIS.updatePasswordByID(id, data);
        console.log(response)
        if (response.status === 200) {
            Notification({ message: response.message, type: 'success' });
            dispatch(fetchFrenchiseInfo(id))
        } else {
            Notification({ message: response.message, type: 'error' });
        }
        return response;
    } catch (error) {
        console.log(error)

    } finally {
        // dispatch(changeLoadingState(false))
    }
}


export default adminSlice.reducer;
