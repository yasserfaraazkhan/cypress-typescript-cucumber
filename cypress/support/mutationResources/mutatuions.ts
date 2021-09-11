export const tokenAuthMutation = {
  operationName: "tokenAuthMutation",
  query: `mutation tokenAuthMutation($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {    token    username    isSuperuser: isAdmin    userRole    __typename  }}`,
  variables: {
    username: Cypress.env("username"),
    password: Cypress.env("password"),
  },
};
