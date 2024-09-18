import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import AddProduct from './Dashboard/AddProduct.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import ShopDashboard from './components/ShopDashboard.jsx';
import TShirt from './components/TShirt.jsx';
import Shirt from './components/Shirt.jsx';
import Polo from './components/Polo.jsx';
import Shorts from './components/Shorts.jsx';
import Jeans from './components/Jeans.jsx';
import Tracksuits from './components/Tracksuits.jsx';
import Blazers from './components/Blazers.jsx';
import Jersey from './components/Jersey.jsx';
import Sharee from './components/Sharee.jsx';
import Gawn from './components/Gawn.jsx';
import Kameez from './components/Kameez.jsx';
import Casual from './components/Casual.jsx';
import Formal from './components/Formal.jsx';
import Party from './components/Party.jsx';
import Gym from './components/Gym.jsx';
import Profile from './components/Profile.jsx';
import Search from './components/Search.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import UserCart from './components/UserCart.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import ManageProducts from './Dashboard/ManageProducts.jsx';
import UpdateProduct from './Dashboard/UpdateProduct.jsx';
import ManageUsers from './Dashboard/ManageUsers.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import CheckOut from './components/CheckOut.jsx';
import Payment from './components/Payment.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';
import MyOrders from './components/MyOrders.jsx';
import ManageOrder from './Dashboard/ManageOrder.jsx';
import OrderDetails from './Dashboard/OrderDetails.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Notification from './components/Notification.jsx';
import TopSelling from './components/TopSelling.jsx';
import NewArrival from './components/NewArrival.jsx';
const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '/shop',
        element: <ShopDashboard />
      },
      {
        path: '/tshirt',
        element: <TShirt />
      },
      {
        path: '/shirt',
        element: <Shirt />
      },
      {
        path: '/polo',
        element: <Polo />
      },
      {
        path: '/shorts',
        element: <Shorts />
      },
      {
        path: '/jeans',
        element: <Jeans />
      },
      {
        path: '/tracsuits',
        element: <Tracksuits />
      },
      {
        path: '/blazers',
        element: <Blazers />
      },
      {
        path: '/jersey',
        element: <Jersey />
      },
      {
        path: '/sharees',
        element: <Sharee />
      },
      {
        path: '/gawn',
        element: <Gawn />
      },
      {
        path: '/kameez',
        element: <Kameez />
      },
      {
        path: '/casual',
        element: <Casual />
      },
      {
        path: '/formal',
        element: <Formal />
      },
      {
        path: '/party',
        element: <Party />
      },
      {
        path: '/gym',
        element: <Gym />
      },
      {
        path: '/shop',
        element: <ShopDashboard />
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: '/orders',
        element: <PrivateRoute><MyOrders /></PrivateRoute>
      },
      {
        path: '/cart',
        element: <PrivateRoute><UserCart /></PrivateRoute>
      },
      {
        path: '/checkout',
        element: <PrivateRoute><CheckOut /></PrivateRoute>
      },
      {
        path: '/payment',
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
      {
        path: '/payment-success',
        element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
      },

      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/new-arrival',
        element: <NewArrival />
      },
      {
        path: '/top-selling',
        element: <TopSelling />
      },

      {
        path: '/add-product',
        element: <PrivateRoute><AdminRoute><AddProduct /></AdminRoute></PrivateRoute>
      },
      {
        path: '/update/:id',
        element: <PrivateRoute><AdminRoute><UpdateProduct /></AdminRoute></PrivateRoute>,
      },
      {
        path: '/manage-product',
        element: <PrivateRoute><AdminRoute><ManageProducts /></AdminRoute></PrivateRoute>
      },
      {
        path: '/manage-order',
        element: <PrivateRoute><AdminRoute><ManageOrder /></AdminRoute></PrivateRoute>
      },
      {
        path: '/manage-user',
        element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
      },
      {
        path: '/payment/:tnxID',
        element: <PrivateRoute><AdminRoute><OrderDetails /></AdminRoute></PrivateRoute>
      },
      { path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      {
        path: '/notifications',
        element: <PrivateRoute>
          <Notification  />
        </PrivateRoute>
      },
    ]
  },

  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <Elements stripe={stripePromise}>
            <RouterProvider router={router} />
          </Elements>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
)
