import { motion } from 'motion/react';
import { Handshake, Heart, Building, Users, Star, CheckCircle, Award, Globe, Mail, Phone } from 'lucide-react';

const partnershipTiers = [
  {
    tier: 'Gold Partner',
    price: '₱100,000+',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-400',
    icon: Star,
    perks: [
      'Logo on all build site banners and jerseys',
      'Feature in all social media campaigns',
      'Dedicated blog post and press release',
      'VIP slots for 10 employees in corporate build',
      'Annual impact report with branding',
      'Speaking opportunity at gala events',
    ]
  },
  {
    tier: 'Silver Partner',
    price: '₱50,000+',
    color: 'bg-gray-300',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-400',
    icon: Award,
    perks: [
      'Logo on build site banners',
      'Feature in select social media posts',
      'Mention in quarterly newsletter',
      '5 employee slots in corporate build',
      'Certificate of partnership',
    ]
  },
  {
    tier: 'Community Partner',
    price: '₱20,000+',
    color: 'bg-[var(--color-green-3)]',
    textColor: 'text-white',
    borderColor: 'border-[var(--color-green-3)]',
    icon: Globe,
    perks: [
      'Logo on HFHGC website',
      'Social media shoutout',
      '2 employee slots in community build',
      'Certificate of partnership',
    ]
  },
  {
    tier: 'In-Kind Sponsor',
    price: 'Materials / Services',
    color: 'bg-[var(--color-green-2)]',
    textColor: 'text-[var(--color-green-5)]',
    borderColor: 'border-[var(--color-green-2)]',
    icon: Heart,
    perks: [
      'Recognition on website and social media',
      'Acknowledgment at turnover ceremonies',
      'Certificate of appreciation',
    ]
  }
];

const currentPartners = [
  {
    name: 'BuildPH Foundation',
    tier: 'Gold Partner',
    tierColor: 'bg-yellow-400 text-yellow-800',
    description: 'Our premier construction partner, providing materials and expertise for large-scale builds.',
    since: '2023',
    image: 'https://picsum.photos/seed/buildph/300/150',
    website: '#'
  },
  {
    name: 'SolarPhilippines',
    tier: 'Gold Partner',
    tierColor: 'bg-yellow-400 text-yellow-800',
    description: 'Provides solar panel systems and installation for every home we build, reducing energy costs for families.',
    since: '2024',
    image: 'https://picsum.photos/seed/solarphi/300/150',
    website: '#'
  },
  {
    name: 'DLSU College of Engineering',
    tier: 'Silver Partner',
    tierColor: 'bg-gray-300 text-gray-700',
    description: 'Contributes student expertise, technical supervision, and engineering resources to our build projects.',
    since: '2022',
    image: 'https://picsum.photos/seed/dlsueng/300/150',
    website: '#'
  },
  {
    name: 'GreenBuild Materials Co.',
    tier: 'Silver Partner',
    tierColor: 'bg-gray-300 text-gray-700',
    description: 'Supplies eco-friendly and sustainable construction materials at discounted rates for all our projects.',
    since: '2024',
    image: 'https://picsum.photos/seed/greenbuild/300/150',
    website: '#'
  },
  {
    name: 'Bamboo Republic PH',
    tier: 'Community Partner',
    tierColor: 'bg-[var(--color-green-3)] text-white',
    description: 'Provides locally sourced bamboo materials and advocates for sustainable construction in the Philippines.',
    since: '2025',
    image: 'https://picsum.photos/seed/bambooph/300/150',
    website: '#'
  },
  {
    name: 'Lasallian Mission Office',
    tier: 'Community Partner',
    tierColor: 'bg-[var(--color-green-3)] text-white',
    description: 'Supports our mission through institutional backing, coordinating NSTP credits and service hours for students.',
    since: '2021',
    image: 'https://picsum.photos/seed/lmo/300/150',
    website: '#'
  }
];

