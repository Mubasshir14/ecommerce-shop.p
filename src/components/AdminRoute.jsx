import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import axios from 'axios';

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
                console.log(response.data);

                const foundUser = response.data.find(u => u.email === user?.email);

                if (foundUser && foundUser.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }

            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsAdminLoading(false);
            }
        };

        if (user) {
            fetchAdmin();
        }
    }, [user]);


    if (loading || isAdminLoading) {
        return <Loader />;
    }

    if (user && isAdmin) {
        return children;
    }

    if (user && !isAdmin) {
        logOut();
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
