import {
  Search,
  Calendar,
  User,
  Clock,
  MessageCircle,
  Share2,
  BookOpen,
  TrendingUp,
  Users,
  Car,
  Shield,
  DollarSign,
  Mail,
  Bell,
  Tag,
  ArrowRight,
  Heart,
  Eye
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const blogCategories = [
    { id: "all", name: "All Posts" },
    { id: "student-life", name: "Student Life" },
    { id: "safety", name: "Safety Tips" },
    { id: "campus-guide", name: "Campus Guide" },
    { id: "savings", name: "Money Saving" },
    { id: "sustainability", name: "Sustainability" }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Ultimate Guide to Safe Campus Transportation in Dhaka",
      excerpt: "Essential safety tips every university student should know when using ridesharing services around Dhaka's major campuses.",
      author: "Fatima Rahman",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      date: "June 25, 2025",
      readTime: "8 min read",
      category: "safety",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
      views: "2.3K",
      likes: "156",
      featured: true
    },
    {
      id: 2,
      title: "How Students Save ৳500+ Monthly with Shared Rides",
      excerpt: "Real stories from DU and BUET students who cut their transportation costs in half using Campus Ride's shared ride features.",
      author: "Ahmed Hassan",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      date: "June 22, 2025",
      readTime: "6 min read",
      category: "savings",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      views: "1.8K",
      likes: "89",
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: "Best Study Spots Around Dhaka University: A Rider's Guide",
      excerpt: "Discover quiet cafes, libraries, and study spaces easily accessible through Campus Ride from DU campus.",
      author: "Nasir Khan",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      date: "June 20, 2025",
      readTime: "5 min read",
      category: "campus-guide",
      views: "987",
      likes: "67"
    },
    {
      id: 4,
      title: "Campus Ride Driver Spotlight: Earning Through University",
      excerpt: "Meet Rashid, a CSE student who's funding his degree by driving fellow students safely around campus.",
      author: "Sarah Ahmed",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      date: "June 18, 2025",
      readTime: "7 min read",
      category: "student-life",
      views: "1.2K",
      likes: "94"
    },
    {
      id: 5,
      title: "Eco-Friendly Commuting: How Shared Rides Help the Environment",
      excerpt: "Learn how choosing shared rides over private cars reduces carbon emissions and helps create a greener campus.",
      author: "Dr. Mahmud Ali",
      authorImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop&crop=face",
      date: "June 15, 2025",
      readTime: "4 min read",
      category: "sustainability",
      views: "756",
      likes: "43"
    },
    {
      id: 6,
      title: "Campus Safety After Dark: Night Ride Best Practices",
      excerpt: "Essential tips for staying safe during late-night rides from campus libraries, study groups, and evening events.",
      author: "Fatima Rahman",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      date: "June 12, 2025",
      readTime: "6 min read",
      category: "safety",
      views: "1.5K",
      likes: "128"
    },
    {
      id: 7,
      title: "Budget-Friendly Food Spots: A Campus Foodie's Transport Guide",
      excerpt: "Discover affordable restaurants and street food around Dhaka's universities, all accessible via Campus Ride.",
      author: "Razia Begum",
      authorImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      date: "June 10, 2025",
      readTime: "8 min read",
      category: "campus-guide",
      views: "2.1K",
      likes: "187"
    },
    {
      id: 8,
      title: "Making Friends Through Shared Rides: Building Campus Community",
      excerpt: "How shared transportation creates connections and friendships among university students across Bangladesh.",
      author: "Ahmed Hassan",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      date: "June 8, 2025",
      readTime: "5 min read",
      category: "student-life",
      views: "934",
      likes: "72"
    }
  ];

  const popularTags = [
    "Student Budget", "Campus Safety", "DU", "BUET", "Shared Rides", 
    "Night Safety", "Study Spots", "Food Guide", "Driver Tips", "Green Commute"
  ];

  const filteredPosts = activeCategory === "all" 
    ? [...featuredPosts, ...recentPosts]
    : [...featuredPosts, ...recentPosts].filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            Campus Ride Blog
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Tips, stories, and insights for smarter campus transportation
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-teal-300"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-teal-400 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Featured Articles
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {post.category.replace('-', ' ')}
                    </span>
                    <span className="text-gray-500 text-sm ml-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.readTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Latest Stories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts
              .filter(post => activeCategory === "all" || post.category === activeCategory)
              .map((post) => (
              <div key={post.id} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-3">
                  <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {post.category.replace('-', ' ')}
                  </span>
                  <span className="text-gray-500 text-sm ml-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-xs font-medium text-gray-800">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.readTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-500 text-xs">
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {post.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {post.likes}
                    </span>
                  </div>
                </div>
                
                <button className="text-teal-600 font-medium hover:text-teal-700 flex items-center text-sm">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Popular Topics
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag, index) => (
              <span 
                key={index}
                className="bg-teal-200 text-teal-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-100 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <div className="bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Mail className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Get the latest campus transportation tips, safety updates, and student stories delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center">
                <Bell className="w-5 h-5 mr-2" />
                Subscribe
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Weekly updates • No spam • Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default BlogPage;