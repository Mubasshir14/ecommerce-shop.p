import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from 'axios';

const useAdmin = () => {
    const { user } = useAuth();

    // UseQuery to check if the current user is an admin
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) return null; // Make sure user is logged in
            
            const res = await axios.get(`http://localhost:5000/users/${user.email}`);
            
            // Check if the fetched user has a role of 'admin'
            return res.data?.role === 'admin';
        }
    });
    
    return [isAdmin, isAdminLoading];
};

export default useAdmin;






// const { data: isAdmin , isPending: isAdminLoading} = useQuery({
    //     queryKey: [user?.email, 'isAdmin'],
    //     queryFn: async () => {
    //         const res = await axios.get(`http://localhost:5000/users/${user.email}`);
    //         console.log(res.data);
    //         return res.data?.admin;
    //     }
    // })

