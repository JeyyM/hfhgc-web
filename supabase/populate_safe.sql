-- ============================================================================
-- HFHGC Website — Populate Database with Content (SAFE VERSION)
-- ============================================================================
-- This version clears existing data first to avoid duplicate key errors.
-- Run this AFTER schema.sql has been applied.
-- ============================================================================

-- Clear existing data from all tables (in correct order to avoid FK constraints)
DELETE FROM partner_testimonials;
DELETE FROM partners;
DELETE FROM partnership_benefits;
DELETE FROM faqs;
DELETE FROM announcements;
DELETE FROM testimonials;
DELETE FROM blog_posts;
DELETE FROM alumni_testimonials;
DELETE FROM team_members;

-- Delete partnership-specific impact stats (keep the original 4 from schema.sql)
DELETE FROM impact_stats WHERE sort_order >= 10;


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  TEAM MEMBERS                                                          ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO team_members (name, position, category, course, department, bio, email, linkedin, facebook, image_url, sort_order) VALUES

-- Executive Board
('Maria Santos',
 'President',
 'executive',
 '4th Year Management',
 NULL,
 'Leading HFHGC with passion for community development and sustainable housing solutions.',
 'maria.santos@dlsu.edu.ph',
 '#',
 '#',
 'https://placehold.co/400x400?text=Maria+Santos',
 0),

('Carlos Rivera',
 'Vice President for Internal Affairs',
 'executive',
 '3rd Year Civil Engineering',
 NULL,
 'Coordinating internal operations and ensuring smooth execution of all chapter activities.',
 'carlos.rivera@dlsu.edu.ph',
 '#',
 '#',
 'https://placehold.co/400x400?text=Carlos+Rivera',
 1),

('Anna Chen',
 'Vice President for External Affairs',
 'executive',
 '4th Year Marketing',
 NULL,
 'Building partnerships and managing relationships with external stakeholders and sponsors.',
 'anna.chen@dlsu.edu.ph',
 '#',
 '#',
 'https://placehold.co/400x400?text=Anna+Chen',
 2),

('Miguel Reyes',
 'Secretary',
 'executive',
 '3rd Year Political Science',
 NULL,
 'Maintaining records, documentation, and communications for the organization.',
 'miguel.reyes@dlsu.edu.ph',
 '#',
 '#',
 'https://placehold.co/400x400?text=Miguel+Reyes',
 3),

('Patricia Lim',
 'Treasurer',
 'executive',
 '4th Year Accountancy',
 NULL,
 'Managing finances, budgets, and ensuring transparent fund allocation for all projects.',
 'patricia.lim@dlsu.edu.ph',
 '#',
 '#',
 'https://placehold.co/400x400?text=Patricia+Lim',
 4),

-- Committee Heads
('Roberto Cruz',
 'Build Projects Head',
 'committee',
 '4th Year Civil Engineering',
 NULL,
 NULL,
 'roberto.cruz@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=Roberto+Cruz',
 0),

('Lisa Gonzales',
 'Volunteer Management Head',
 'committee',
 '3rd Year Psychology',
 NULL,
 NULL,
 'lisa.gonzales@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=Lisa+Gonzales',
 1),

('Mark Tan',
 'Communications & Marketing Head',
 'committee',
 '4th Year Communication',
 NULL,
 NULL,
 'mark.tan@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=Mark+Tan',
 2),

('Sarah Rodriguez',
 'Fundraising & Events Head',
 'committee',
 '3rd Year Business Management',
 NULL,
 NULL,
 'sarah.rodriguez@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=Sarah+Rodriguez',
 3),

('James Villanueva',
 'Sustainability Head',
 'committee',
 '4th Year Environmental Science',
 NULL,
 NULL,
 'james.villanueva@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=James+Villanueva',
 4),

('Nicole Torres',
 'Training & Development Head',
 'committee',
 '3rd Year Education',
 NULL,
 NULL,
 'nicole.torres@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=Nicole+Torres',
 5),

