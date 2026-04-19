import axios from "axios";

export const signUpUser = async (serverURL, payload) => {
  try {
    const response = await axios.post(
      `${serverURL}/api/auth/signup`,
      payload,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};