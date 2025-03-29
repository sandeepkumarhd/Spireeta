import HomeIcon from "@/src/svg/home-icon";

const menu_data = [
  {
    id: 1,
    mega_menu: false,
    has_dropdown: false,
    home_icon: <HomeIcon />,
    title: "Home",
    link: "/",
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
    title: "About",
    link: "/about",
    active: "",
  },   
  {
    id: 3,
    mega_menu: false,
    has_dropdown: false,
    title: "Products",
    link: "/service",
    active: "",

  },


  {
    id: 4,
    mega_menu: false,
    has_dropdown: false,
    title: "Empowerment",
    link: "/empowerment",
    active: "",
   
  },
  {
    id: 5,
    mega_menu: false,
    has_dropdown: false,
    title: "Career",
    link: "/career",
    active: "",
  },
  {
    id: 6,
    mega_menu: false,
    has_dropdown: false,
    title: "Contact",
    link: "/contact",
    active: "",
  },
  

];
export default menu_data;
