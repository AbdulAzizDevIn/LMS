import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Course = () => {
    
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1TbgvkdZBvy7OTM4RM83SSHbUe9rMQCbEQw&s"
          alt=""
          className="w-full h-36 object-cover rounded-t-xl"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          JavaScript Complete Course 2025
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQH_2GnLD1PNLg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711562685136?e=1743033600&v=beta&t=20yHUhnO9e4PcwaPrBU-ZnMb0qusurhPJ0FNBwGDxpI" />
              <AvatarFallback>AZ</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Abdul Aziz</h1>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            Beginner
          </Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
