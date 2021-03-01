import { Middleware } from "@nuxt/types";

const denyAuthenticated: Middleware = (context) => {
  const { $strapi, redirect } = context;
  if ($strapi.user) {
    redirect("/");
  }
};

export default denyAuthenticated;
