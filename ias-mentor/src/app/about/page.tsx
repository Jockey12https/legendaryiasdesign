import Image from "next/image";
import { Button } from "@/components/ui/button";

const mentors = [
  {
    id: 1,
    name: "John Doe",
    position: "Founder & Lead Mentor",
    email: "john.doe@legendaryiasmentor.com",
    image: "https://ext.same-assets.com/2003590844/1644044789.jpeg"
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Senior Mentor",
    email: "jane.smith@legendaryiasmentor.com",
    image: "https://ext.same-assets.com/2003590844/425117178.jpeg"
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Mentor",
    email: "michael.johnson@legendaryiasmentor.com",
    image: "https://ext.same-assets.com/2003590844/3361799170.jpeg"
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Mentor",
    email: "emily.davis@legendaryiasmentor.com",
    image: "https://ext.same-assets.com/2003590844/2235665846.jpeg"
  }
];

export default function AboutPage() {
  return (
    <div>
      {/* Welcome Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-['Oswald']">
            Welcome to Legendary IAS Mentor
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8 text-center">
              Legendary IAS Mentor is dedicated to providing high-quality education and training in
              the field of civil services examination preparation. Our academy is committed to nurturing
              future leaders with the skills and knowledge required to excel in the highly competitive
              IAS exams. We take pride in offering comprehensive study materials, expert guidance, and
              personalized mentorship to help our students achieve their career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Oswald'] text-secondary">
                Join Us
              </h2>
              <p className="text-secondary mb-8">
                Ready to embark on your journey towards becoming an IAS officer?
                Enroll now to gain access to our top-notch study programs and start your
                preparation with the guidance of seasoned mentors who are dedicated to your success.
              </p>
              <Button
                className="bg-black text-white hover:bg-gray-800"
              >
                Enroll Now
              </Button>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="https://ext.same-assets.com/2003590844/4277505869.jpeg"
                alt="Join Us"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Mentors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Oswald']">
            Meet Our Mentors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="text-center">
                <div className="relative h-64 w-full mb-4">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                <p className="text-gray-600 mb-2">{mentor.position}</p>
                <a
                  href={`mailto:${mentor.email}`}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  {mentor.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
