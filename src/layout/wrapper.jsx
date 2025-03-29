import React, { Suspense, useEffect } from "react";
import ScrollToTop from "../hooks/scroll-to-top";
import { animationCreate } from "../utils/utils";
import HeaderTwo from "./headers/header-2";
import FooterThree from "./footers/footer-3";
import { Providers } from "../store/provider";
import Middleware from "../middleware/middleware";
import Loader from "./loader/loader";
import Spinner from "../common/loadable/Spinner/Spinner";

const Wrapper = ({ children }) => {
  useEffect(() => {
    // animation
    setTimeout(() => {
      animationCreate();
    }, 100);
  }, []);

  return (
    <>
      <Providers>
        <Middleware>
          <Loader>
            <Suspense fallback={<Spinner />}>
              {children}
              <ScrollToTop />
            </Suspense>

          </Loader>
        </Middleware>
      </Providers >

    </>
  );
};

export default Wrapper;
