import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from "./Pages/Home";
import { Signin } from "./Pages/signin";
import { Signup } from "./Pages/signup";
const router=createBrowserRouter([
  {
    path:"/signup",element:<Signup></Signup>
  },
  {
    path:"/signin",element:<Signin></Signin>
  },
  {
    path:"/home",element:<Home></Home>
  },
   { path: "/", element: <Signup /> },
])
function App() {
  

  return (
    <div>
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
