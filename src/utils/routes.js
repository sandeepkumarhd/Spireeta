'use client'
import { apiDelete, apiGet, apiPost, apiPostImage, apiPut } from "./Api";
import Localstorage from "./storage/Localstorage";


// const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const baseURL = 'http://localhost:5000'

// console.log("baseURL***", baseURL)

export const routes = {
    BASE_PATH: `${baseURL}`,
    APIS: {
        login: async (data) => {
            return await apiPost("/login", routes.BASE_PATH, data)
        },
        getAdminInfo: async () => {
            return await apiGet("/", routes.BASE_PATH)
        },
        updateAdminInfo: async (data) => {
            return await apiPut(`/updatePasswordByID`, routes.BASE_PATH, data)
        },
        resetPassword: async (data) => {
            return await apiPost("/reset-password", routes.BASE_PATH, data)
        },
        resetPasswordUsingLink: async (data) => {
            return await apiPost("/reset-password-using-link", routes.BASE_PATH, data)
        },
        AddEnquiry: async (data) => {
            return await apiPost("/createEnquiry", routes.BASE_PATH, data)
        },
        getAllEnquiry: async () => {
            return await apiGet("/getEnquiry", routes.BASE_PATH)
        },
        getAllDeletedEnquiry: async () => {
            return await apiGet("/getAllDeletedEnquiry", routes.BASE_PATH)
        },
        softDeleteEnquiry: async (data) => {
            return await apiPost("/softDeleteEnquiry", routes.BASE_PATH, data)
        },
        restoreEnquiry: async (data) => {
            return await apiPost("/restoreEnquiry", routes.BASE_PATH, data)
        },
        permenantlyDeleteEnquiry: async (data) => {
            return await apiPost("/permanentDeleteEnquiry", routes.BASE_PATH, data)
        },
        createStudents: async (data) => {
            return await apiPost("/createStudent", routes.BASE_PATH, data)
        },
        FetchEnrollStudent: async () => {
            return await apiGet("/getStudents", routes.BASE_PATH)
        },
        getStudentById: async (id) => {
            return await apiGet(`/getStudentById/${id}`, routes.BASE_PATH)
        },
        updateStudent: async (id, data) => {
            return await apiPut(`/updateStudent/${id}`, routes.BASE_PATH, data)
        },
        getAllDeletedStudents: async () => {
            return await apiGet("/getAllDeletedStudents", routes.BASE_PATH)
        },
        restoreStudent: async (data) => {
            return await apiPost("/restoreStudent", routes.BASE_PATH, data)
        },
        softdeleteStudent: async (data) => {
            return await apiPost("/softdeleteStudent", routes.BASE_PATH, data)
        },
        permanentDeleteStudents: async (data) => {
            return await apiPost("/permanentDeleteStudents", routes.BASE_PATH, data)
        },
        createEmployee: async (data) => {
            return await apiPost("/createEmployee", routes.BASE_PATH, data)
        },
        getEmployees: async () => {
            return await apiGet("/getEmployees", routes.BASE_PATH)
        },
        getDeletedEmployees: async () => {
            return await apiGet("/getDeletedEmployees", routes.BASE_PATH)
        },
        getEmployeebyid: async (id) => {
            return await apiGet(`/getEmployeebyid/${id}`, routes.BASE_PATH)
        },
        updateEmployee: async (id, data) => {
            return await apiPut(`/updateEmployee/${id}`, routes.BASE_PATH, data)
        },
        softDeleteEmployeee: async (data) => {
            return await apiDelete(`/softDeleteEmployeee`, routes.BASE_PATH, data)
        },
        permanentDeleteEmployee: async (data) => {
            return await apiPost(`/permanentDeleteEmployee`, routes.BASE_PATH, data)
        },
        createGeneralController: async (data) => {
            return await apiPost(`/createGeneralController`, routes.BASE_PATH, data)
        },
    }
}

export default routes;