// 'use client'
// import React from 'react';
// import Wrapper from '@/src/layout/wrapper';
// import SEO from '@/src/common/seo';
// import ResetPassword from '@/src/components/superAdminComponents/resetpassword';

// const index = () => {
//     return (
//         <Wrapper>
//             <SEO pageTitle={"Reset password"} />
//             <ResetPassword />
//         </Wrapper>
//     );
// };

// export default index;
// src/pages/reset-password/[userId]/[token].js
// 'use client'
// import SEO from '@/src/common/seo';
// import ResetPassword from '@/src/components/superAdminComponents/resetpassword';
// import Wrapper from '@/src/layout/wrapper';

// const ResetPasswordPage = () => {
//     return (
//         <Wrapper>
//             <SEO pageTitle={"Reset password"} />
//             <ResetPassword />
//         </Wrapper>
//     );
// };

// export default ResetPasswordPage;

// 'use client'
// import SEO from '@/src/common/seo';
// import ResetPassword from '@/src/components/superAdminComponents/resetpassword';
// import Wrapper from '@/src/layout/wrapper';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const ResetPasswordPage = () => {
//     const router = useRouter();
    
//     useEffect(() => {
//         console.log("🟢 ROUTER QUERY:", router.query);
//         if (!router.isReady) return;
        
//         const { userId, token } = router.query;
//         console.log("🟢 EXTRACTED PARAMS:", { userId, token });
        
//         if (!userId || !token) {
//             console.log("🔴 MISSING PARAMS IN URL");
//             // Optional: redirect to error page
//         }
//     }, [router.isReady, router.query]);

//     return (
//         <Wrapper>
//             <SEO pageTitle={"Reset password"} />
//             <ResetPassword />
//         </Wrapper>
//     );
// };

// export default ResetPasswordPage;

'use client'
import SEO from '@/src/common/seo';
import ResetPassword from '@/src/components/superAdminComponents/resetpassword';
import Wrapper from '@/src/layout/wrapper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ResetPasswordPage = () => {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        const { userId, token } = router.query;
        console.log("🟢 EXTRACTED PARAMS:", { userId, token });

        if (userId && token) {
            setUserId(userId);
            setToken(token);
        } else {
            console.log("🔴 MISSING PARAMS IN URL");
            // Optionally redirect to an error page
            // router.push('/error');
        }
    }, [router.isReady]);

    return (
        <Wrapper>
            <SEO pageTitle={"Reset password"} />
            {/* Pass userId and token as props */}
            <ResetPassword userId={userId} token={token} />
        </Wrapper>
    );
};

export default ResetPasswordPage;