-- Advisors
('Dr. Emmanuel Garcia',
 'Faculty Advisor',
 'advisor',
 NULL,
 'College of Liberal Arts',
 'Guiding HFHGC students in community engagement and social development initiatives for over 10 years.',
 'emmanuel.garcia@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=Dr.+Emmanuel+Garcia',
 0),

('Engr. Rosa Martinez',
 'Technical Advisor',
 'advisor',
 NULL,
 'Gokongwei College of Engineering',
 'Providing technical expertise in construction methods and sustainable building practices.',
 'rosa.martinez@dlsu.edu.ph',
 NULL,
 NULL,
 'https://placehold.co/400x400?text=Engr.+Rosa+Martinez',
 1);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  ALUMNI TESTIMONIALS                                                   ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO alumni_testimonials (name, year, quote, current_position, image_url, sort_order) VALUES

('David Santos',
 'Alumni - Class of 2024',
 'HFHGC was life-changing. I went from not knowing how to hold a hammer to leading build teams. The friendships and skills I gained here shaped who I am today.',
 'Project Engineer at BuildPH',
 'https://placehold.co/400x400?text=David+Santos',
 0),

('Isabel Cruz',
 'Alumni - Class of 2023',
 'Being part of HFHGC taught me that real leadership is about service. The families we helped and the community we built will always hold a special place in my heart.',
 'Community Development Officer',
 'https://placehold.co/400x400?text=Isabel+Cruz',
 1);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  BLOG POSTS                                                            ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO blog_posts (title, slug, excerpt, content, author_name, author_role, category, tags, image_url, read_time, is_featured, is_published, published_at) VALUES

-- Post 1 (Featured)
('Building Dreams: Our Latest Community Project in Tondo',
 'building-dreams-tondo',
 'This month, we completed our 15th home build in partnership with the Tondo community. Read about the incredible journey of the Santos family and how they finally have a place to call home.',
 '<p>After months of planning, fundraising, and hard work, we''re thrilled to announce the completion of our latest home build project in Tondo, Manila. The Santos family—composed of Maria, her husband Jose, and their three children—now have a safe, sturdy home to call their own.</p>

<h2>The Journey</h2>
<p>The project began in January when we first met the Santos family. Living in a makeshift structure with a leaking roof and unstable walls, they dreamed of a proper home where their children could study and play safely. Through our partnership with local government units and generous donations from DLSU students and alumni, we were able to make this dream a reality.</p>

<h2>Community Effort</h2>
<p>Over 50 volunteers from DLSU participated in the build, working weekends for three months. Students from various colleges came together—from engineering students helping with structural work to management students organizing logistics. This project truly embodied our motto: "Building Homes, Building Hope."</p>

<blockquote>"I never thought this day would come. Thank you to all the young people who gave their time and energy to help our family. You are all angels." - Maria Santos</blockquote>

<h2>What''s Next</h2>
<p>The Santos family''s story is just one of many. We have three more builds planned for this year, and we''re always looking for volunteers and partners. If you''re interested in joining our next build, check out our volunteer opportunities page.</p>',
 'Patricia Reyes',
 'Project Lead',
 'Community Stories',
 ARRAY['Community Build', 'Tondo', 'Family Stories'],
 'https://placehold.co/800x500?text=Tondo+Community+Build',
 '5 min read',
 true,
 true,
 '2026-02-28T10:00:00Z'),

-- Post 2
('Sustainability in Action: Eco-Friendly Building Materials',
 'sustainability-in-action',
 'Learn how we''re integrating sustainable practices into our builds, from bamboo framing to solar panels. Discover the innovative materials we''re using to create environmentally responsible homes.',
 '<p>At Habitat for Humanity Green Chapter, our commitment to sustainability goes beyond just our name. We''re actively incorporating eco-friendly building materials and practices into every project we undertake.</p>

<h2>Bamboo: Nature''s Building Material</h2>
<p>Bamboo has become one of our primary materials. It''s renewable, grows rapidly, and is incredibly strong. We''ve partnered with local bamboo suppliers to ensure sustainable harvesting practices while supporting local economies.</p>

<h2>Solar Solutions</h2>
<p>Thanks to a partnership with SolarPhilippines, we''re now able to install basic solar panel systems in our homes. This reduces electricity costs for families and decreases their carbon footprint.</p>

<h2>Rainwater Harvesting</h2>
<p>Each new home includes a rainwater collection system. This provides families with an additional water source and reduces strain on municipal water systems.</p>

<h2>Impact by Numbers</h2>
<ul>
  <li>15 homes built with sustainable materials this year</li>
  <li>30% reduction in construction waste through recycling</li>
  <li>Average of 40% energy savings for families with solar installations</li>
</ul>',
 'Miguel Santos',
 'Sustainability Coordinator',
 'Sustainability',
 ARRAY['Green Building', 'Solar Energy', 'Sustainability'],
 'https://placehold.co/800x500?text=Eco-Friendly+Materials',
 '7 min read',
 false,
 true,
 '2026-02-20T10:00:00Z'),

