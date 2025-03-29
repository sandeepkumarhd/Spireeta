// import { notification } 
import { Localstorage } from './storage/Localstorage';
export class ApiException extends Error {
  constructor(message) {
    super(message);
  }
  // jwtExeception() {
  //   Cookies.remove('JWT_TOKEN');
  //   Cookies.remove('USER_ID');
  // }

  failfetch() {
    // notification.error({
    //     message : "Failed to handle Request !",
    //     maxCount : 20 ,
    //     placement : "top"
    // })
  }
}

export const apiGet = (url, baseURL) => {
  console.log("url, baseURL*****",url, baseURL)
  if (url) {
    const res = new Promise((resolve, reject) => {
      const token = Localstorage.JWT_TOKEN.get();

      fetch(`${baseURL}${url}`, {
        method: 'GET',
        headers: {
          // authorization: `Bearer ${Localstorage.JWT_TOKEN.get()}`,
          authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
        .then(async (response) => {
          if (response.status == 401) {
            // notification.error({
            //   message: 'Session Expired',
            //   maxCount: 20,
            //   placement: 'top',
            // });
            Localstorage.clear();
          }
          let res = await response.json();
          res.status = response?.status;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return res;
  }
};

export const apiPost = async (url, baseURL, values) => {
  // console.log(values);
  if (url) {
    return new Promise((resolve, reject) => {
      const token = Localstorage.JWT_TOKEN.get();
      // console.log(token)
      fetch(`${baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
          // authorization: `Bearer ${Localstorage.JWT_TOKEN.get(), console.log()}`,
          authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          if (response.status == 401) {
            // notification.error({
            //   message: 'Session Expired',
            //   maxCount: 20,
            //   placement: 'top',
            // });
            Localstorage.clear();
          }
          let res = await response.json();
          res.status = response.status;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export const apiPut = (url, baseURL, values) => {
  if (url) {
    return new Promise((resolve, reject) => {
      const token = Localstorage.JWT_TOKEN.get();

      fetch(`${baseURL}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // authorization: `Bearer ${Localstorage.JWT_TOKEN.get()}`,
          authorization: `Bearer ${token}`,

        },
        credentials: 'include',
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          if (response.status == 401) {
            // notification.error({
            //   message: 'Session Expired',
            //   maxCount: 20,
            //   placement: 'top',
            // });
            Localstorage.clear();
          }
          let res = await response.json();
          res.status = response.status;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export const apiDelete = (url, baseURL) => {
  if (url) {
    return new Promise((resolve, reject) => {
      const token = Localstorage.JWT_TOKEN.get();

      fetch(`${baseURL}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // authorization: `Bearer ${Localstorage.JWT_TOKEN.get()}`,
          authorization: `Bearer ${token}`,

        },
        credentials: 'include',
      })
        .then(async (response) => {
          if (response.status == 401) {
            // notification.error({
            //   message: 'Session Expired',
            //   maxCount: 20,
            //   placement: 'top',
            // });
            Localstorage.clear();
          }
          let res = await response.json();
          res.status = response.status;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export const apiPostImage = async (url, baseURL, values) => {
  if (url) {
    return new Promise((resolve, reject) => {
      // const token = Localstorage.JWT_TOKEN.get();

      fetch(`${baseURL}${url}`, {
        method: 'POST',
        // headers: {
        //   // authorization: `Bearer ${Localstorage.JWT_TOKEN.get()}`,
        //   authorization: `Bearer ${token}`,

        // },
        body: values,
        credentials: 'include',
      })
        .then(async (response) => {
          console.log(response);
          // if (response.status == 401) {
          //   throw new ApiException('JWT error').jwtExeception();
          // }
          let res = await response.json();
          res.status = response.status;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
