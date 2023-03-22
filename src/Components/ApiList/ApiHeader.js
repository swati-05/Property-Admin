export default function ApiHeader() {
  let token2 = window.localStorage.getItem("token");
  const header = {
    // timeout: 1,
    timeout: 60000,
    headers: {
      Authorization: `Bearer ${token2}`,
      Accept: "application/json",
    },
  };
  return header;
}
