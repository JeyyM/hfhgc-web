import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Bell, Quote, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Maria Santos',
    role: 'Former President, Batch 2023–2024',
    photo: 'https://i.pravatar.cc/200?img=1',
    quote:
      "HFHGC didn\u2019t just teach me how to build houses \u2014 it taught me how to build people. Seeing a family move into a home you helped construct is an experience words can\u2019t fully capture.",
  },
  {
    name: 'Carlos Rivera',
    role: 'Build Volunteer, Civil Engineering',
    photo: 'https://i.pravatar.cc/200?img=12',
    quote:
      "I was nervous joining my first build with zero experience. But the team was incredibly welcoming. Three builds later, I\u2019m now helping train new volunteers myself.",
  },
  {
    name: 'Anna Chen',
    role: 'VP for External Affairs, Batch 2024–2025',
    photo: 'https://i.pravatar.cc/200?img=5',
    quote:
      "The partnerships I helped build through HFHGC have opened doors I never imagined. It\u2019s proof that when students take action, the corporate world takes notice.",
  },
  {
    name: 'James Reyes',
    role: 'Fundraising Committee Head',
    photo: 'https://i.pravatar.cc/200?img=15',
    quote:
      "Planning our annual gala from scratch was the hardest thing I\u2019ve done in college. It was also the most rewarding. We raised enough for two homes that year.",
  },
  {
    name: 'Sofia Lim',
    role: 'Communications Officer',
    photo: 'https://i.pravatar.cc/200?img=9',
    quote:
      "Being part of HFHGC changed how I see my role as a student. It\u2019s not just about grades \u2014 it\u2019s about using your skills to lift others up.",
  },
];

// ─── Announcements ────────────────────────────────────────────────────────────
const announcements = [
  {
    id: 1,
    date: 'March 18, 2026',
    tag: 'Event',
    tagColor: 'bg-[var(--color-green-5)] text-white',
    title: 'General Assembly — March 20, 2026',
    body: 'Our monthly GA is happening this Friday at Yuchengco Hall, 6:00–8:00 PM. Agenda includes updates on the Tondo Build, committee presentations, and AY 2026–2027 officer elections. All active members are required to attend.',
    image: 'https://picsum.photos/seed/ann1/600/400',
  },
  {
    id: 2,
    date: 'March 12, 2026',
    tag: 'Recruitment',
    tagColor: 'bg-[var(--color-green-3)] text-white',
    title: 'Applications for New Members Now Open!',
    body: 'We are officially opening applications for new members for the first semester of AY 2026–2027! Fill out the interest form on our Facebook page or visit us during Recruitment Week. Slots are limited — apply early!',
    image: 'https://picsum.photos/seed/ann2/600/400',
  },
  {
    id: 3,
    date: 'March 5, 2026',
    tag: 'Project Update',
    tagColor: 'bg-[var(--color-green-4)] text-white',
    title: 'Laguna Build Weekend — Registration Now Closed',
    body: 'Thank you to everyone who signed up for our March 15–16 build in Barangay San Jose, Laguna! All 30 volunteer slots have been filled. Stay tuned for photos and updates after the build.',
    image: 'https://picsum.photos/seed/ann3/600/400',
  },
  {
    id: 4,
    date: 'February 28, 2026',
    tag: 'Milestone',
    tagColor: 'bg-orange-500 text-white',
    title: 'Santos Family Home — Officially Turned Over!',
    body: 'We are proud to announce the successful turnover of the Santos Family home in Tondo, Manila. This project involved 50 volunteers over three weekends. Read the full story on our blog.',
    image: 'https://picsum.photos/seed/blog1/600/400',
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'What is Habitat for Humanity Green Chapter?',
    answer:
      'Habitat for Humanity Green Chapter (HFHGC) is a student organization at De La Salle University Manila that serves as the university arm of Habitat for Humanity Philippines. We aim to build homes, communities, and hope through volunteerism and advocacy.',
  },
  {
    question: 'How can I join the organization?',
    answer:
      'Membership recruitment usually happens during the annual CSO Recruitment Week (RecWeek) at DLSU. Keep an eye on our social media pages for announcements regarding application dates and procedures.',
  },
  {
    question: 'Do I need prior construction experience to volunteer?',
    answer:
      'Not at all! We welcome volunteers of all skill levels. Professional site supervisors and experienced student leaders will guide you through every task during our builds.',
  },
  {
    question: 'Where do your projects usually take place?',
    answer:
      'Our projects are primarily located in partner communities within Metro Manila and nearby provinces like Laguna and Rizal. We coordinate closely with Habitat for Humanity Philippines for site selection.',
  },
  {
    question: 'How can my company partner with HFHGC?',
    answer:
      'We offer various partnership opportunities including corporate builds, sponsorships, and in-kind donations. Please visit our Partnerships page or reach out to us via the Contact Us form.',
  },
  {
    question: 'Are there age restrictions for volunteers?',
    answer:
      'For safety reasons, volunteers for construction builds must be at least 18 years old. However, we have other non-construction activities and advocacy campaigns suitable for younger participants.',
  },
  {
    question: 'How are donations used?',
    answer:
      'All funds go directly toward building materials, logistics, and community development. We maintain full transparency on project costs and produce post-build reports for partners and donors.',
  },
  {
    question: "Can I volunteer if I'm not a DLSU student?",
    answer:
      'Yes! While our core membership is made up of DLSU students, we welcome volunteers from outside the university for community builds and special events. Contact us to find out about current opportunities.',
  },
];

