import { fetchAdminInfo } from '../store/AllSlices/admin.slice';
import Localstorage from '../utils/storage/Localstorage'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export default function Middleware({ children }) {
    const userDetails = useSelector((state) => state.adminReducer.adminInfo);
    // console.log("userDetails middleware", userDetails)
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname()

    // console.log("router.pathname middleware", pathname)
    // console.log("middleeare called^^^^")

    useEffect(() => {
        async function fetchData() {
            const response = await dispatch(fetchAdminInfo());
            return response;
        }

        const token = Localstorage.JWT_TOKEN.get();

        // const currentRoute = router.pathname;
        const currentRoute = pathname;
        // console.log("currentRoute middleware", currentRoute)
        const isDashboardRoute = currentRoute?.startsWith('/dashboard') || currentRoute === '/dashboard';

        const protectedRoutes = [
            '/dashboard-home',
            '/dashboard/:path*',
            '/dashboard*',
            '/dashboard-*',
        ];

        if (!token && (isDashboardRoute || protectedRoutes.includes(currentRoute))) {
            router.push('/login');
            return;
        }

        if (!userDetails?._id && (isDashboardRoute || protectedRoutes.includes(currentRoute))) {
            fetchData().then((response) => {
                if (response.status !== 200) {
                    router.push('/login');
                }
            });
        }
    }, [dispatch, userDetails?._id, router, pathname]);

    return children;
}
