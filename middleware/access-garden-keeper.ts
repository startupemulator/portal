import { Middleware } from "@nuxt/types";

const accessGardenKeeper: Middleware = async (context) => {
  const { $strapi, redirect } = context;
  try {
    if ($strapi.user) {
      const profile = await $strapi.graphql({
        query: `query {
          profiles(where:{user:{id: "${$strapi.user.id}"}}) {
            id
            gardenkeeper        
          }
        }`,
      });
      if (!profile.profiles[0].gardenkeeper) {
        redirect("/");
      }
    } else redirect("/login");
  } catch (e) {
    console.error(e);
  }
};
export default accessGardenKeeper;
