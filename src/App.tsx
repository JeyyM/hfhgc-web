/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Partnerships from './pages/Partnerships';
import HomiesCenter from './pages/HomiesCenter';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Team from './pages/Team';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import AdminEditHome from './pages/AdminEditHome';
import AdminEditAbout from './pages/AdminEditAbout';
import AdminEditTeam from './pages/AdminEditTeam';
import AdminEditProjects from './pages/AdminEditProjects';
import AdminEditProjectArticle from './pages/AdminEditProjectArticle';
import AdminEditPartnerships from './pages/AdminEditPartnerships';
import AdminEditHomieCenter from './pages/AdminEditHomieCenter';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="homies-center" element={<HomiesCenter />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
        </Route>

        {/* Auth */}
        <Route path="login" element={<Login />} />

        {/* Admin panel (sidebar layout) */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="home" element={<AdminEditHome />} />
          <Route path="about" element={<AdminEditAbout />} />
          <Route path="team" element={<AdminEditTeam />} />
          <Route path="projects" element={<AdminEditProjects />} />
          <Route path="projects/edit/:id" element={<AdminEditProjectArticle />} />
          <Route path="partnerships" element={<AdminEditPartnerships />} />
          <Route path="homie-center" element={<AdminEditHomieCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
