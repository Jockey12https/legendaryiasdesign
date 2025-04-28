import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

interface CourseProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  status: 'Available' | 'Ended' | 'Coming Soon';
}

const courses: CourseProps[] = [
  {
    id: 'web-dev-basics',
    title: 'IAS Foundation Program',
    description: 'Comprehensive preparation course for Civil Services with focus on prelims and mains.',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
    price: 15000,
    status: 'Available'
  },
  {
    id: 'advanced-front-end',
    title: 'Optional Subject Coaching',
    description: 'Specialized coaching for optional subjects with experienced faculty members.',
    image: 'https://ext.same-assets.com/1137026266/1169935981.jpeg',
    price: 8000,
    status: 'Available'
  },
  {
    id: 'seo-workshop',
    title: 'Interview Preparation',
    description: 'Comprehensive interview preparation with mock interviews and personalized feedback.',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
    price: 5000,
    status: 'Available'
  },
  {
    id: 'digital-marketing',
    title: 'Test Series',
    description: 'Comprehensive test series for prelims and mains with detailed analysis and feedback.',
    image: 'https://ext.same-assets.com/1137026266/1195490810.jpeg',
    price: 3000,
    status: 'Available'
  },
  {
    id: 'ui-design',
    title: 'Current Affairs Program',
    description: 'Stay updated with daily current affairs analysis and monthly compilations.',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
    price: 2000,
    status: 'Available'
  },
  {
    id: 'content-writing',
    title: 'CSAT Preparation',
    description: 'Focused preparation for CSAT with practice tests and problem-solving techniques.',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
    price: 4000,
    status: 'Coming Soon'
  }
];

const BookOnlinePage = () => {
  return (
    <MainLayout>
      <div className="py-10 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        course.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : course.status === 'Ended'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="text-lg font-medium">
                      ₹{course.price.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={course.status === 'Available' ? 'default' : 'outline'} disabled={course.status !== 'Available'}>
                    {course.status === 'Available' ? (
                      <Link href={`/book-online/${course.id}`} className="w-full flex justify-center">
                        Book Now
                      </Link>
                    ) : (
                      <span>Not Available</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookOnlinePage;
