import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Hero from "./pages/student/Hero";
import Navbar from "./components/Navbar";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <Courses/> 
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning/>
      },
      {
        path: "profile",
        element: <Profile/>
      }
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}/>
    </main>
  );
}

export default App;
