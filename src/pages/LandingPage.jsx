import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Shield, 
  Zap, 
  Globe, 
  Layout, 
  Palette, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Build your portfolio in minutes
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight">
              Showcase your work <br />
              <span className="text-primary">like a professional</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              The only no-code portfolio builder designed specifically for modern professionals. 
              Dynamic, beautiful, and fully customizable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary w-full sm:w-auto px-8 py-4 text-base flex items-center gap-2">
                Get Started for Free
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/search" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-50 transition-all">
                Explore Portfolios
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="glass p-4 rounded-[2rem] border border-white/50 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                alt="Dashboard Preview" 
                className="rounded-2xl shadow-lg border border-slate-100"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 hidden lg:block animate-bounce duration-[3s]">
              <div className="card p-4 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Portfolio Updated</p>
                  <p className="text-sm font-bold text-slate-900">Live now!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Everything you need to stand out
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Focus on your work while we handle the presentation. 
              Built with the latest technologies for speed and SEO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Instant Setup",
                desc: "Pick a username, add your projects, and your portfolio is live instantly."
              },
              {
                icon: <Palette className="w-6 h-6" />,
                title: "Dynamic Themes",
                desc: "Customize colors and layouts with one click. No CSS knowledge needed."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure & Reliable",
                desc: "Powered by Firebase for enterprise-grade security and 99.9% uptime."
              }
            ].map((feature, i) => (
              <div key={i} className="card group hover:border-primary/30 transition-all">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