export default function HomiesCenter() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const goTo = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };
  const prev = () => goTo((currentSlide - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((currentSlide + 1) % testimonials.length);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">

      {/* Hero */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            Homie Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Stories from our community, the latest announcements, and answers to your questions — all in one place.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                <Quote className="text-white" size={28} />
              </div>
            </div>
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-3">What Our Homies Say</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-xl mx-auto">
              Hear directly from the students and volunteers who make HFHGC what it is.
            </p>
          </div>

          {/* Carousel Card */}
          <div className="relative bg-[var(--color-green-5)] rounded-3xl p-10 md:p-14 overflow-hidden scrapbook-shadow">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex flex-col md:flex-row items-center gap-10"
              >
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentSlide].photo}
                    alt={testimonials[currentSlide].name}
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white/40 shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <Quote className="text-white/30 mb-4" size={40} />
                  <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-6 italic">
                    "{testimonials[currentSlide].quote}"
                  </p>
                  <p className="text-white font-heading font-bold text-lg">{testimonials[currentSlide].name}</p>
                  <p className="text-white/70 text-sm">{testimonials[currentSlide].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="text-white" size={22} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="text-white" size={22} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-[var(--color-green-5)]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-24 bg-[var(--color-bg-main)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                <Bell className="text-white" size={28} />
              </div>
            </div>
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-3">Announcements</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-xl mx-auto">
              Stay up to date with the latest news, updates, and milestones from HFHGC.
            </p>
          </div>

          <div className="space-y-8">
            {announcements.map((ann, idx) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden scrapbook-border scrapbook-shadow flex flex-col sm:flex-row"
              >
                <div className="sm:w-64 flex-shrink-0">
                  <img
                    src={ann.image}
                    alt={ann.title}
                    className="w-full h-48 sm:h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${ann.tagColor}`}>{ann.tag}</span>
                    <span className="text-sm text-gray-400">{ann.date}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-3">{ann.title}</h3>
                  <p className="text-[var(--color-text-main)] text-sm leading-relaxed">{ann.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-[var(--color-green-5)] rounded-full flex items-center justify-center">
                <MessageCircleQuestion className="text-white" size={28} />
              </div>
            </div>
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-3">Frequently Asked Questions</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-xl mx-auto">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to reach out.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-[var(--color-bg-main)] rounded-2xl scrapbook-border scrapbook-shadow overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-heading font-bold text-[var(--color-text-main)] pr-8">
                    {faq.question}
                  </span>
                  <span className={`p-2 rounded-full flex-shrink-0 transition-colors ${openFaq === index ? 'bg-[var(--color-green-5)] text-white' : 'bg-[var(--color-green-1)] text-[var(--color-green-5)]'}`}>
                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 border-t border-gray-100 pt-4 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-lg text-[var(--color-text-main)] mb-6">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-block bg-[var(--color-green-5)] hover:bg-[var(--color-green-4)] text-white font-bold py-3 px-10 rounded-full transition-all hover:scale-105 scrapbook-shadow"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
