import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useNotifications = () => {
    const { user } = useAuth();

    const { refetch, data: notifications = [] } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const res = await axios.get('https://ecommerce-shop-p-server.onrender.com/notifications');
            return res.data;
        },
    });
    const userNotifications = notifications.filter(notification => notification.userID === user?.email);

    return [userNotifications, refetch];
};

export default useNotifications;
