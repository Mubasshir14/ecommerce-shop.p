import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useReview = () => {
    
    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axios.get('https://ecommerce-shop-p-server.onrender.com/reviews');
            return res.data
        }
    })
    return [review, refetch]
};

export default useReview;