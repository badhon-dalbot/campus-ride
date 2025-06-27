import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Zap,
  Shield,
  TrendingUp,
  Coffee,
  Laptop,
  Car,
  Globe,
  Mail,
  ExternalLink,
  Calendar,
  DollarSign,
  Award,
  Target,
  BookOpen,
  Smartphone,
  Code,
  BarChart3,
  MessageCircle,
  Headphones
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "engineering", name: "Engineering" },
    { id: "product", name: "Product" },
    { id: "operations", name: "Operations" },
    { id: "marketing", name: "Marketing" },
    { id: "business", name: "Business Development" }
  ];

  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "engineering",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "3-5 years",
      salary: "৳80K - ৳120K",
      description: "Build and scale our web platform serving 50,000+ students across Bangladesh.",
      requirements: ["React.js, Node.js experience", "Database design skills", "API development", "AWS/Cloud experience"]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "product",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "2-4 years",
      salary: "৳70K - ৳100K",
      description: "Drive product strategy and roadmap for our student transportation platform.",
      requirements: ["Product management experience", "Data-driven mindset", "User research skills", "Agile methodology"]
    },
    {
      id: 3,
      title: "Campus Operations Coordinator",
      department: "operations",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "1-3 years",
      salary: "৳40K - ৳60K",
      description: "Manage campus partnerships and ensure smooth operations across university locations.",
      requirements: ["University relationship management", "Project coordination", "Strong communication", "Problem-solving skills"]
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      department: "marketing",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "2-4 years",
      salary: "৳50K - ৳75K",
      description: "Drive student acquisition through digital channels and social media campaigns.",
      requirements: ["Digital marketing experience", "Social media expertise", "Analytics tools", "Content creation"]
    },
    {
      id: 5,
      title: "Business Development Manager",
      department: "business",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "3-5 years",
      salary: "৳60K - ৳90K",
      description: "Expand university partnerships and develop strategic relationships across Bangladesh.",
      requirements: ["B2B sales experience", "Relationship building", "University network", "Negotiation skills"]
    },
    {
      id: 6,
      title: "UX/UI Designer",
      department: "product",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "2-4 years",
      salary: "৳55K - ৳80K",
      description: "Design intuitive interfaces that make campus transportation seamless for students.",
      requirements: ["UI/UX design portfolio", "Figma/Sketch expertise", "User research", "Mobile-first design"]
    },
    {
      id: 7,
      title: "Customer Support Lead",
      department: "operations",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "2-3 years",
      salary: "৳35K - ৳50K",
      description: "Lead customer support team and ensure excellent service for our student community.",
      requirements: ["Team leadership", "Customer service experience", "Communication skills", "Problem resolution"]
    },
    {
      id: 8,
      title: "Data Analyst",
      department: "engineering",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "1-3 years",
      salary: "৳45K - ৳70K",
      description: "Analyze ride patterns and user behavior to drive data-informed decisions.",
      requirements: ["SQL proficiency", "Python/R experience", "Data visualization", "Statistical analysis"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs for you and your family"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Annual learning budget, conference attendance, and skill development opportunities"
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and generous paid time off"
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Free Campus Ride credits and transportation allowance for all employees"
    },
    {
      icon: Laptop,
      title: "Tech Setup",
      description: "Latest MacBook/laptop, monitor, and all necessary equipment provided"
    },
    {
      icon: Award,
      title: "Performance Bonuses",
      description: "Quarterly performance bonuses and annual profit-sharing program"
    }
  ];

  const companyValues = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We prioritize the safety and security of our student community above all else"
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Every decision we make considers the impact on student experience and affordability"
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "We embrace challenges, learn from failures, and continuously improve"
    },
    {
      icon: Heart,
      title: "Community Building",
      description: "We connect students and build lasting relationships within university communities"
    }
  ];

  const hiringProcess = [
    {
      step: "1",
      title: "Application Review",
      description: "Our team reviews your application and portfolio within 3-5 business days"
    },
    {
      step: "2",
      title: "Initial Screening",
      description: "30-minute phone or video call with our HR team to discuss your background"
    },
    {
      step: "3",
      title: "Technical/Skills Assessment",
      description: "Role-specific assessment or case study to evaluate your technical abilities"
    },
    {
      step: "4",
      title: "Team Interview",
      description: "Meet with your potential teammates and hiring manager for cultural fit"
    },
    {
      step: "5",
      title: "Final Decision",
      description: "Reference checks and offer discussion within 2-3 business days"
    }
  ];

  const filteredJobs = selectedDepartment === "all" 
    ? openPositions 
    : openPositions.filter(job => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            Join Our Mission
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Help us revolutionize campus transportation and build safer, more connected university communities across Bangladesh
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Open Positions
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              Learn About Culture
            </button>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="bg-teal-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">50+</div>
              <p className="text-gray-700">Team Members</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">15</div>
              <p className="text-gray-700">University Partners</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
              <p className="text-gray-700">Students Served</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">127%</div>
              <p className="text-gray-700">YoY Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Work With Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Open Positions
          </h2>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedDepartment === dept.id
                    ? "bg-white text-teal-600"
                    : "bg-teal-500 text-white hover:bg-teal-400"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800 mr-4">
                        {job.title}
                      </h3>
                      <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {job.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.experience}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center">
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Process */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Our Hiring Process
          </h2>

          <div className="grid md:grid-cols-5 gap-6">
            {hiringProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-teal-200 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Don't see the perfect role? We're always looking for talented individuals who share our passion for improving student life.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Human Resources</h3>
                <p className="text-gray-600 mb-1">Rashida Khan</p>
                <p className="text-gray-600 mb-1">HR Manager</p>
                <p className="text-teal-600 font-medium">careers@campusride.bd</p>
                <p className="text-gray-600">+880 1600-000000</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Hiring Manager</h3>
                <p className="text-gray-600 mb-1">Ahmed Hassan</p>
                <p className="text-gray-600 mb-1">Head of Talent</p>
                <p className="text-teal-600 font-medium">talent@campusride.bd</p>
                <p className="text-gray-600">+880 1700-000000</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Send Your Resume
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default CareersPage;