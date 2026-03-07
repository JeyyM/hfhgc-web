import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';

// Sample blog posts - in production, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "Building Dreams: Our Latest Community Project in Tondo",
    excerpt: "This month, we completed our 15th home build in partnership with the Tondo community. Read about the incredible journey of the Santos family and how they finally have a place to call home.",
    content: `
      <p>After months of planning, fundraising, and hard work, we're thrilled to announce the completion of our latest home build project in Tondo, Manila. The Santos family—composed of Maria, her husband Jose, and their three children—now have a safe, sturdy home to call their own.</p>
      
      <h2>The Journey</h2>
      <p>The project began in January when we first met the Santos family. Living in a makeshift structure with a leaking roof and unstable walls, they dreamed of a proper home where their children could study and play safely. Through our partnership with local government units and generous donations from DLSU students and alumni, we were able to make this dream a reality.</p>
      
      <h2>Community Effort</h2>
      <p>Over 50 volunteers from DLSU participated in the build, working weekends for three months. Students from various colleges came together—from engineering students helping with structural work to management students organizing logistics. This project truly embodied our motto: "Building Homes, Building Hope."</p>
      
      <blockquote>"I never thought this day would come. Thank you to all the young people who gave their time and energy to help our family. You are all angels." - Maria Santos</blockquote>
      
      <h2>What's Next</h2>
      <p>The Santos family's story is just one of many. We have three more builds planned for this year, and we're always looking for volunteers and partners. If you're interested in joining our next build, check out our volunteer opportunities page.</p>
    `,
    author: "Patricia Reyes",
    authorRole: "Project Lead",
    date: "February 28, 2026",
    readTime: "5 min read",
    category: "Community Stories",
    image: "https://picsum.photos/seed/blog1/800/500",
    tags: ["Community Build", "Tondo", "Family Stories"]
  },
  {
    id: 2,
    title: "Sustainability in Action: Eco-Friendly Building Materials",
    excerpt: "Learn how we're integrating sustainable practices into our builds, from bamboo framing to solar panels. Discover the innovative materials we're using to create environmentally responsible homes.",
    content: `
      <p>At Habitat for Humanity Green Chapter, our commitment to sustainability goes beyond just our name. We're actively incorporating eco-friendly building materials and practices into every project we undertake.</p>
      
      <h2>Bamboo: Nature's Building Material</h2>
      <p>Bamboo has become one of our primary materials. It's renewable, grows rapidly, and is incredibly strong. We've partnered with local bamboo suppliers to ensure sustainable harvesting practices while supporting local economies.</p>
      
      <h2>Solar Solutions</h2>
      <p>Thanks to a partnership with SolarPhilippines, we're now able to install basic solar panel systems in our homes. This reduces electricity costs for families and decreases their carbon footprint.</p>
      
      <h2>Rainwater Harvesting</h2>
      <p>Each new home includes a rainwater collection system. This provides families with an additional water source and reduces strain on municipal water systems.</p>
      
      <h2>Impact by Numbers</h2>
      <ul>
        <li>15 homes built with sustainable materials this year</li>
        <li>30% reduction in construction waste through recycling</li>
        <li>Average of 40% energy savings for families with solar installations</li>
      </ul>
    `,
    author: "Miguel Santos",
    authorRole: "Sustainability Coordinator",
    date: "February 20, 2026",
    readTime: "7 min read",
    category: "Sustainability",
    image: "https://picsum.photos/seed/blog2/800/500",
    tags: ["Green Building", "Solar Energy", "Sustainability"]
  },
  {
    id: 3,
    title: "Volunteer Spotlight: How Students Are Making a Difference",
    excerpt: "Meet some of our dedicated volunteers who give their time and energy every weekend. Hear their stories and why they chose to be part of the Habitat for Humanity movement.",
    content: `
      <p>Behind every successful build are the countless volunteers who dedicate their weekends, energy, and passion to helping families achieve their dream of homeownership. Today, we're spotlighting three incredible DLSU students who exemplify the spirit of service.</p>
      
      <h2>Anna Chen - Civil Engineering, 3rd Year</h2>
      <p>"I joined Habitat because I wanted to apply what I'm learning in class to real-world projects. There's nothing quite like seeing a family move into a home you helped build. It's changed my perspective on why I'm studying engineering."</p>
      
      <p>Anna has participated in 8 builds and recently took on a leadership role, training new volunteers in basic construction safety.</p>
      
      <h2>Carlos Rivera - Business Management, 4th Year</h2>
      <p>"I may not be the best with a hammer, but I found my place in Habitat through logistics and fundraising. Every build needs people behind the scenes making sure we have materials, permits, and resources."</p>
      
      <p>Carlos has helped secure over ₱500,000 in donations and in-kind support for our projects this year.</p>
      
      <h2>Sarah Lim - Psychology, 2nd Year</h2>
      <p>"What drew me to Habitat was the human connection. Yes, we're building houses, but we're really building relationships and communities. The friendships I've made—with fellow volunteers and the families we serve—are priceless."</p>
      
      <p>Sarah coordinates our family partnership program, ensuring families feel supported throughout the building process.</p>
      
      <h2>Join Our Team</h2>
      <p>Interested in becoming a volunteer? We welcome students from all courses and backgrounds. No experience necessary—just bring your enthusiasm and willingness to help!</p>
    `,
    author: "Lisa Gonzales",
    authorRole: "Volunteer Coordinator",
    date: "February 15, 2026",
    readTime: "6 min read",
    category: "Volunteers",
    image: "https://picsum.photos/seed/blog3/800/500",
    tags: ["Volunteers", "Student Stories", "Community"]
  },
  {
    id: 4,
    title: "Partnership Announcement: Collaboration with BuildPH Foundation",
    excerpt: "We're excited to announce our new partnership with BuildPH Foundation, which will enable us to double our building capacity and reach more families in need across Metro Manila.",
    content: `
      <p>Habitat for Humanity Green Chapter is thrilled to announce a groundbreaking partnership with BuildPH Foundation that will significantly expand our impact across Metro Manila.</p>
      
      <h2>What This Means</h2>
      <p>This partnership brings together BuildPH's expertise in large-scale construction management with our community-focused approach and passionate volunteer base. Together, we'll be able to:</p>
      
      <ul>
        <li>Double our annual home construction from 20 to 40 homes</li>
        <li>Access better pricing on construction materials through bulk purchasing</li>
        <li>Provide skills training workshops for our volunteers</li>
        <li>Expand into three new communities: Payatas, Navotas, and Parañaque</li>
      </ul>
      
      <h2>Shared Vision</h2>
      <p>"We've been following the incredible work of DLSU's Green Chapter for years," says Roberto Aquino, CEO of BuildPH Foundation. "Their student-led model is inspiring, and we believe that by combining forces, we can create lasting change in more communities."</p>
      
      <h2>Looking Ahead</h2>
      <p>The first joint project under this partnership will break ground in April 2026 in Payatas. We're planning a community center alongside 10 residential homes, creating a hub for education, healthcare, and social services.</p>
      
      <p>This partnership represents a new chapter for our organization, and we couldn't be more excited about the possibilities ahead.</p>
    `,
    author: "Mark Villanueva",
    authorRole: "Executive Director",
    date: "February 10, 2026",
    readTime: "4 min read",
    category: "Announcements",
    image: "https://picsum.photos/seed/blog4/800/500",
    tags: ["Partnership", "Announcement", "Expansion"]
  },
  {
    id: 5,
    title: "Construction 101: What Volunteers Learn on the Build Site",
    excerpt: "From mixing cement to raising walls, our build sites are outdoor classrooms. Discover the practical skills and life lessons volunteers gain through hands-on construction work.",
    content: `
      <p>When students join us for their first build day, many have never held a hammer or mixed concrete. By the end of the day, they've not only learned practical construction skills but also valuable lessons about teamwork, perseverance, and community service.</p>
      
      <h2>Week 1: Foundation and Safety</h2>
      <p>Every volunteer starts with safety training. We cover proper use of tools, site hazards, and protective equipment. Then it's time to dig in—literally. Foundation work teaches patience and precision, as everything built afterward depends on a solid base.</p>
      
      <h2>Week 2-3: Framing and Walls</h2>
      <p>This is where volunteers really see the house take shape. Under the guidance of our experienced contractors and engineering student leaders, volunteers learn to measure, cut, and assemble the frame. It's physically demanding but incredibly rewarding.</p>
      
      <h2>Week 4-5: Roofing and Finishing</h2>
      <p>Installing the roof is always a milestone moment—the house is now protected from the elements. Volunteers also learn finishing skills like painting, installing fixtures, and basic electrical work (supervised by licensed professionals).</p>
      
      <h2>Skills Beyond Construction</h2>
      <p>But the learning goes beyond hammers and nails. Volunteers develop:</p>
      <ul>
        <li><strong>Leadership:</strong> Many take on team lead roles, coordinating groups of 5-10 volunteers</li>
        <li><strong>Problem-solving:</strong> Not everything goes according to plan; adapting is essential</li>
        <li><strong>Cross-cultural communication:</strong> Working with families and community members from diverse backgrounds</li>
        <li><strong>Project management:</strong> Understanding how a complex project comes together from start to finish</li>
      </ul>
      
      <h2>Life-Long Impact</h2>
      <p>"The skills I learned at Habitat helped me land my first internship," says former volunteer James Tan. "But more importantly, it taught me that I have the power to make a real difference in people's lives."</p>
    `,
    author: "Roberto Cruz",
    authorRole: "Site Supervisor",
    date: "February 5, 2026",
    readTime: "8 min read",
    category: "Education",
    image: "https://picsum.photos/seed/blog5/800/500",
    tags: ["Skills Training", "Education", "Volunteer Experience"]
  }
];

