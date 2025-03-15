import fetchThreadPost from "../services/posts/fetchThreadPost";

import { useInfiniteQuery } from "@tanstack/react-query";

const useThreadPost = (id,currentView) => {
    return useInfiniteQuery({
        queryKey: ['ThreadPost',currentView],
        queryFn:  ({ pageParam = 1 }) => fetchThreadPost({ pageParam,id }),
        getNextPageParam: (lasPage) => lasPage.nextPage
    })
}


export default useThreadPost 