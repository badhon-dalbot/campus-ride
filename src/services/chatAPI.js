import axios from "axios";
export const getChat = async (bookingId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/chat/${bookingId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};
