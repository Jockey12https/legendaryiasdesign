import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  {
    id: 1,
    title: "HSC",
    description: "Comprehensive Preparation for Civil Services",
    details: "Explore our specialized IAS Foundation Course designed to equip aspirants with the necessary knowledge and skills to excel in the UPSC examinations.",
    features: [
      "Comprehensive study material covering all subjects",
      "Regular mock tests and performance evaluation",
      "One-on-one mentoring sessions",
      "Access to video lectures and recorded sessions",
      "Special focus on current affairs and GK",
    ],
    duration: "12 months",
    fee: "₹95,000",
  },
  {
    id: 2,
    title: "GED",
    description: "Personalized Guidance for Optional Subjects",
    details: "Discover our tailored coaching for optional subjects, delivered by experienced mentors to enhance your preparation and performance.",
    features: [
      "Subject-specific in-depth study material",
      "Specialized mentors for each optional subject",
      "Regular doubt-clearing sessions",
      "Topic-wise tests and evaluations",
      "Previous years' question analysis and practice",
    ],
    duration: "6 months",
    fee: "₹65,000",
  },
  {
    id: 3,
    title: "ESL",
    description: "Effective Test Series for Preliminary and Mains Exams",
    details: "Access our meticulously designed test series to evaluate your readiness and improve your exam-taking strategies for both preliminary and mains examinations.",
    features: [
      "Comprehensive coverage of all UPSC topics",
      "Weekly tests with detailed solutions",
      "Performance analytics and improvement strategies",
      "Answer writing practice for mains examination",
      "Personalized feedback on test performance",
    ],
    duration: "4 months",
    fee: "₹45,000",
  },
  {
    id: 4,
    title: "GRC",
    description: "Guidance for Successful Interview Process",
    details: "Prepare for the crucial interview stage with our comprehensive guidance and mock interview sessions conducted by seasoned professionals.",
    features: [
      "Personality development sessions",
      "Multiple mock interviews with feedback",
      "Current affairs discussions for interview preparation",
      "Body language and communication skills training",
      "One-on-one mentoring for personal improvement areas",
    ],
    duration: "2 months",
    fee: "₹35,000",
  },
];

export default function CoursesPage() {
  return (
    <div>
      {/* Courses Header */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center font-['Oswald']">
            Our Courses
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-center mb-8">
            Discover our comprehensive range of courses designed to help you excel in the civil services examinations.
            Choose the program that best suits your preparation needs and goals.
          </p>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12">
            {courses.map((course) => (
              <Card key={course.id} className="border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-primary p-8">
                    <CardHeader>
                      <CardTitle className="text-3xl font-['Oswald'] text-secondary">{course.title}</CardTitle>
                      <h3 className="text-xl font-bold text-secondary mt-4">{course.description}</h3>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="mb-4">
                        <p className="text-secondary font-bold">Duration: {course.duration}</p>
                        <p className="text-secondary font-bold">Fee: {course.fee}</p>
                      </div>
                      <Button className="bg-secondary text-white hover:bg-secondary/90">
                        Enroll Now
                      </Button>
                    </CardContent>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h4 className="text-xl font-bold mb-4">Course Overview</h4>
                    <p className="text-gray-600 mb-6">{course.details}</p>

                    <h4 className="text-xl font-bold mb-4">Key Features</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>

                    <CardFooter className="px-0 pt-6">
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-secondary"
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
