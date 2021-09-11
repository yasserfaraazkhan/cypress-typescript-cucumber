import { tokenAuthMutation } from "../mutationResources/mutatuions";

let authorization: string = "";

Cypress.Commands.add("loginViaAPI", () => {
  return cy
    .request({
      url: Cypress.env("requestUrl"),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        operationName: tokenAuthMutation.operationName,
        query: tokenAuthMutation.query,
        variables: tokenAuthMutation.variables,
      },
    })
    .then((response) => {
      const { token } = response.body.data.tokenAuth.token;
      authorization = `JWT ${token}`;
      return authorization;
    });
});
