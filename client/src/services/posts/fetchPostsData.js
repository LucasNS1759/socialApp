import axios from "axios";

const fetchPostsData = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/post/all?page=${pageParam}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export default fetchPostsData;