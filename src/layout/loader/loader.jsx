'use client'

import Spinner from "@/src/common/loadable/Spinner/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Loader = ({ children }) => {
    const loading = useSelector((state) => state.customizer.loading);
    useEffect(() => {
        console.log('Wrapper loading state:', loading);
        if (loading) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [loading])

    return (
        <>
            {loading ? <Spinner /> : <></>}

            {children}
        </>
    )
};

export default Loader;
