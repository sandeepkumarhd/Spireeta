import Link from "next/link";
import React from "react";
import superMenuData from "./superMenuData";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { changeLoadingState } from "@/src/store/customizer/CustomizerSlice";
import Localstorage from "@/src/utils/storage/Localstorage";
import Notification from "@/src/common/Notification";

const superNavMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      dispatch(changeLoadingState(true));

      Localstorage.clear();
      // notification.success({
      //   message: "Logout Successful",
      //   placement: "top"
      // })
      Notification({ message: "Logout Successful", type: 'success' });

      router.replace('/login');

    } catch (error) {
      console.log(error)
      // notification.error({
      //   message: "Something went wrong",
      //   placement: "top"
      // })
      Notification({ message: "Something went wrong", type: 'error' });
    } finally {
      dispatch(changeLoadingState(false));
    }
  }
  return (
    <>
      <ul>
        {superMenuData.map((menu_item, i) => (
          <li
            key={i}
            className={`${menu_item?.has_dropdown && "has-dropdown"}`}
          >
            {menu_item.title === "Logout" ? (
              <a
                href="#"
                onClick={handleLogout}
                className="d-block d-lg-none" // Show only on mobile (d-lg-none)
              >
                <span></span>
                {menu_item.title}
              </a>
            ) : (
              <Link href={menu_item.link}>
                <span></span>
                {menu_item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default superNavMenu;
