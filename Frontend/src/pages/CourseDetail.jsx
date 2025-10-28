import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { Clock, Users, Star, BookOpen, CheckCircle2 } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();

  const course = {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Sarah Johnson",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites",
    longDescription: "This comprehensive course will take you from beginner to confident web developer. You'll learn the core technologies that power the web, build real projects, and gain the skills needed to start your career in web development.",
    students: 1234,
    duration: "8 weeks",
    rating: 4.8,
    level: "Beginner",
    lessons: [
      { id: 1, title: "Introduction to HTML", duration: "45 min", completed: false },
      { id: 2, title: "CSS Basics", duration: "60 min", completed: false },
      { id: 3, title: "JavaScript Fundamentals", duration: "90 min", completed: false },
      { id: 4, title: "Building Your First Website", duration: "120 min", completed: false }
    ],
    assignments: [
      { id: 1, title: "Create a Personal Portfolio", dueDate: "Week 2" },
      { id: 2, title: "Build a Responsive Layout", dueDate: "Week 4" },
      { id: 3, title: "Interactive JavaScript Quiz", dueDate: "Week 6" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">{course.level}</Badge>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">{course.description}</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{course.longDescription}</p>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">What you'll learn:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                          <span>Build responsive websites using HTML and CSS</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                          <span>Create interactive web applications with JavaScript</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                          <span>Understand web development best practices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                          <span>Deploy your projects to the web</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="lessons" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>{course.lessons.length} lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="assignments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>{course.assignments.length} assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.assignments.map((assignment) => (
                        <div key={assignment.id} className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20 shadow-medium">
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">{course.instructor}</h4>
                  <p className="text-sm text-muted-foreground">Web Development Expert</p>
                </div>
                <Button className="w-full">Enroll Now</Button>
                <Link to="/auth">
                  <Button variant="outline" className="w-full">Sign in to Enroll</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