-- Post 3
('Volunteer Spotlight: How Students Are Making a Difference',
 'volunteer-spotlight',
 'Meet some of our dedicated volunteers who give their time and energy every weekend. Hear their stories and why they chose to be part of the Habitat for Humanity movement.',
 '<p>Behind every successful build are the countless volunteers who dedicate their weekends, energy, and passion to helping families achieve their dream of homeownership. Today, we''re spotlighting three incredible DLSU students who exemplify the spirit of service.</p>

<h2>Anna Chen - Civil Engineering, 3rd Year</h2>
<p>"I joined Habitat because I wanted to apply what I''m learning in class to real-world projects. There''s nothing quite like seeing a family move into a home you helped build. It''s changed my perspective on why I''m studying engineering."</p>
<p>Anna has participated in 8 builds and recently took on a leadership role, training new volunteers in basic construction safety.</p>

<h2>Carlos Rivera - Business Management, 4th Year</h2>
<p>"I may not be the best with a hammer, but I found my place in Habitat through logistics and fundraising. Every build needs people behind the scenes making sure we have materials, permits, and resources."</p>
<p>Carlos has helped secure over ₱500,000 in donations and in-kind support for our projects this year.</p>

<h2>Sarah Lim - Psychology, 2nd Year</h2>
<p>"What drew me to Habitat was the human connection. Yes, we''re building houses, but we''re really building relationships and communities. The friendships I''ve made—with fellow volunteers and the families we serve—are priceless."</p>
<p>Sarah coordinates our family partnership program, ensuring families feel supported throughout the building process.</p>

<h2>Join Our Team</h2>
<p>Interested in becoming a volunteer? We welcome students from all courses and backgrounds. No experience necessary—just bring your enthusiasm and willingness to help!</p>',
 'Lisa Gonzales',
 'Volunteer Coordinator',
 'Volunteers',
 ARRAY['Volunteers', 'Student Stories', 'Community'],
 'https://placehold.co/800x500?text=Volunteer+Spotlight',
 '6 min read',
 false,
 true,
 '2026-02-15T10:00:00Z'),

-- Post 4
('Partnership Announcement: Collaboration with BuildPH Foundation',
 'partnership-buildph',
 'We''re excited to announce our new partnership with BuildPH Foundation, which will enable us to double our building capacity and reach more families in need across Metro Manila.',
 '<p>Habitat for Humanity Green Chapter is thrilled to announce a groundbreaking partnership with BuildPH Foundation that will significantly expand our impact across Metro Manila.</p>

<h2>What This Means</h2>
<p>This partnership brings together BuildPH''s expertise in large-scale construction management with our community-focused approach and passionate volunteer base. Together, we''ll be able to:</p>
<ul>
  <li>Double our annual home construction from 20 to 40 homes</li>
  <li>Access better pricing on construction materials through bulk purchasing</li>
  <li>Provide skills training workshops for our volunteers</li>
  <li>Expand into three new communities: Payatas, Navotas, and Parañaque</li>
</ul>

<h2>Shared Vision</h2>
<p>"We''ve been following the incredible work of DLSU''s Green Chapter for years," says Roberto Aquino, CEO of BuildPH Foundation. "Their student-led model is inspiring, and we believe that by combining forces, we can create lasting change in more communities."</p>

<h2>Looking Ahead</h2>
<p>The first joint project under this partnership will break ground in April 2026 in Payatas. We''re planning a community center alongside 10 residential homes, creating a hub for education, healthcare, and social services.</p>

<p>This partnership represents a new chapter for our organization, and we couldn''t be more excited about the possibilities ahead.</p>',
 'Mark Villanueva',
 'Executive Director',
 'Announcements',
 ARRAY['Partnership', 'Announcement', 'Expansion'],
 'https://placehold.co/800x500?text=BuildPH+Partnership',
 '4 min read',
 false,
 true,
 '2026-02-10T10:00:00Z'),