const pastPartners = [
  { name: 'MetroBank Foundation', image: 'https://picsum.photos/seed/metrobank/200/100' },
  { name: 'Ayala Foundation', image: 'https://picsum.photos/seed/ayala/200/100' },
  { name: 'SM Foundation', image: 'https://picsum.photos/seed/sm/200/100' },
  { name: 'Globe Telecom CSR', image: 'https://picsum.photos/seed/globe/200/100' },
  { name: 'PLDT Smart Foundation', image: 'https://picsum.photos/seed/pldt/200/100' },
  { name: 'BDO Foundation', image: 'https://picsum.photos/seed/bdo/200/100' },
  { name: 'Jollibee Group Foundation', image: 'https://picsum.photos/seed/jgf/200/100' },
  { name: 'RCBC Foundation', image: 'https://picsum.photos/seed/rcbc/200/100' },
];

const impactStats = [
  { value: '12+', label: 'Active Partners', icon: Handshake },
  { value: '₱3.2M', label: 'Raised Through Partnerships', icon: Heart },
  { value: '80+', label: 'Corporate Volunteers', icon: Users },
  { value: '6', label: 'Years of Collaboration', icon: Globe },
];

const whyPartnerReasons = [
  {
    icon: Heart,
    color: 'bg-[var(--color-green-1)]',
    iconColor: 'text-[var(--color-green-5)]',
    title: 'Direct Community Impact',
    description: 'Every peso goes straight to funding materials, logistics, and community development. Your support builds real homes for real families.'
  },
  {
    icon: Building,
    color: 'bg-[var(--color-green-2)]',
    iconColor: 'text-[var(--color-green-4)]',
    title: 'Brand Visibility',
    description: 'Gain meaningful exposure among the DLSU community, Metro Manila businesses, and a growing network of 500+ active volunteers and alumni.'
  },
  {
    icon: Users,
    color: 'bg-[var(--color-green-3)]',
    iconColor: 'text-white',
    title: 'Employee Engagement',
    description: 'Give your team a hands-on CSR experience. Corporate builds are powerful team-building activities that leave a lasting mark on employees and communities alike.'
  },
  {
    icon: CheckCircle,
    color: 'bg-[var(--color-green-4)]',
    iconColor: 'text-white',
    title: 'Verified CSR Recognition',
    description: 'Receive official documentation, certificates, and coverage that supports your company\'s CSR reporting and ESG commitments.'
  }
];

