import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import UploadForm from "../../pages/uploadForm/UploadForm";
import Home from "../../pages/home/Home";
import BlogDetails from "../../pages/blogDetails/BlogDetails";
import HomeContent from "../homeContent/HomeContent";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AboutUs from "../aboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/signup',
        element: <Signup></Signup>

      },
      {
        path:'/about-us',
        element:<AboutUs></AboutUs>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/',
        element: <Home></Home>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: '/docs/blog/details/:id',
            element: <BlogDetails></BlogDetails>,
            // loader: ({ params }) => fetch(`http://localhost:5000/docs/blog/${params?.id}`)
            loader: ({ params }) => fetch(`https://syntax-high-lighter-server.vercel.app/docs/blog/${params?.id}`)
          },
          {
            path: '/',
            element: <HomeContent></HomeContent>
          }
        ]
      },
      {
        path: '/upload',
        element: <PrivateRoute><UploadForm></UploadForm></PrivateRoute>
      },


    ]
  },
]);

export default router;