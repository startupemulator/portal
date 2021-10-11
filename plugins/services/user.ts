import { Strapi } from "@nuxtjs/strapi";

export function users($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
  users {
    id
    email  
  }
}`,
    });
    return data.users;
  };
}
export function getUserByEmail($strapi: Strapi) {
  return async (email: string) => {
    const data = await $strapi.graphql({
      query: `query {
  users (where: {email: "${email}"}) {
    id
    profile{
      id
      name
      slug
    }
    
  }
}`,
    });
    return data.users ? data.users[0] : null;
  };
}
export function createUser($strapi: Strapi) {
  return async (email: string, password: String) => {
    const data = await $strapi.graphql({
      query: `mutation {
        register(input: { username:"${email}" email: "${email}",  password: "${password}" }) {
          jwt
          user {
            id
            email
          }
        }
      }`,
    });
    return data || null;
  };
}
export function updateUserPassword($strapi: Strapi) {
  return async (
    password: string,
    oldPassword: string,
    passwordRepeat: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updatePassword( password: "${password}",
                        oldPassword: "${oldPassword}",
                        passwordRepeat: "${passwordRepeat}")
                        {
            status 
                  }
      }`,
    });
    return data.updatePassword ? data.updatePassword.status : null;
  };
}
export function createPassword($strapi: Strapi) {
  return async (password: string, passwordRepeat: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createPassword( password: "${password}",
        passwordRepeat: "${passwordRepeat}") {
            status 
                  }
      }`,
    });
    return data.createPassword ? data.createPassword.status : null;
  };
}
export function passwordType($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        changePasswordType{
          type
        }
      }`,
    });
    return data.changePasswordType ? data.changePasswordType : null;
  };
}

export function emailConfirmation($strapi: Strapi) {
  return async (token: string) => {
    const data = await $strapi.graphql({
      query: `mutation  {
        emailConfirmation(confirmation: "${token}"){
          jwt
          user{
            id
          }
        }
}`,
    });
    return data.emailConfirmation ? data.emailConfirmation : null;
  };
}
