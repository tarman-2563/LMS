import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Clock, Users, Star } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Sarah Johnson",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript",
      students: 1234,
      duration: "8 weeks",
      rating: 4.8,
      level: "Beginner"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      instructor: "Mike Chen",
      description: "Master advanced React concepts and design patterns",
      students: 856,
      duration: "6 weeks",
      rating: 4.9,
      level: "Advanced"
    },
    {
      id: 3,
      title: "Data Science with Python",
      instructor: "Dr. Emily Rodriguez",
      description: "Explore data analysis, visualization, and machine learning",
      students: 2103,
      duration: "10 weeks",
      rating: 4.7,
      level: "Intermediate"
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Turner",
      description: "Create beautiful and user-friendly interfaces",
      students: 1567,
      duration: "5 weeks",
      rating: 4.8,
      level: "Beginner"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-muted-foreground">
            Discover courses taught by industry experts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>by {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/course/${course.id}`} className="w-full">
                  <Button className="w-full">View Course</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
