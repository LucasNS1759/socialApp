import fetchPostsData from "../services/posts/fetchPostsData";
import { useInfiniteQuery } from "@tanstack/react-query";
const usePosts = () => {
    return useInfiniteQuery({
        queryKey: ['allPosts'],
        queryFn: ({ pageParam = 1 }) => fetchPostsData({ pageParam }),
        getNextPageParam: (lasPage) => lasPage.nextPage
    })
}

export default usePosts