export default function Partnerships() {
  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">

      {/* Hero */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6">
              Partnerships & Sponsors
            </h1>
            <p className="text-xl text-[var(--color-green-1)] max-w-3xl mx-auto mb-10">
              Building homes takes more than hammers and nails — it takes community. Join us as a partner and help transform lives across Metro Manila.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#partner-tiers"
                className="bg-white text-[var(--color-green-5)] hover:bg-[var(--color-green-1)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                View Partnership Tiers
              </a>
              <a
                href="/contact"
                className="bg-[var(--color-green-4)] hover:bg-[var(--color-green-3)] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                Become a Partner
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--color-green-1)] p-6 rounded-2xl scrapbook-border text-center"
              >
                <stat.icon className="mx-auto mb-3 text-[var(--color-green-5)]" size={32} />
                <p className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-[var(--color-text-main)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 bg-[var(--color-bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Why Partner With Us?</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              A partnership with HFHGC is more than a sponsorship — it's a commitment to building hope alongside us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyPartnerReasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl scrapbook-border scrapbook-shadow flex gap-6 items-start"
              >
                <div className={`${reason.color} p-4 rounded-full flex-shrink-0`}>
                  <reason.icon className={reason.iconColor} size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-text-main)] mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section id="partner-tiers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Partnership Tiers</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              Choose the level of involvement that works best for your organization. All partnerships include formal recognition and impact documentation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipTiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`bg-white rounded-2xl scrapbook-shadow overflow-hidden border-t-8 ${tier.borderColor}`}
              >
                <div className={`${tier.color} px-6 py-5`}>
                  <tier.icon className={`${tier.textColor} mb-2`} size={32} />
                  <h3 className={`text-xl font-heading font-bold ${tier.textColor}`}>{tier.tier}</h3>
                  <p className={`text-lg font-bold ${tier.textColor} mt-1`}>{tier.price}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="text-[var(--color-green-4)] flex-shrink-0 mt-0.5" size={16} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            Custom partnership arrangements are also welcome. <a href="/contact" className="text-[var(--color-green-5)] font-bold hover:underline">Contact us</a> to discuss your needs.
          </p>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20 bg-[var(--color-bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">Our Current Partners</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              We're proud to work alongside these incredible organizations who share our vision of homes, communities, and hope.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPartners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden scrapbook-border scrapbook-shadow group"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-heading font-bold text-[var(--color-text-main)]">{partner.name}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ml-2 ${partner.tierColor}`}>
                      {partner.tier}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{partner.description}</p>
                  <p className="text-xs text-[var(--color-green-4)] font-semibold">Partner since {partner.since}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Partners Logo Wall */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-3">Past Supporters</h2>
            <p className="text-[var(--color-text-main)]">Organizations that have generously supported our mission over the years.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {pastPartners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-[var(--color-bg-main)] aspect-video rounded-xl flex flex-col items-center justify-center p-5 scrapbook-border grayscale hover:grayscale-0 transition-all duration-300 group"
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-w-full max-h-14 object-contain mb-2"
                  referrerPolicy="no-referrer"
                />
                <p className="text-xs text-center font-semibold text-gray-400 group-hover:text-[var(--color-green-5)] transition-colors">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Build Experience */}
      <section className="py-20 bg-[var(--color-bg-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-6">The Corporate Build Experience</h2>
              <p className="text-lg text-[var(--color-text-main)] mb-6">
                Our corporate build program offers your team a unique opportunity to step off the office floor and onto a construction site — building not just a home, but lasting bonds and a deeper sense of purpose.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Full safety orientation and tool training provided',
                  'Dedicated HFHGC team leader assigned to your group',
                  'Professional photography and documentation included',
                  'Flexible scheduling: weekdays or weekends',
                  'Groups of 10–50 employees accommodated',
                  'Certificate of participation for all volunteers',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[var(--color-text-main)]">
                    <CheckCircle className="text-[var(--color-green-4)] flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="inline-block bg-[var(--color-green-5)] hover:bg-[var(--color-green-4)] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow"
              >
                Schedule a Corporate Build
              </a>
            </div>
            <div className="polaroid rotate-2">
              <img
                src="https://picsum.photos/seed/corpbuild2025/600/450"
                alt="Corporate volunteers at a build site"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <p className="font-heading text-center mt-4 text-xl text-[var(--color-text-main)]">Corporate Build 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">What Our Partners Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Partnering with HFHGC has been one of the most meaningful CSR experiences our company has undertaken. Seeing our employees build alongside families was transformative.",
                name: "Roberto Aquino",
                title: "CEO, BuildPH Foundation",
                image: "https://i.pravatar.cc/100?img=11"
              },
              {
                quote: "The level of organization and dedication from these student leaders is truly remarkable. HFHGC doesn't just build houses — they build futures. We're proud to be their solar partner.",
                name: "Diana Santos",
                title: "CSR Head, SolarPhilippines",
                image: "https://i.pravatar.cc/100?img=5"
              },
              {
                quote: "Supporting HFHGC aligns perfectly with our university's mission of service. It's a genuine partnership where every contribution directly uplifts a family.",
                name: "Fr. Manuel Cruz",
                title: "Director, Lasallian Mission Office",
                image: "https://i.pravatar.cc/100?img=33"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-[var(--color-green-1)] p-8 rounded-2xl scrapbook-shadow relative"
              >
                <p className="text-5xl font-heading text-[var(--color-green-4)] absolute -top-2 left-6 leading-none">"</p>
                <p className="text-[var(--color-text-main)] mb-6 mt-4 italic">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-[var(--color-green-4)]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-heading font-bold text-[var(--color-green-5)]">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[var(--color-green-5)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Handshake className="mx-auto mb-6 text-[var(--color-green-2)]" size={64} />
          <h2 className="text-4xl font-heading font-bold mb-6">Ready to Collaborate?</h2>
          <p className="text-xl text-[var(--color-green-1)] max-w-2xl mx-auto mb-10">
            Whether you're a corporation, a local business, or another student organization, we'd love to build something meaningful together.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-[var(--color-green-1)]">
              <Mail size={20} />
              <span>partnerships@hfhgc.org</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-green-1)]">
              <Phone size={20} />
              <span>+63 912 345 6789</span>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-block bg-white text-[var(--color-green-5)] hover:bg-[var(--color-green-1)] font-bold py-4 px-12 rounded-full transition-transform hover:scale-105 scrapbook-shadow text-lg"
          >
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  );
}
