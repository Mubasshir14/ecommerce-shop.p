import { Navigate, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Loader from "../components/Loader"


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    const navigate = useNavigate();

    if (loading) return <Loader />
    if (user) return children
    return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
