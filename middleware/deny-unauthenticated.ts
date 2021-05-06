import { Middleware } from "@nuxt/types";

const denyUnauthenticated: Middleware = (context) => {
  const { $strapi, redirect } = context;
  if (!$strapi.user) {
    redirect("/login");
  }
};

export default denyUnauthenticated;
