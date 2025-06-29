import axios from "axios";
export const getChat = async (rideId, userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/chat/${rideId}/${userId}`
    );
    console.log("Chat messages fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};
