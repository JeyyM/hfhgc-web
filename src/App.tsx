/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Partnerships from './pages/Partnerships';
import HomiesCenter from './pages/HomiesCenter';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Events from './pages/Events';
import Team from './pages/Team';
import Login from './pages/Login';
import AdminContent from './pages/AdminContent';
import AdminNewActivity from './pages/AdminNewActivity';
import AdminNewEvent from './pages/AdminNewEvent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="homies-center" element={<HomiesCenter />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="events" element={<Events />} />
        </Route>
        {/* Admin Routes - Outside Layout (no navbar/footer) */}
        <Route path="login" element={<Login />} />
        <Route path="admin/content" element={<AdminContent />} />
        <Route path="admin/activities/new" element={<AdminNewActivity />} />
        <Route path="admin/events/new" element={<AdminNewEvent />} />
      </Routes>
    </BrowserRouter>
  );
}
