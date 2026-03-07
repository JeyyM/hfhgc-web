import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is Habitat for Humanity Green Chapter?",
    answer: "Habitat for Humanity Green Chapter (HFHGC) is a student organization at De La Salle University Manila that serves as the university arm of Habitat for Humanity Philippines. We aim to build homes, communities, and hope through volunteerism and advocacy."
  },
  {
    question: "How can I join the organization?",
    answer: "Membership recruitment usually happens during the annual CSO Recruitment Week (RecWeek) at DLSU. Keep an eye on our social media pages for announcements regarding application dates and procedures."
  },
  {
    question: "Do I need prior construction experience to volunteer?",
    answer: "Not at all! We welcome volunteers of all skill levels. Professional site supervisors and experienced student leaders will guide you through the tasks during our builds."
  },
  {
    question: "Where do your projects usually take place?",
    answer: "Our projects are primarily located in partner communities within Metro Manila and nearby provinces like Laguna and Rizal. We coordinate closely with Habitat for Humanity Philippines for site selection."
  },
  {
    question: "How can my company partner with HFHGC?",
    answer: "We offer various partnership opportunities including corporate builds, sponsorships, and in-kind donations. Please visit our Partnerships page or reach out to us via the Contact Us form for more details."
  },
  {
    question: "Are there age restrictions for volunteers?",
    answer: "For safety reasons, volunteers for construction builds must be at least 18 years old. However, we have other non-construction activities and advocacy campaigns suitable for younger volunteers."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-heading font-bold text-[var(--color-green-5)] mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <p className="text-xl text-[var(--color-text-main)]">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl scrapbook-border scrapbook-shadow overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-xl font-heading font-bold text-[var(--color-text-main)] pr-8">
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-[var(--color-green-4)] text-white' : 'bg-[var(--color-green-1)] text-[var(--color-green-5)]'}`}>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 border-t border-gray-100 pt-4">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-[var(--color-text-main)] mb-6">Still have questions?</p>
          <a href="/contact" className="inline-block bg-[var(--color-green-2)] hover:bg-[var(--color-green-4)] text-[var(--color-text-main)] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow">
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
}