-- Post 5
('Construction 101: What Volunteers Learn on the Build Site',
 'construction-101',
 'From mixing cement to raising walls, our build sites are outdoor classrooms. Discover the practical skills and life lessons volunteers gain through hands-on construction work.',
 '<p>When students join us for their first build day, many have never held a hammer or mixed concrete. By the end of the day, they''ve not only learned practical construction skills but also valuable lessons about teamwork, perseverance, and community service.</p>

<h2>Week 1: Foundation and Safety</h2>
<p>Every volunteer starts with safety training. We cover proper use of tools, site hazards, and protective equipment. Then it''s time to dig in—literally. Foundation work teaches patience and precision, as everything built afterward depends on a solid base.</p>

<h2>Week 2-3: Framing and Walls</h2>
<p>This is where volunteers really see the house take shape. Under the guidance of our experienced contractors and engineering student leaders, volunteers learn to measure, cut, and assemble the frame. It''s physically demanding but incredibly rewarding.</p>

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
<p>"The skills I learned at Habitat helped me land my first internship," says former volunteer James Tan. "But more importantly, it taught me that I have the power to make a real difference in people''s lives."</p>',
 'Roberto Cruz',
 'Site Supervisor',
 'Education',
 ARRAY['Skills Training', 'Education', 'Volunteer Experience'],
 'https://placehold.co/800x500?text=Construction+101',
 '8 min read',
 false,
 true,
 '2026-02-05T10:00:00Z');


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  TESTIMONIALS (Homie Center carousel)                                  ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO testimonials (name, role, quote, photo_url, sort_order) VALUES

('Maria Santos',
 'Former President, Batch 2023–2024',
 'HFHGC didn''t just teach me how to build houses — it taught me how to build people. Seeing a family move into a home you helped construct is an experience words can''t fully capture.',
 'https://placehold.co/200x200?text=Maria+Santos',
 0),

('Carlos Rivera',
 'Build Volunteer, Civil Engineering',
 'I was nervous joining my first build with zero experience. But the team was incredibly welcoming. Three builds later, I''m now helping train new volunteers myself.',
 'https://placehold.co/200x200?text=Carlos+Rivera',
 1),

('Anna Chen',
 'VP for External Affairs, Batch 2024–2025',
 'The partnerships I helped build through HFHGC have opened doors I never imagined. It''s proof that when students take action, the corporate world takes notice.',
 'https://placehold.co/200x200?text=Anna+Chen',
 2),

('James Reyes',
 'Fundraising Committee Head',
 'Planning our annual gala from scratch was the hardest thing I''ve done in college. It was also the most rewarding. We raised enough for two homes that year.',
 'https://placehold.co/200x200?text=James+Reyes',
 3),

('Sofia Lim',
 'Communications Officer',
 'Being part of HFHGC changed how I see my role as a student. It''s not just about grades — it''s about using your skills to lift others up.',
 'https://placehold.co/200x200?text=Sofia+Lim',
 4);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  ANNOUNCEMENTS                                                         ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO announcements (title, body, tag, image_url, published_at) VALUES

('General Assembly — March 20, 2026',
 'Our monthly GA is happening this Friday at Yuchengco Hall, 6:00–8:00 PM. Agenda includes updates on the Tondo Build, committee presentations, and AY 2026–2027 officer elections. All active members are required to attend.',
 'Event',
 'https://placehold.co/600x400?text=General+Assembly',
 '2026-03-18T10:00:00Z'),

