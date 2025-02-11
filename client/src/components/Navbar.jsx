import { Menu, School } from "lucide-react";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DarkMode } from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");

      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <>
      <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50">
        {/*Desktop*/}
        <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
          <div
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <School size={30} />
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-Learning
            </h1>
          </div>
          {/*User icon and dark mode icon*/}
          <div className="flex items-center gap-8">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to="my-learning">
                      <DropdownMenuItem>My Learning</DropdownMenuItem>
                    </Link>
                    <Link to="profile">
                      <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                    </Link>

                    <Button
                      onClick={logoutHandler}
                      variant="outline"
                      className="w-full text-left px-4 py-2"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        Log out
                      </DropdownMenuItem>
                    </Button>
                  </DropdownMenuGroup>
                  {user.role === "instructor" && (
                    <div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button
                          onClick={() => navigate("/admin/dashboard")}
                          className="w-full text-left px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white" // Adjust styles as needed
                        >
                          Dashboard
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => navigate("/admin/course")}
                          className="w-full text-left px-4 py-2  bg-blue-500 hover:bg-blue-400 text-white" // Adjust styles as needed
                        >
                          Courses
                        </Button>
                      </DropdownMenuItem>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/login")}>Signup</Button>
              </div>
            )}
            <DarkMode />
          </div>
        </div>
        {/*Mobile device*/}
        <div className="flex md:hidden items-center justify-between px-4 h-full">
          <h1 className="font-extrabold" onClick={() => navigate("/")}>
            E-Learning
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="rounded-full" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader className="flex flex-row items-center justify-between">
                <SheetTitle>E-Learning</SheetTitle>
                <DarkMode />
              </SheetHeader>

              {user ? (
                <>
                  <nav className="flex flex-col space-y-4">
                    <Button variant="outline">
                      <Link
                        to="my-learning"
                        className="hover:text-blue-500 transition-colors duration-200"
                      >
                        My Learning
                      </Link>
                    </Button>

                    <Button variant="outline">
                      <Link
                        to="profile"
                        className="hover:text-blue-500 transition-colors duration-200"
                      >
                        Edit Profile
                      </Link>
                    </Button>

                    <Button
                      onClick={logoutHandler}
                      className="hover:text-blue-500 transition-colors duration-200"
                    >
                      Log out
                    </Button>
                  </nav>

                  {user?.role === "instructor" && (
                    <SheetFooter className="gap-2 ">
                      <SheetClose asChild>
                        <Button
                          className="w-full text-left px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white"
                          onClick={() => navigate("/admin/dashboard")}
                        >
                          Dashboard
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          className="w-full text-left px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white"
                          onClick={() => navigate("/admin/course")}
                        >
                          Course
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  )}
                </>
              ) : (
                <nav className="flex flex-col space-y-4 mt-4">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/login")}
                      className="w-full"
                    >
                      Login
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      onClick={() => navigate("/login")}
                      className="w-full"
                    >
                      Signup
                    </Button>
                  </SheetClose>
                </nav>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Navbar;
