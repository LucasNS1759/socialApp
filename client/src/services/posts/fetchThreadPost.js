import axios from "axios";

const fetchThreadPost = async ({id}) => {
console.log(id)
    try {
        const response = await axios.get(`http://localhost:3001/post/thread/${id}?page=1`, { withCredentials: true })
        console.log(response)
        return response.data
    } catch (error) {
        console.error(error);
    }

}

export default fetchThreadPost