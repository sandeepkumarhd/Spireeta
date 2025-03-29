import HomeIcon from "@/src/svg/home-icon";

const superMenuData = [
    {
        id: 1,
        mega_menu: false,
        has_dropdown: false,
        home_icon: <HomeIcon />,
        title: "Registrations Enquiry",
        link: "/dashboard/registrations-enquiry",
        active: "",
        // sub_menus: [ 
        //   { link: "/", title: "Home 1" },
        //   { link: "/home-2", title: "Home 2" },
        //   { link: "/home-3", title: "Home 3" }, 
        // ],
    },
    {
        id: 2,
        mega_menu: false,
        has_dropdown: false,
        title: "Enrolled Students",
        link: "/dashboard/enrolled-students",
        active: "",
    },
    {
        id: 3,
        mega_menu: false,
        has_dropdown: false,
        title: "Employee Registrations",
        link: "/dashboard/employee-registrations",
        active: "",
    },
    {
        id: 4,
        mega_menu: false,
        has_dropdown: false,
        title: "Logout",
        link: "#",
        active: "",
    },

];
export default superMenuData;
