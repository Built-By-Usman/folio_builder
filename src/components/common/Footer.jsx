import React from 'react';
import { Layout, Code, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Layout className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">FolioBuilder</span>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              Build and share professional portfolios in minutes. No coding required. 
              Join thousands of professionals showcasing their work with style.
            </p>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary transition-colors">
                <Globe className="w-4 h-4" />
              </a>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} FolioBuilder Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