export default function Blog() {
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      {/* Header */}
      <section className="bg-[var(--color-green-5)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-[var(--color-green-1)] max-w-3xl mx-auto">
              Stories, updates, and insights from our community builds, volunteers, and partners
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block bg-[var(--color-green-1)] text-[var(--color-green-5)] px-3 py-1 rounded-full text-sm font-semibold">
              Featured Story
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="polaroid">
              <img 
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-auto object-cover rounded-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4 text-sm text-[var(--color-text-main)]">
                <span className="bg-[var(--color-green-2)] px-3 py-1 rounded-full font-semibold">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {featuredPost.readTime}
                </span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-[var(--color-text-main)] mb-4">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-green-5)] rounded-full flex items-center justify-center text-white font-bold">
                  {featuredPost.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-green-5)]">{featuredPost.author}</p>
                  <p className="text-sm text-[var(--color-text-main)]">{featuredPost.authorRole}</p>
                </div>
              </div>
              <Link 
                to={`/blog/${featuredPost.id}`}
                className="inline-flex items-center gap-2 bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                Read Full Story <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-12">
            Recent Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl scrapbook-border scrapbook-shadow overflow-hidden hover:scale-105 transition-transform"
              >
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-sm text-[var(--color-text-main)]">
                    <span className="bg-[var(--color-green-1)] px-3 py-1 rounded-full font-semibold text-xs">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-3">
                    {post.title}
                  </h3>
                  <p className="text-[var(--color-text-main)] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[var(--color-green-5)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-green-5)] text-sm">{post.author}</p>
                      <p className="text-xs text-[var(--color-text-main)]">{post.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs bg-[var(--color-bg-main)] px-2 py-1 rounded-full text-[var(--color-text-main)]"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-[var(--color-green-5)] hover:text-[var(--color-green-4)] font-semibold inline-flex items-center gap-2 transition-colors"
                  >
                    Read More <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-[var(--color-green-1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-[var(--color-text-main)] mb-8">
            Subscribe to our newsletter to receive the latest stories, project updates, and volunteer opportunities directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-3 rounded-full bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-green-5)]"
            />
            <button 
              type="submit" 
              className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
