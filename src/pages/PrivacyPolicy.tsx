import { motion } from 'motion/react';
import { Shield, Eye, Lock, Database, Bell, Mail, UserCheck, Trash2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const LAST_UPDATED = 'May 27, 2026';
const ORG_NAME = 'Habitat for Humanity Green Chapter DLSU';
const ORG_EMAIL = 'hfhgc@dlsu.edu.ph';
const ORG_ADDRESS = 'De La Salle University, 2401 Taft Ave, Malate, Manila, 1004 Metro Manila';

interface Section {
  id: string;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'information-we-collect',
    icon: Database,
    title: 'Information We Collect',
    content: (
      <div className="space-y-4">
        <p>
          We collect information you voluntarily provide to us when you interact with our website,
          including when you submit our contact form or reach out to us directly. The types of
          information we may collect include:
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'Full name and email address submitted through our contact form',
            'Subject and message content of your inquiry',
            'Any other information you choose to include in your communications with us',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-green-5)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          We also automatically collect certain technical information when you visit our website,
          such as your browser type, operating system, referring URLs, and general geographic
          region (country/region level only). This data is collected through standard server logs
          and does not identify you personally.
        </p>
      </div>
    ),
  },
  {
    id: 'how-we-use',
    icon: Eye,
    title: 'How We Use Your Information',
    content: (
      <div className="space-y-4">
        <p>
          {ORG_NAME} uses the information we collect solely to carry out our student
          organization's activities and to communicate with you. Specifically, we use your
          information to:
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'Respond to your inquiries, questions, and messages',
            'Send updates about our projects, events, and volunteer opportunities — only when you have expressed interest',
            'Improve the content and usability of our website',
            'Comply with any applicable legal obligations',
            'Protect the security and integrity of our website',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-green-5)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          We do <strong>not</strong> use your information for advertising, profiling, or any
          automated decision-making processes. We do not sell, trade, or rent your personal
          information to third parties.
        </p>
      </div>
    ),
  },
  {
    id: 'data-sharing',
    icon: UserCheck,
    title: 'Data Sharing & Disclosure',
    content: (
      <div className="space-y-4">
        <p>
          We respect your privacy and will never sell or share your personal information with
          outside parties for marketing or commercial purposes. We may share your information
          only in the following limited circumstances:
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'With Habitat for Humanity Philippines (our national chapter) as required for organizational reporting',
            'With De La Salle University administration for student organization compliance purposes',
            'With trusted service providers (e.g., Supabase for secure data storage) who are bound by confidentiality agreements',
            'When required by law, court order, or governmental authority',
            'To protect the rights, property, or safety of our members, partners, or the public',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-green-5)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'cookies',
    icon: Lock,
    title: 'Cookies & Tracking Technologies',
    content: (
      <div className="space-y-4">
        <p>
          Our website uses minimal cookies and local storage technologies strictly necessary
          for the website to function. We do <strong>not</strong> use advertising cookies,
          cross-site tracking, or behavioral analytics platforms.
        </p>
        <p>The limited technologies we use include:</p>
        <ul className="space-y-2 pl-4">
          {[
            'Session tokens to keep admin users authenticated during their session',
            'Local/session storage to remember your preferences (e.g., "Remember me" on admin login)',
            'Standard browser caching to improve page load performance',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-green-5)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          You may configure your browser to block or delete cookies; however, some website
          features (such as the admin panel) may not function correctly without them.
        </p>
      </div>
    ),
  },
  {
    id: 'data-security',
    icon: Shield,
    title: 'Data Security',
    content: (
      <div className="space-y-4">
        <p>
          We take the security of your personal information seriously. We implement
          industry-standard measures to protect your data, including:
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'Encrypted data transmission via HTTPS/TLS on all pages',
            'Row-level security policies enforced at the database layer',
            'Admin access restricted to authenticated and authorized users only',
            'Rate limiting on our contact form to prevent spam and abuse',
            'Cloudflare Turnstile CAPTCHA to protect form submissions',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-green-5)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          While we strive to protect your personal information, no method of transmission
          over the Internet is 100% secure. We cannot guarantee absolute security, but we
          commit to notifying affected users promptly in the event of a data breach.
        </p>
      </div>
    ),
  },
  {
    id: 'data-retention',
    icon: Trash2,
    title: 'Data Retention',
    content: (
      <div className="space-y-4">
        <p>
          We retain personal information only for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy or as required by applicable law.
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'Contact form submissions are retained for up to 12 months for organizational records',
            'Admin session tokens expire automatically after 3 days of inactivity',
            'Website analytics data (non-personal) may be retained indefinitely for trend analysis',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-green-5)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          You may request deletion of your personal data at any time by contacting us at the
          address listed below.
        </p>
      </div>
    ),
  },
  {
    id: 'your-rights',
    icon: Bell,
    title: 'Your Rights',
    content: (
      <div className="space-y-4">
        <p>
          You have the following rights with respect to your personal information held by us:
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'Access — request a copy of the personal data we hold about you',
            'Correction — request that we correct inaccurate or incomplete information',
            'Deletion — request that we delete your personal information from our records',
            'Objection — object to our processing of your personal data',
            'Portability — request your data in a structured, machine-readable format',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-green-5)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          To exercise any of these rights, please contact us at{' '}
          <a href={`mailto:${ORG_EMAIL}`} className="text-[var(--color-green-5)] font-semibold hover:underline">
            {ORG_EMAIL}
          </a>
          . We will respond to your request within 30 days.
        </p>
      </div>
    ),
  },
  {
    id: 'changes',
    icon: RefreshCw,
    title: 'Changes to This Policy',
    content: (
      <div className="space-y-4">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our
          practices, legal requirements, or the services we offer. When we make material
          changes, we will update the "Last Updated" date at the top of this page.
        </p>
        <p>
          We encourage you to review this page periodically to stay informed about how we
          protect your information. Your continued use of our website after any changes
          constitutes your acceptance of the updated policy.
        </p>
      </div>
    ),
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Us',
    content: (
      <div className="space-y-4">
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or
          our data practices, please reach out to us:
        </p>
        <div className="bg-[var(--color-green-5)] rounded-2xl p-6 text-white scrapbook-shadow space-y-3">
          <p className="font-heading font-bold text-xl">{ORG_NAME}</p>
          <p className="flex items-start gap-2 text-white/90">
            <Mail size={18} className="flex-shrink-0 mt-0.5" />
            <a href={`mailto:${ORG_EMAIL}`} className="hover:underline">{ORG_EMAIL}</a>
          </p>
          <p className="text-white/80 text-sm leading-relaxed">{ORG_ADDRESS}</p>
        </div>
        <p>
          You may also use our{' '}
          <Link to="/contact" className="text-[var(--color-green-5)] font-semibold hover:underline">
            Contact Page
          </Link>{' '}
          to send us a message directly.
        </p>
      </div>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      <SEO
        title="Privacy Policy"
        description="Learn how Habitat for Humanity Green Chapter DLSU collects, uses, and protects your personal information."
        path="/policy"
      />

      {/* ── Hero ── */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Shield size={40} className="text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-heading font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            We are committed to protecting your privacy and being transparent about how
            we handle your personal information.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-4 text-sm text-white/60"
          >
            Last updated: {LAST_UPDATED}
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-green-1)]/20 border-l-4 border-[var(--color-green-5)] rounded-r-2xl p-6 mb-14"
          >
            <p className="text-[var(--color-text-main)] text-lg leading-relaxed">
              This Privacy Policy describes how <strong>{ORG_NAME}</strong> ("we", "us", or
              "our") collects, uses, and shares information about you when you visit our
              website at <strong>hfhgc.org</strong>. By using our website, you agree to the
              practices described in this policy.
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-[var(--color-green-3)] p-6 mb-14 scrapbook-shadow"
          >
            <h2 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Contents
            </h2>
            <ol className="space-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-[var(--color-text-main)] hover:text-[var(--color-green-5)] transition-colors group"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--color-green-5)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </span>
                    <span className="hover:underline">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  viewport={{ once: true, margin: '-60px' }}
                  className="scroll-mt-28"
                >
                  {/* Section header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-green-5)] flex items-center justify-center flex-shrink-0 scrapbook-shadow">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-[var(--color-green-5)]">
                      {i + 1}. {s.title}
                    </h2>
                  </div>

                  {/* Section body */}
                  <div className="pl-16 text-[var(--color-text-main)] text-base leading-relaxed">
                    {s.content}
                  </div>

                  {/* Divider */}
                  {i < sections.length - 1 && (
                    <div className="mt-12 border-t-2 border-dashed border-[var(--color-green-3)]" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <p className="text-[var(--color-text-main)] text-lg mb-6">
              Have questions about your privacy? We're always happy to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block bg-[var(--color-green-5)] text-white font-bold py-3 px-8 rounded-full hover:bg-[var(--color-green-4)] transition-all hover:scale-105 scrapbook-shadow"
              >
                Contact Us
              </Link>
              <Link
                to="/"
                className="inline-block bg-white text-[var(--color-green-5)] border-2 border-[var(--color-green-5)] font-bold py-3 px-8 rounded-full hover:bg-[var(--color-green-1)]/30 transition-all hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
