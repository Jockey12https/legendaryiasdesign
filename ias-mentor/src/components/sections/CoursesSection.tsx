"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  {
    id: 1,
    title: "HSC",
    description: "Comprehensive Preparation for Civil Services",
    details: "Explore our specialized IAS Foundation Course designed to equip aspirants with the necessary knowledge and skills to excel in the UPSC examinations.",
    link: "#",
  },
  {
    id: 2,
    title: "GED",
    description: "Personalized Guidance for Optional Subjects",
    details: "Discover our tailored coaching for optional subjects, delivered by experienced mentors to enhance your preparation and performance.",
    link: "#",
  },
  {
    id: 3,
    title: "ESL",
    description: "Effective Test Series for Preliminary and Mains Exams",
    details: "Access our meticulously designed test series to evaluate your readiness and improve your exam-taking strategies for both preliminary and mains examinations.",
    link: "#",
  },
  {
    id: 4,
    title: "GRC",
    description: "Guidance for Successful Interview Process",
    details: "Prepare for the crucial interview stage with our comprehensive guidance and mock interview sessions conducted by seasoned professionals.",
    link: "#",
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
                    // Redirect to courses page
                    router.push('/courses');
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
