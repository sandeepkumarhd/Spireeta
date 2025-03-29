// 'use client'
// import React from 'react';
// // import HeaderOne from '@/src/layout/headers/header';
// import ResetPasswordForm from './resetPasswordForm';


// const ResetPass = () => {
//     return (
//         <>
//             <main>
//                 <ResetPasswordForm  userId={userId} token={token}  />
//             </main>
//             {/* <FooterThree /> */}
//         </>
//     );
// };

// export default ResetPass;

'use client'
import ResetPasswordForm from './resetPasswordForm';

const ResetPass = ({ userId, token }) => {
    return (
        <main>
            {/* Pass userId & token to ResetPasswordForm */}
            <ResetPasswordForm userId={userId} token={token} />
        </main>
    );
};

export default ResetPass;
