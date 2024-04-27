export type Routes = {
  [key: string]: string;
};

const routes: Routes = {
  "/": "Home",
  "/login": "Login",
  "/admin": "Dashboard | Admin panel",
  "/admin/login": "Login | Admin panel",
  "/employee": "Dashboard | Employee panel",
  "/employee/login": "Login | Employee panel",
};

export default routes;