('Applications for New Members Now Open!',
 'We are officially opening applications for new members for the first semester of AY 2026–2027! Fill out the interest form on our Facebook page or visit us during Recruitment Week. Slots are limited — apply early!',
 'Recruitment',
 'https://placehold.co/600x400?text=Recruitment+Open',
 '2026-03-12T10:00:00Z'),

('Laguna Build Weekend — Registration Now Closed',
 'Thank you to everyone who signed up for our March 15–16 build in Barangay San Jose, Laguna! All 30 volunteer slots have been filled. Stay tuned for photos and updates after the build.',
 'Project Update',
 'https://placehold.co/600x400?text=Laguna+Build+Weekend',
 '2026-03-05T10:00:00Z'),

('Santos Family Home — Officially Turned Over!',
 'We are proud to announce the successful turnover of the Santos Family home in Tondo, Manila. This project involved 50 volunteers over three weekends. Read the full story on our blog.',
 'Milestone',
 'https://placehold.co/600x400?text=Santos+Family+Turnover',
 '2026-02-28T10:00:00Z');


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  FAQs                                                                  ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO faqs (question, answer, sort_order) VALUES

('What is Habitat for Humanity Green Chapter?',
 'Habitat for Humanity Green Chapter (HFHGC) is a student organization at De La Salle University Manila that serves as the university arm of Habitat for Humanity Philippines. We aim to build homes, communities, and hope through volunteerism and advocacy.',
 0),

('How can I join the organization?',
 'Membership recruitment usually happens during the annual CSO Recruitment Week (RecWeek) at DLSU. Keep an eye on our social media pages for announcements regarding application dates and procedures.',
 1),

('Do I need prior construction experience to volunteer?',
 'Not at all! We welcome volunteers of all skill levels. Professional site supervisors and experienced student leaders will guide you through every task during our builds.',
 2),

('Where do your projects usually take place?',
 'Our projects are primarily located in partner communities within Metro Manila and nearby provinces like Laguna and Rizal. We coordinate closely with Habitat for Humanity Philippines for site selection.',
 3),

('How can my company partner with HFHGC?',
 'We offer various partnership opportunities including corporate builds, sponsorships, and in-kind donations. Please visit our Partnerships page or reach out to us via the Contact Us form.',
 4),

('Are there age restrictions for volunteers?',
 'For safety reasons, volunteers for construction builds must be at least 18 years old. However, we have other non-construction activities and advocacy campaigns suitable for younger participants.',
 5),

('How are donations used?',
 'All funds go directly toward building materials, logistics, and community development. We maintain full transparency on project costs and produce post-build reports for partners and donors.',
 6),

('Can I volunteer if I''m not a DLSU student?',
 'Yes! While our core membership is made up of DLSU students, we welcome volunteers from outside the university for community builds and special events. Contact us to find out about current opportunities.',
 7);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  PARTNERS                                                              ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO partners (name, description, is_past, image_url, website, since_year, sort_order) VALUES

-- Current Partners
('BuildPH Foundation',
 'Our premier construction partner, providing materials and expertise for large-scale builds.',
 false,
 'https://placehold.co/300x150?text=BuildPH+Foundation',
 '#',
 '2023',
 0),

('SolarPhilippines',
 'Provides solar panel systems and installation for every home we build, reducing energy costs for families.',
 false,
 'https://placehold.co/300x150?text=SolarPhilippines',
 '#',
 '2024',
 1),

('DLSU College of Engineering',
 'Contributes student expertise, technical supervision, and engineering resources to our build projects.',
 false,
 'https://placehold.co/300x150?text=DLSU+College+of+Engineering',
 '#',
 '2022',
 2),

('GreenBuild Materials Co.',
 'Supplies eco-friendly and sustainable construction materials at discounted rates for all our projects.',
 false,
 'https://placehold.co/300x150?text=GreenBuild+Materials',
 '#',
 '2024',
 3),

('Bamboo Republic PH',
 'Provides locally sourced bamboo materials and advocates for sustainable construction in the Philippines.',
 false,
 'https://placehold.co/300x150?text=Bamboo+Republic+PH',
 '#',
 '2025',
 4),

