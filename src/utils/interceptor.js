// import Router from "@/router";

// export default config => {
//   if (location.pathname != "/login") {
//     try {
//       const auth = localStorage.getItem("state");
//       const { access_token } = JSON.parse(auth).login.auth;
//       if (!config.headers.Authorization) {
//         config.headers.Authorization = `Bearer ${access_token}`;
//       }
//     } catch {
//       Router.push({ name: "login" });
//     }
//   }
//   return config;
// };
