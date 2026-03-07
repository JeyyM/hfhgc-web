import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@hfhgc.org');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - in real implementation, this would call an API
    setTimeout(() => {
      // Store mock auth token
      localStorage.setItem('hfhgc_admin_token', 'mock_token_12345');
      localStorage.setItem('hfhgc_admin_email', email);
      
      setIsLoading(false);
      navigate('/admin/content');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-green-1)] via-white to-[var(--color-green-2)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Logo and Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-[var(--color-green-5)] rounded-full flex items-center justify-center mx-auto mb-4 scrapbook-shadow"
          >
            <Lock className="text-white" size={40} />
          </motion.div>
          <h2 className="text-4xl font-heading font-bold text-[var(--color-green-5)] mb-2">
            Admin Login
          </h2>
          <p className="text-[var(--color-text-main)]">
            Sign in to manage HFHGC website content
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl scrapbook-border scrapbook-shadow p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                  placeholder="admin@hfhgc.org"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--color-green-5)] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--color-green-5)] focus:ring-[var(--color-green-5)] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--color-text-main)]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[var(--color-green-5)] hover:text-[var(--color-green-4)]">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-green-5)] text-white font-bold py-3 px-4 rounded-full hover:bg-[var(--color-green-4)] transition-all duration-300 transform hover:scale-105 scrapbook-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-[var(--color-green-1)] rounded-lg border-2 border-[var(--color-green-3)]">
            <p className="text-xs text-[var(--color-text-main)] font-bold mb-1">
              🔑 Demo Credentials (Pre-filled)
            </p>
            <p className="text-xs text-gray-600">
              Email: <span className="font-mono">admin@hfhgc.org</span><br />
              Password: <span className="font-mono">admin123</span>
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center">
          <a
            href="/"
            className="text-sm text-[var(--color-green-5)] hover:text-[var(--color-green-4)] font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
