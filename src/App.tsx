/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Stats } from './components/Stats';
import { Clients } from './components/Clients';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-matte-black selection:bg-gold-500 selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Stats />
      <Clients />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
