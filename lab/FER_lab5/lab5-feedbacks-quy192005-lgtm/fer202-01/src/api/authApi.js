import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const loginUser = async ({ email, password }) => {
  const response = await axios.get(`${BASE_URL}/users`, {
    params: {
      email: email.trim(),
    },
  });

  const user = response.data.find(
    (item) =>
      String(item.password) === String(password)
  );

  return user || null;
};