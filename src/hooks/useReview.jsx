import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useReview = () => {
    
    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/reviews');
            return res.data
        }
    })
    return [review, refetch]
};

export default useReview;