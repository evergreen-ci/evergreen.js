import { client, queryString } from "./evergreen";

test("Evergreen client is constructed correctly", () => {
  const user = "me";
  const key = "abc123";
  const serverURL = "www.example.com";
  const webURL = "www.example.com";
  const evergreen = new client(serverURL, webURL, user, key);

  expect(evergreen.username).toBe(user);
  expect(evergreen.key).toBe(key);
  expect(evergreen.apiURL).toBe(serverURL);
});

test("query strings are formed correctly", () => {
  const params1 = {
    param1: "val1",
    param2: true,
    param3: 55,
  };
  expect(queryString(params1)).toBe("?param1=val1&param2=true&param3=55");

  const params2 = {
    undefined: undefined,
    null: null,
  } as any;
  expect(queryString(params2)).toBe("");

  expect(queryString({})).toBe("");
});
