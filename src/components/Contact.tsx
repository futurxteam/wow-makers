import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 overflow-hidden">

        {/* Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="uppercase tracking-[0.2em] text-gold-500 text-xs block mb-4">Let's Connect</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display tracking-normal md:tracking-widest text-white mb-6 break-words">
              START THE<br />
              <span className="text-gradient">CONVERSATION</span>
            </h2>
            <p className="text-gray-400 font-light text-lg mb-12 max-w-md">
              Secure an exclusive consultation to discuss your vision. We accept a limited number of commissions per year to ensure peerless quality.
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-matte-black border border-white/10 flex items-center justify-center text-gold-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Direct Email</p>
                  <p className="text-white font-medium">concierge@wowmakers.luxury</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-matte-black border border-white/10 flex items-center justify-center text-gold-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Global Office</p>
                  <p className="text-white font-medium">+1 (800) WOW-MKRS</p>
                </div>
              </div>

              {/* Headquarters — premium address block */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 bg-matte-black border border-gold-500/20 flex items-center justify-center text-gold-500 mt-1">
                  <MapPin size={20} />
                </div>
                <div className="border-l border-gold-500/25 pl-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500/80 font-bold mb-1">Headquarters</p>
                  <p className="text-white font-semibold tracking-wide text-base leading-snug">Eloor, Ernakulam</p>
                  <p className="text-gray-400 text-xs tracking-[0.18em] uppercase font-light mt-0.5">Kerala, India</p>
                  <a
                    href="https://maps.app.goo.gl/ekkarNpKZ5F6cWDY9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-[10px] uppercase tracking-[0.22em] text-gold-500/70 hover:text-gold-400 transition-colors duration-300 font-semibold"
                  >
                    <span>View on Map</span>
                    <span className="text-gold-500/40">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-matte-black p-6 md:p-10 border border-white/5 relative box-border w-full max-w-full overflow-hidden"
>
          {/* Gold accent corner */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold-500" />

          <h3 className="text-2xl font-display tracking-widest text-white mb-8 border-b border-white/10 pb-4">Inquiry Form</h3>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full bg-charcoal-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full bg-charcoal-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-charcoal-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Event Type</label>
              <select className="w-full bg-charcoal-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors appearance-none">
                <option value="">Select Event Type...</option>
                <option value="corporate">Corporate Summit</option>
                <option value="wedding">Luxury Wedding</option>
                <option value="launch">Product Launch</option>
                <option value="custom">Bespoke Experience</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Event Details</label>
              <textarea
                rows={4}
                className="w-full bg-charcoal-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                placeholder="Tell us about your vision, estimated guest count, and timeline..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-500 text-black font-semibold uppercase tracking-widest py-4 hover:bg-white transition-colors duration-300 box-glow"
            >
              Submit Inquiry
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
