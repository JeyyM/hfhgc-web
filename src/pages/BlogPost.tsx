import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';

// Sample blog posts data (in production, this would come from a CMS or API)
const blogPosts = [
  {
    id: 1,
    title: "Building Dreams: Our Latest Community Project in Tondo",
    excerpt: "This month, we completed our 15th home build in partnership with the Tondo community. Read about the incredible journey of the Santos family and how they finally have a place to call home.",
    content: `
      <p>After months of planning, fundraising, and hard work, we're thrilled to announce the completion of our latest home build project in Tondo, Manila. The Santos family—composed of Maria, her husband Jose, and their three children—now have a safe, sturdy home to call their own.</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/tondo-build1/1000/600" alt="Volunteers working on construction site" class="blog-image" />
        <p class="image-caption">Volunteers from DLSU working together on the Santos family home</p>
      </div>
      
      <h2>The Journey</h2>
      <p>The project began in January when we first met the Santos family. Living in a makeshift structure with a leaking roof and unstable walls, they dreamed of a proper home where their children could study and play safely. Through our partnership with local government units and generous donations from DLSU students and alumni, we were able to make this dream a reality.</p>
      
      <h2>Community Effort</h2>
      <p>Over 50 volunteers from DLSU participated in the build, working weekends for three months. Students from various colleges came together—from engineering students helping with structural work to management students organizing logistics. This project truly embodied our motto: "Building Homes, Building Hope."</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/tondo-family/1000/600" alt="Santos family in front of their new home" class="blog-image" />
        <p class="image-caption">The Santos family celebrating in front of their completed home</p>
      </div>
      
      <blockquote>"I never thought this day would come. Thank you to all the young people who gave their time and energy to help our family. You are all angels." - Maria Santos</blockquote>
      
      <h2>What's Next</h2>
      <p>The Santos family's story is just one of many. We have three more builds planned for this year, and we're always looking for volunteers and partners. If you're interested in joining our next build, check out our volunteer opportunities page.</p>
    `,
    author: "Patricia Reyes",
    authorRole: "Project Lead",
    date: "February 28, 2026",
    readTime: "5 min read",
    category: "Community Stories",
    image: "https://picsum.photos/seed/blog1/1200/600",
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
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/bamboo-frame/1000/600" alt="Bamboo framework construction" class="blog-image" />
        <p class="image-caption">Sustainable bamboo framework being installed in a new home</p>
      </div>
      
      <h2>Solar Solutions</h2>
      <p>Thanks to a partnership with SolarPhilippines, we're now able to install basic solar panel systems in our homes. This reduces electricity costs for families and decreases their carbon footprint.</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/solar-panels/1000/600" alt="Solar panels on roof" class="blog-image" />
        <p class="image-caption">Solar panels being installed on a newly completed home</p>
      </div>
      
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
    image: "https://picsum.photos/seed/blog2/1200/600",
    tags: ["Green Building", "Solar Energy", "Sustainability"]
  },
  {
    id: 3,
    title: "Volunteer Spotlight: How Students Are Making a Difference",
    excerpt: "Meet some of our dedicated volunteers who give their time and energy every weekend. Hear their stories and why they chose to be part of the Habitat for Humanity movement.",
    content: `
      <p>Behind every successful build are the countless volunteers who dedicate their weekends, energy, and passion to helping families achieve their dream of homeownership. Today, we're spotlighting three incredible DLSU students who exemplify the spirit of service.</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/volunteers-group/1000/600" alt="Group of volunteers at construction site" class="blog-image" />
        <p class="image-caption">DLSU volunteers taking a break during a weekend build</p>
      </div>
      
      <h2>Anna Chen - Civil Engineering, 3rd Year</h2>
      <p>"I joined Habitat because I wanted to apply what I'm learning in class to real-world projects. There's nothing quite like seeing a family move into a home you helped build. It's changed my perspective on why I'm studying engineering."</p>
      
      <p>Anna has participated in 8 builds and recently took on a leadership role, training new volunteers in basic construction safety.</p>
      
      <h2>Carlos Rivera - Business Management, 4th Year</h2>
      <p>"I may not be the best with a hammer, but I found my place in Habitat through logistics and fundraising. Every build needs people behind the scenes making sure we have materials, permits, and resources."</p>
      
      <p>Carlos has helped secure over ₱500,000 in donations and in-kind support for our projects this year.</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/volunteers-work/1000/600" alt="Volunteers working together" class="blog-image" />
        <p class="image-caption">Teamwork in action: students from different colleges collaborating on a build</p>
      </div>
      
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
    image: "https://picsum.photos/seed/blog3/1200/600",
    tags: ["Volunteers", "Student Stories", "Community"]
  },
  {
    id: 4,
    title: "Partnership Announcement: Collaboration with BuildPH Foundation",
    excerpt: "We're excited to announce our new partnership with BuildPH Foundation, which will enable us to double our building capacity and reach more families in need across Metro Manila.",
    content: `
      <p>Habitat for Humanity Green Chapter is thrilled to announce a groundbreaking partnership with BuildPH Foundation that will significantly expand our impact across Metro Manila.</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/partnership-signing/1000/600" alt="Partnership signing ceremony" class="blog-image" />
        <p class="image-caption">Leaders from both organizations celebrating the new partnership</p>
      </div>
      
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
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/future-plans/1000/600" alt="Architectural plans and blueprints" class="blog-image" />
        <p class="image-caption">Planning the future: blueprints for upcoming community projects</p>
      </div>
      
      <h2>Looking Ahead</h2>
      <p>The first joint project under this partnership will break ground in April 2026 in Payatas. We're planning a community center alongside 10 residential homes, creating a hub for education, healthcare, and social services.</p>
      
      <p>This partnership represents a new chapter for our organization, and we couldn't be more excited about the possibilities ahead.</p>
    `,
    author: "Mark Villanueva",
    authorRole: "Executive Director",
    date: "February 10, 2026",
    readTime: "4 min read",
    category: "Announcements",
    image: "https://picsum.photos/seed/blog4/1200/600",
    tags: ["Partnership", "Announcement", "Expansion"]
  },
  {
    id: 5,
    title: "Construction 101: What Volunteers Learn on the Build Site",
    excerpt: "From mixing cement to raising walls, our build sites are outdoor classrooms. Discover the practical skills and life lessons volunteers gain through hands-on construction work.",
    content: `
      <p>When students join us for their first build day, many have never held a hammer or mixed concrete. By the end of the day, they've not only learned practical construction skills but also valuable lessons about teamwork, perseverance, and community service.</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/construction-training/1000/600" alt="Volunteers learning construction skills" class="blog-image" />
        <p class="image-caption">New volunteers receiving safety and tool training on their first day</p>
      </div>
      
      <h2>Week 1: Foundation and Safety</h2>
      <p>Every volunteer starts with safety training. We cover proper use of tools, site hazards, and protective equipment. Then it's time to dig in—literally. Foundation work teaches patience and precision, as everything built afterward depends on a solid base.</p>
      
      <h2>Week 2-3: Framing and Walls</h2>
      <p>This is where volunteers really see the house take shape. Under the guidance of our experienced contractors and engineering student leaders, volunteers learn to measure, cut, and assemble the frame. It's physically demanding but incredibly rewarding.</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/framing-work/1000/600" alt="Students building house frame" class="blog-image" />
        <p class="image-caption">Volunteers working together to raise the walls of a new home</p>
      </div>
      
      <h2>Week 4-5: Roofing and Finishing</h2>
      <p>Installing the roof is always a milestone moment—the house is now protected from the elements. Volunteers also learn finishing skills like painting, installing fixtures, and basic electrical work (supervised by licensed professionals).</p>
      
      <div class="blog-image-wrapper">
        <img src="https://picsum.photos/seed/roof-install/1000/600" alt="Installing roofing materials" class="blog-image" />
        <p class="image-caption">The exciting moment when the roof goes on and the house takes its final form</p>
      </div>
      
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
    image: "https://picsum.photos/seed/blog5/1200/600",
    tags: ["Skills Training", "Education", "Volunteer Experience"]
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="bg-[var(--color-bg-main)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            Post Not Found
          </h1>
          <Link to="/blog" className="text-[var(--color-green-5)] hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-white hover:text-[var(--color-green-2)] mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
            <span className="inline-block bg-[var(--color-green-5)] text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white text-sm">
              <span className="flex items-center gap-2">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-2xl scrapbook-border scrapbook-shadow mb-12 flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-[var(--color-green-5)] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className="font-heading font-bold text-xl text-[var(--color-green-5)]">{post.author}</p>
              <p className="text-[var(--color-text-main)]">{post.authorRole}</p>
            </div>
            <button className="p-3 hover:bg-[var(--color-green-1)] rounded-full transition-colors">
              <Share2 size={20} className="text-[var(--color-green-5)]" />
            </button>
          </motion.div>

          {/* Article Body - Rich Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75',
              color: 'var(--color-text-main)'
            }}
          />

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t-4 border-[var(--color-green-5)]"
          >
            <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 bg-[var(--color-green-1)] text-[var(--color-green-5)] px-4 py-2 rounded-full font-semibold"
                >
                  <Tag size={16} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-[var(--color-green-1)] p-8 rounded-2xl scrapbook-border text-center"
          >
            <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Want to Make a Difference?
            </h3>
            <p className="text-[var(--color-text-main)] mb-6">
              Join us in our mission to build homes and communities. Every volunteer makes an impact.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                Volunteer With Us
              </Link>
              <Link 
                to="/blog"
                className="bg-white hover:bg-gray-50 text-[var(--color-green-5)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                Read More Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Custom styles for rich text content */}
      <style>{`
        .prose h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: bold;
          color: var(--color-green-5);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--color-green-4);
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose p {
          margin-bottom: 1.25rem;
        }
        
        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose blockquote {
          border-left: 4px solid var(--color-green-5);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--color-green-4);
          background: var(--color-green-1);
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .prose strong {
          color: var(--color-green-5);
          font-weight: 700;
        }
        
        .prose a {
          color: var(--color-green-5);
          text-decoration: underline;
        }
        
        .prose a:hover {
          color: var(--color-green-4);
        }
        
        .blog-image-wrapper {
          margin: 2.5rem 0;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border: 4px solid var(--color-green-5);
          background: white;
          padding: 0.75rem;
        }
        
        .blog-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 0.5rem;
        }
        
        .image-caption {
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          padding: 0 0.5rem;
          text-align: center;
          font-style: italic;
          color: var(--color-text-main);
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}
