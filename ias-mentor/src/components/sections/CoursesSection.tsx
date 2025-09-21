"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  {
    id: 1,
    title: "Regular PCM Batch",
    description: "Your one-year transformation starts here!",
    details: "A UPSC dream needs more than hard work - it needs the right mentorship, the right plan, and the right push. With 800+ hours of live classes, expert-curated study materials, and daily personalized mentorship, this is where your success begins!",
    link: "/courses",
  },
  {
    id: 2,
    title: "Hardcore PCM",
    description: "How far will you go for your UPSC dream?",
    details: "This is not just a course - it's a commitment to success, with unlimited access until you clear. Get in-depth Prelims, Mains, and Interview training with extended class hours, extra mentorship, language training, and continuous test series support.",
    link: "/courses",
  },
  {
    id: 3,
    title: "Mains Combat",
    description: "Write like a topper!",
    details: "Mains is not about knowing, it's about expressing! This program transforms your writing, strengthens your articulation, and builds your confidence with structured answer writing workshops, Mains test series, value addition modules, and expert feedback!",
    link: "/courses",
  },
  {
    id: 4,
    title: "Essay Mentorship",
    description: "Write like a topper!",
    details: "Complete essay writing mentorship with strategy orientation, step-by-step training on topic selection and structuring, and personalized one-to-one guidance. Focus on coherence, logical flow, and impactful conclusions.",
    link: "/book-online",
  },
];

export default function CoursesSection() {
  const router = useRouter();
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Oswald']">Our Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-['Oswald']">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mb-4">{course.description}</p>
                <p className="text-gray-600 text-sm">{course.details}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="p-0 text-primary hover:text-primary/80 font-semibold"
                  onClick={() => {
                    // Redirect to specific course page
                    router.push(course.link);
                  }}
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
