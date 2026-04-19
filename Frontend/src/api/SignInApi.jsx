import axios from "axios";

export const signInUser = async (serverURL, payload) => {
  try {
    const response = await axios.post(
      `${serverURL}/api/auth/signin`,
      payload,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};