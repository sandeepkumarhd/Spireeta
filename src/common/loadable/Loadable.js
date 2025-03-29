// import React, { Suspense } from "react";
// import Spinner from "./Spinner/Spinner";

// const Loadable = (Component) => (props) =>
// (
//   <Suspense fallback={<Spinner />}>
//     <Component {...props} />
//   </Suspense>
// );

// export default Loadable;

import React, { Suspense } from "react";
import Spinner from "./Spinner/Spinner";

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

  // Setting a display name for the Loadable component
  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;

  return LoadableComponent;
};

export default Loadable;

