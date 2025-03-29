import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import React from "react";
import FooterThree from "@/src/layout/footers/footer-3";
import HeaderTwo from "@/src/layout/headers/header-2";
import CommentForm from "@/src/forms/comment-form";

const Empowerment = () => {
    return (
        <>
            <HeaderTwo />
            <main>
                <Breadcrumb top_title="Empowerment" page_title="Empowerment" />
                <div className="container py-5">
                <div className="postbox__comment-form reg-form">
                    <h3 className="postbox__comment-form-title">Registration form</h3>
                    <hr/>
                    <CommentForm />
                    <p className="ajax-response"></p>
                </div>
                </div>

    
            </main>
            <FooterThree />
        </>
    );
};

export default Empowerment;
