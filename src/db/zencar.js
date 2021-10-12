// import fetch from "node-fetch";

// const token =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6ZW4uY2FyIiwic3ViIjoiYXV0aCIsImlhdCI6MTYzMzY3OTcyOS4xNjIsImlkIjoxMjUsInJvbGVzIjpbIkNMSUVOVCJdLCJ0eXBlIjoiY2xpZW50IiwibWV0aG9kIjoiQVVUSEVOVElDQVRFX0JZX0NPREUiLCJleHAiOjE2Mzg4NjM3MjkuMTYyfQ.T3uzsaKXyjH5B3r7PosvBgrppvRP2SfiqaCDwrAWac4";

// const asdasd = (authorization) => {
//   return fetch("https://zencar-backend-dev.dev.zen.car/graphql", {
//     headers: {
//       authorization,
//       "content-type": "application/json",
//       "sec-fetch-mode": "cors",
//     },
//     body: `{"query":"query { client (where:{}) { id name { first last middle } phone createdAt updatedAt photos { id objectId objectType objectProperty filename mimetype encoding file { url path } } } }"}`,
//     method: "POST",
//     mode: "cors",
//     credentials: "include",
//   }).then((data) => data.json());
// };