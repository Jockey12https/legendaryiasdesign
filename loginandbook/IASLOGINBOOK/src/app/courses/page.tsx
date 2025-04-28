'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Programs data
const programs = [
  {
    id: 'foundation-program',
    title: 'Foundation Program',
    description: 'Comprehensive preparation for IAS with focus on prelims and mains.',
    duration: '12 months',
    fees: '₹35,000',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
  },
  {
    id: 'prelims-intensive',
    title: 'Prelims Intensive',
    description: 'Focused preparation for UPSC Preliminary exam with extensive practice tests.',
    duration: '6 months',
    fees: '₹20,000',
    image: 'https://ext.same-assets.com/1137026266/1169935981.jpeg',
  },
  {
    id: 'mains-advanced',
    title: 'Mains Advanced',
    description: 'In-depth guidance for UPSC Mains with answer writing practice and evaluation.',
    duration: '8 months',
    fees: '₹25,000',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
  },
  {
    id: 'interview-mastery',
    title: 'Interview Mastery',
    description: 'Comprehensive preparation for UPSC Interview with mock sessions and expert feedback.',
    duration: '3 months',
    fees: '₹15,000',
    image: 'https://ext.same-assets.com/1137026266/1195490810.jpeg',
  },
];

// Study Materials data
const studyMaterials = [
  {
    id: 'prelims-study-material',
    title: 'Prelims Study Material',
    description: 'Comprehensive study material covering all topics for UPSC Prelims.',
    format: 'PDF + Hard Copy',
    fees: '₹5,000',
    image: 'https://ext.same-assets.com/1137026266/2875867135.jpeg',
  },
  {
    id: 'mains-answer-writing',
    title: 'Mains Answer Writing Material',
    description: 'Model answers and writing techniques for UPSC Mains papers.',
    format: 'PDF + Hard Copy',
    fees: '₹6,000',
    image: 'https://ext.same-assets.com/1137026266/1169935981.jpeg',
  },
  {
    id: 'current-affairs-compilation',
    title: 'Current Affairs Compilation',
    description: 'Monthly and yearly compilation of current affairs relevant for UPSC.',
    format: 'PDF',
    fees: '₹2,500',
    image: 'https://ext.same-assets.com/1137026266/853365983.jpeg',
  },
  {
    id: 'optional-subject-material',
    title: 'Optional Subject Materials',
    description: 'Specialized study materials for various optional subjects.',
    format: 'PDF + Hard Copy',
    fees: '₹7,000',
    image: 'https://ext.same-assets.com/1137026266/1195490810.jpeg',
  },
];

const programCategories = [
  { value: 'all', label: 'All Programs' },
  { value: 'foundation', label: 'Foundation Courses' },
  { value: 'prelims', label: 'Prelims Courses' },
  { value: 'mains', label: 'Mains Courses' },
  { value: 'interview', label: 'Interview Courses' },
];

const materialCategories = [
  { value: 'all', label: 'All Materials' },
  { value: 'prelims', label: 'Prelims Materials' },
  { value: 'mains', label: 'Mains Materials' },
  { value: 'current', label: 'Current Affairs' },
  { value: 'optional', label: 'Optional Subjects' },
];

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [programCategory, setProgramCategory] = useState('all');
  const [materialCategory, setMaterialCategory] = useState('all');

  // Filter programs based on selected category
  const filteredPrograms = programCategory === 'all'
    ? programs
    : programs.filter(program => program.id.includes(programCategory));

  // Filter study materials based on selected category
  const filteredMaterials = materialCategory === 'all'
    ? studyMaterials
    : studyMaterials.filter(material => material.id.includes(materialCategory));

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-6">Our Courses</h1>
          <p className="text-center mb-12 max-w-3xl mx-auto">
            Explore our comprehensive range of programs and study materials designed to help you excel in your IAS preparation journey.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="study-materials">Study Materials</TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="space-y-6">
              <div className="flex justify-end mb-6">
                <Select value={programCategory} onValueChange={setProgramCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {programCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-48 w-full">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{program.title}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{program.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fees</p>
                          <p className="font-medium">{program.fees}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Link href={`/courses/programs/${program.id}`} className="w-full flex justify-center">
                          Enroll Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="study-materials" className="space-y-6">
              <div className="flex justify-end mb-6">
                <Select value={materialCategory} onValueChange={setMaterialCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMaterials.map((material) => (
                  <Card key={material.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-48 w-full">
                      <Image
                        src={material.image}
                        alt={material.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{material.title}</CardTitle>
                      <CardDescription>{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Format</p>
                          <p className="font-medium">{material.format}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fees</p>
                          <p className="font-medium">{material.fees}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Link href={`/courses/materials/${material.id}`} className="w-full flex justify-center">
                          Purchase Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursesPage;
