import { motion } from 'motion/react';
import { Heart, Home, Users, Hammer, DollarSign, CreditCard, Building2, CheckCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';

const donationTiers = [
  {
    amount: 1000,
    title: 'Helping Hand',
    description: 'Provides basic construction tools for volunteers',
    icon: Hammer,
    color: 'var(--color-green-1)'
  },
  {
    amount: 5000,
    title: 'Foundation Builder',
    description: 'Covers materials for one room foundation',
    icon: Building2,
    color: 'var(--color-green-2)'
  },
  {
    amount: 10000,
    title: 'Wall Raiser',
    description: 'Funds walls and framing for one home',
    icon: Home,
    color: 'var(--color-green-3)'
  },
  {
    amount: 25000,
    title: 'Home Completer',
    description: 'Completes roofing and finishing for a family',
    icon: Heart,
    color: 'var(--color-green-4)'
  }
];

const paymentMethods = [
  {
    name: 'GCash',
    number: '0912 345 6789',
    accountName: 'HFHGC DLSU',
    icon: '📱'
  },
  {
    name: 'Bank Transfer',
    details: 'BDO - 1234567890',
    accountName: 'Habitat for Humanity Green Chapter',
    icon: '🏦'
  },
  {
    name: 'PayPal',
    email: 'donate@hfhgc.org',
    accountName: 'HFHGC',
    icon: '💳'
  }
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDonate = (e: FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  return (
    <div className="bg-[var(--color-bg-main)] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--color-green-5)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6">
              Make a Difference Today
            </h1>
            <p className="text-xl text-[var(--color-green-1)] max-w-3xl mx-auto mb-8">
              Your generosity helps us build safe, affordable homes for families in need. Every peso counts towards creating lasting change in our communities.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl">
                <p className="text-4xl font-bold mb-1">50+</p>
                <p className="text-[var(--color-green-1)]">Homes Built</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl">
                <p className="text-4xl font-bold mb-1">200+</p>
                <p className="text-[var(--color-green-1)]">Families Helped</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl">
                <p className="text-4xl font-bold mb-1">₱2M+</p>
                <p className="text-[var(--color-green-1)]">Raised This Year</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Breakdown */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-4">
              Your Impact
            </h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto">
              See exactly how your donation helps build homes and transform lives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTiers.map((tier, index) => (
              <motion.div
                key={tier.amount}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--color-bg-main)] p-6 rounded-2xl scrapbook-border scrapbook-shadow text-center hover:scale-105 transition-transform"
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: tier.color }}
                >
                  <tier.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-2">
                  ₱{tier.amount.toLocaleString()}
                </h3>
                <p className="font-semibold text-[var(--color-green-4)] mb-2">{tier.title}</p>
                <p className="text-sm text-[var(--color-text-main)]">{tier.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-12 rounded-2xl scrapbook-border scrapbook-shadow"
          >
            <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-8 text-center">
              Choose Your Donation Amount
            </h2>

            <form onSubmit={handleDonate} className="space-y-8">
              {/* Donation Type */}
              <div>
                <label className="block text-sm font-bold text-[var(--color-text-main)] mb-4">
                  Donation Type
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType('one-time')}
                    className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${
                      donationType === 'one-time'
                        ? 'bg-[var(--color-green-5)] text-white scrapbook-shadow'
                        : 'bg-gray-100 text-[var(--color-text-main)] hover:bg-gray-200'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${
                      donationType === 'monthly'
                        ? 'bg-[var(--color-green-5)] text-white scrapbook-shadow'
                        : 'bg-gray-100 text-[var(--color-text-main)] hover:bg-gray-200'
                    }`}
                  >
                    Monthly Giving
                  </button>
                </div>
              </div>

              {/* Preset Amounts */}
              <div>
                <label className="block text-sm font-bold text-[var(--color-text-main)] mb-4">
                  Select Amount
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1000, 2500, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`py-4 px-6 rounded-xl font-bold transition-all ${
                        selectedAmount === amount
                          ? 'bg-[var(--color-green-4)] text-white scrapbook-shadow scale-105'
                          : 'bg-[var(--color-green-1)] text-[var(--color-text-main)] hover:bg-[var(--color-green-2)]'
                      }`}
                    >
                      ₱{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label htmlFor="customAmount" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)] font-bold">
                    ₱
                  </span>
                  <input
                    type="number"
                    id="customAmount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border-2 border-[var(--color-green-5)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)]"
                  />
                </div>
              </div>

              {/* Donor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-green-4)] focus:border-transparent"
                />
              </div>

              {/* Anonymous Donation */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="w-5 h-5 text-[var(--color-green-5)] border-gray-300 rounded focus:ring-[var(--color-green-4)]"
                />
                <label htmlFor="anonymous" className="text-sm text-[var(--color-text-main)]">
                  Make this donation anonymous
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[var(--color-green-5)] hover:bg-[#3a8237] text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 scrapbook-shadow flex items-center justify-center gap-2 text-lg"
              >
                <Heart size={24} />
                Donate {selectedAmount || customAmount ? `₱${(selectedAmount || parseInt(customAmount) || 0).toLocaleString()}` : 'Now'}
              </button>

              <p className="text-xs text-center text-gray-600">
                Your donation is tax-deductible. A receipt will be sent to your email address.
              </p>
            </form>

            {/* Thank You Message */}
            {showThankYou && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 bg-[var(--color-green-1)] p-6 rounded-2xl border-4 border-[var(--color-green-5)] text-center"
              >
                <CheckCircle className="mx-auto mb-4 text-[var(--color-green-5)]" size={48} />
                <h3 className="text-2xl font-heading font-bold text-[var(--color-green-5)] mb-2">
                  Thank You for Your Generosity!
                </h3>
                <p className="text-[var(--color-text-main)]">
                  Your donation will help us build homes and create hope for families in need.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-center text-[var(--color-green-5)] mb-12">
            Payment Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-[var(--color-bg-main)] p-6 rounded-2xl scrapbook-border scrapbook-shadow text-center"
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-heading font-bold text-[var(--color-green-5)] mb-3">
                  {method.name}
                </h3>
                <p className="text-[var(--color-text-main)] font-semibold mb-2">
                  {'number' in method ? method.number : 'details' in method ? method.details : method.email}
                </p>
                <p className="text-sm text-gray-600">{method.accountName}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-[var(--color-text-main)]">
            After payment, please send proof of transaction to{' '}
            <a href="mailto:donate@hfhgc.org" className="text-[var(--color-green-5)] font-bold hover:underline">
              donate@hfhgc.org
            </a>
          </p>
        </div>
      </section>

      {/* Tax Deductibility Info */}
      <section className="py-16 bg-[var(--color-green-1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-[var(--color-green-5)] mb-4">
            Tax Deductibility
          </h2>
          <p className="text-lg text-[var(--color-text-main)] mb-6">
            Habitat for Humanity Green Chapter is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law. We will provide you with an official receipt for your records.
          </p>
          <p className="text-sm text-gray-600">
            BIR Registration No: XXX-XXX-XXX-XXX | SEC Registration No: XXXXXXXXX
          </p>
        </div>
      </section>
    </div>
  );
}
