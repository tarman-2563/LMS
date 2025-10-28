import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { BookOpen, Users, Award, Video } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Rich Course Content",
      description: "Access comprehensive courses with video lectures and assignments"
    },
    {
      icon: Users,
      title: "Interactive Learning",
      description: "Engage with instructors and peers through real-time chat"
    },
    {
      icon: Video,
      title: "Video Lectures",
      description: "Learn at your own pace with high-quality video content"
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Monitor your learning journey and achieve your goals"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container relative py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Learn Without
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Limits
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Join EduNexus and unlock your potential with expert-led courses, 
                interactive assignments, and a vibrant learning community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Learning Today
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Students learning together" 
                className="relative rounded-3xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and resources for an exceptional learning experience
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-border shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="gradient-hero text-white shadow-large">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of learners already achieving their goals with EduNexus
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary">
                  Create Your Free Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;