('Lasallian Mission Office',
 'Supports our mission through institutional backing, coordinating NSTP credits and service hours for students.',
 false,
 'https://placehold.co/300x150?text=Lasallian+Mission+Office',
 '#',
 '2021',
 5),

-- Past Partners
('MetroBank Foundation',
 NULL,
 true,
 'https://placehold.co/200x100?text=MetroBank+Foundation',
 NULL,
 NULL,
 10),

('Ayala Foundation',
 NULL,
 true,
 'https://placehold.co/200x100?text=Ayala+Foundation',
 NULL,
 NULL,
 11),

('SM Foundation',
 NULL,
 true,
 'https://placehold.co/200x100?text=SM+Foundation',
 NULL,
 NULL,
 12),

('Globe Telecom CSR',
 NULL,
 true,
 'https://placehold.co/200x100?text=Globe+Telecom+CSR',
 NULL,
 NULL,
 13),

('PLDT Smart Foundation',
 NULL,
 true,
 'https://placehold.co/200x100?text=PLDT+Smart+Foundation',
 NULL,
 NULL,
 14),

('BDO Foundation',
 NULL,
 true,
 'https://placehold.co/200x100?text=BDO+Foundation',
 NULL,
 NULL,
 15),

('Jollibee Group Foundation',
 NULL,
 true,
 'https://placehold.co/200x100?text=Jollibee+Group+Foundation',
 NULL,
 NULL,
 16),

('RCBC Foundation',
 NULL,
 true,
 'https://placehold.co/200x100?text=RCBC+Foundation',
 NULL,
 NULL,
 17);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  PARTNER TESTIMONIALS                                                  ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO partner_testimonials (name, title, quote, image_url, sort_order) VALUES

('Roberto Aquino',
 'CEO, BuildPH Foundation',
 'Partnering with HFHGC has been one of the most meaningful CSR experiences our company has undertaken. Seeing our employees build alongside families was transformative.',
 'https://placehold.co/100x100?text=Roberto+Aquino',
 0),

('Diana Santos',
 'CSR Head, SolarPhilippines',
 'The level of organization and dedication from these student leaders is truly remarkable. HFHGC doesn''t just build houses — they build futures. We''re proud to be their solar partner.',
 'https://placehold.co/100x100?text=Diana+Santos',
 1),

('Fr. Manuel Cruz',
 'Director, Lasallian Mission Office',
 'Supporting HFHGC aligns perfectly with our university''s mission of service. It''s a genuine partnership where every contribution directly uplifts a family.',
 'https://placehold.co/100x100?text=Fr.+Manuel+Cruz',
 2);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  PARTNERSHIP BENEFITS (Why Partner With Us)                            ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

INSERT INTO partnership_benefits (title, description, icon_name, sort_order) VALUES
('Direct Community Impact',
 'Every peso goes straight to funding materials, logistics, and community development. Your support builds real homes for real families.',
 'Heart',
 0),

('Brand Visibility',
 'Gain meaningful exposure among the DLSU community, Metro Manila businesses, and a growing network of 500+ active volunteers and alumni.',
 'Building',
 1),

('Employee Engagement',
 'Give your team a hands-on CSR experience. Corporate builds are powerful team-building activities that leave a lasting mark on employees and communities alike.',
 'Users',
 2),

('Verified CSR Recognition',
 'Receive official documentation, certificates, and coverage that supports your company''s CSR reporting and ESG commitments.',
 'CheckCircle',
 3);


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  PARTNERSHIP IMPACT STATS                                              ║
-- ╚══════════════════════════════════════════════════════════════════════════╝
-- Add partnership-specific stats to the existing impact_stats table

INSERT INTO impact_stats (label, value, icon_name, sort_order) VALUES
('12+', 'Active Partners', 'Handshake', 10),
('₱3.2M', 'Raised Through Partnerships', 'Heart', 11),
('80+', 'Corporate Volunteers', 'Users', 12),
('6', 'Years of Collaboration', 'Globe', 13);


-- ============================================================================
-- Done! All tables populated safely.
-- ============================================================================
