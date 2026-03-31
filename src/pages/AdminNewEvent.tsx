import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  AlignLeft
} from 'lucide-react';

export default function AdminNewEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    endTime: '17:00',
    location: 'DLSU Manila',
    address: '',
    category: 'Build',
    maxParticipants: '',
    description: '',
    requirements: '',
    imageUrl: '',
    registrationLink: '/contact',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed'
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('hfhgc_admin_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Mock save - in real implementation, this would call an API
    console.log('Saving event:', formData);
    
    // Simulate save delay
    setTimeout(() => {
      alert('Event created successfully!');
      navigate('/admin/projects');
    }, 500);
  };

  const categories = [
    'Build',
    'Meeting',
    'Workshop',
    'Fundraiser',
    'Training',
    'Volunteer Event',
    'Social'
  ];

  const categoryColors: Record<string, string> = {
    'Build': 'bg-green-500',
    'Meeting': 'bg-blue-500',
    'Workshop': 'bg-purple-500',
    'Fundraiser': 'bg-orange-500',
    'Training': 'bg-yellow-500',
    'Volunteer Event': 'bg-pink-500',
    'Social': 'bg-indigo-500'
  };

  return (
    <div className="min-h-screen bg-[var(--color-green-1)]">
      {/* Header */}
      <header className="bg-white border-b-2 border-[var(--color-green-3)] scrapbook-shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/projects"
                className="p-2 hover:bg-[var(--color-green-1)] rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-heading font-bold text-[var(--color-green-5)]">
                Schedule New Event
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 scrapbook-border scrapbook-shadow"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                placeholder="e.g., Community Build Day, Volunteer Orientation"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <Calendar className="inline mr-1" size={16} />
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <Clock className="inline mr-1" size={16} />
                  Start Time *
                </label>
                <input
                  type="time"
                  id="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <Clock className="inline mr-1" size={16} />
                  End Time *
                </label>
                <input
                  type="time"
                  id="endTime"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <MapPin className="inline mr-1" size={16} />
                  Location Name *
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                  placeholder="e.g., DLSU Manila, Barangay Hall"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  Full Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                  placeholder="Complete address with street, city"
                />
              </div>
            </div>

            {/* Category and Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <Tag className="inline mr-1" size={16} />
                  Category *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {formData.category && (
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 ${categoryColors[formData.category]} text-white text-xs font-bold rounded-full`}>
                      {formData.category}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="maxParticipants" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                  <Users className="inline mr-1" size={16} />
                  Max Participants
                </label>
                <input
                  type="number"
                  id="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                  placeholder="Leave empty for unlimited"
                  min="1"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-bold text-[var(--color-text-main)] mb-3">
                Event Status
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'upcoming' })}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
                    formData.status === 'upcoming'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'ongoing' })}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
                    formData.status === 'ongoing'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Ongoing
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'completed' })}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
                    formData.status === 'completed'
                      ? 'bg-gray-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Event Image */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                <ImageIcon className="inline mr-1" size={16} />
                Event Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                placeholder="https://example.com/event-image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-4">
                  <img 
                    src={formData.imageUrl} 
                    alt="Event preview" 
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                <AlignLeft className="inline mr-1" size={16} />
                Event Description *
              </label>
              <textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors resize-none"
                placeholder="Describe what the event is about, what participants will do, and what to expect..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Requirements / What to Bring
              </label>
              <textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors resize-none"
                placeholder="e.g., Comfortable clothes, Water bottle, Valid ID"
              />
            </div>

            {/* Registration Link */}
            <div>
              <label htmlFor="registrationLink" className="block text-sm font-bold text-[var(--color-text-main)] mb-2">
                Registration Link
              </label>
              <input
                type="text"
                id="registrationLink"
                value={formData.registrationLink}
                onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-green-5)] transition-colors"
                placeholder="/contact or external URL"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
              <Link
                to="/admin/projects"
                className="px-6 py-3 text-gray-600 hover:text-[var(--color-text-main)] transition-colors"
              >
                Cancel
              </Link>
              
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-[var(--color-green-5)] text-white rounded-lg hover:bg-[var(--color-green-4)] transition-colors font-bold"
              >
                <Save size={18} />
                Create Event
              </button>
            </div>
          </form>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-xl p-6 scrapbook-border scrapbook-shadow"
        >
          <h3 className="text-lg font-heading font-bold text-[var(--color-green-5)] mb-4">Preview</h3>
          
          <div className="bg-white rounded-xl overflow-hidden border-2 border-[var(--color-green-3)]">
            {formData.imageUrl && (
              <img 
                src={formData.imageUrl} 
                alt={formData.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 ${categoryColors[formData.category]} text-white text-xs font-bold rounded-full`}>
                  {formData.category}
                </span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  formData.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                  formData.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {formData.status}
                </span>
              </div>
              
              <h4 className="text-xl font-heading font-bold text-[var(--color-text-main)] mb-2">
                {formData.title || 'Event Title'}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(formData.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} />
                  {formData.time} - {formData.endTime}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  {formData.location}
                </p>
                {formData.maxParticipants && (
                  <p className="flex items-center gap-2">
                    <Users size={16} />
                    Max {formData.maxParticipants} participants
                  </p>
                )}
              </div>
              
              {formData.description && (
                <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                  {formData.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
