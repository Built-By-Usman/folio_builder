import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAuth } from '../../context/AuthContext';
import { ExternalLink, Smartphone, Monitor, Globe, Code, Mail, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreviewTab = () => {
  const { portfolio } = usePortfolioStore();
  const { profile } = useAuth();
  const [viewMode, setViewMode] = React.useState('desktop'); // 'desktop' or 'mobile'

  if (!portfolio) return null;

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-1">Live Preview</h3>
          <p className="text-sm text-slate-500">Real-time simulation of your professional presence</p>
        </div>
        <Link 
          to={`/portfolio/${profile?.username}`}
          target="_blank"
          className="btn-primary py-2 px-6 text-sm flex items-center gap-2 group shadow-none bg-slate-900 hover:bg-slate-800"
        >
          View Live Page
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col items-center">
        {/* Device Toggle */}
        <div className="bg-slate-100 p-1 rounded-[1.25rem] flex gap-1 mb-10 border border-slate-200">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              viewMode === 'desktop' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              viewMode === 'mobile' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </button>
        </div>

        {/* Device Mockup */}
        <div className={`relative transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          viewMode === 'mobile' 
            ? 'w-[320px] h-[650px] border-[12px] border-slate-900 rounded-[3.5rem] shadow-2xl' 
            : 'w-full max-w-5xl h-[650px] border-[1px] border-slate-200 rounded-3xl shadow-2xl overflow-hidden'
        }`}>
          {/* Mobile Notch */}
          {viewMode === 'mobile' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-end justify-center pb-1">
              <div className="w-10 h-1 bg-slate-800 rounded-full mb-1" />
            </div>
          )}

          {/* Desktop Header */}
          {viewMode === 'desktop' && (
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white border border-slate-200 rounded-md py-1 px-3 text-[10px] text-slate-400 flex items-center gap-2">
                <Globe className="w-3 h-3" />
                foliobuilder.com/portfolio/{profile?.username}
              </div>
            </div>
          )}

          {/* Inner Content */}
          <div className="h-full bg-white overflow-y-auto scrollbar-hide">
            <div className={`mx-auto ${viewMode === 'mobile' ? 'px-6' : 'max-w-4xl px-12'} py-16 space-y-20`}>
              {/* Profile Section */}
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-[2.5rem] mx-auto overflow-hidden border-4 border-indigo-50 shadow-xl flex items-center justify-center bg-indigo-600 rotate-3 hover:rotate-0 transition-transform duration-500">
                    {profile?.profileImage ? (
                      <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover -rotate-3 hover:rotate-0 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl font-bold text-white -rotate-3">{profile?.name?.charAt(0)}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" title="Online" />
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">{profile?.name}</h1>
                  <p className="text-lg text-indigo-600 font-bold tracking-wide uppercase text-xs">{portfolio.title || 'Digital Architect'}</p>
                </div>
                
                <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-sm italic">
                  "{portfolio.bio || 'Crafting elegant solutions to complex problems...'}"
                </p>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Globe className="w-4 h-4" /></div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Code className="w-4 h-4" /></div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Mail className="w-4 h-4" /></div>
                </div>
              </div>

              {/* Stats/Quick Info (Mock) */}
              <div className="grid grid-cols-3 gap-4 border-y border-slate-50 py-8">
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900">{portfolio.sections.projects.length}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Projects</p>
                </div>
                <div className="text-center border-x border-slate-50 px-2">
                  <p className="text-xl font-bold text-slate-900">{portfolio.sections.skills.length}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Skills</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900">5+</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Years Exp</p>
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-100" />
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Career Path</h4>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                
                <div className="space-y-10">
                  {portfolio.sections.experience.length > 0 ? (
                    portfolio.sections.experience.map((exp, i) => (
                      <div key={i} className="relative pl-8 group">
                        <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                        <div className="absolute left-[3.5px] top-3 w-[1px] h-full bg-slate-100 group-last:hidden" />
                        <div>
                          <h5 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{exp.title}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-indigo-500 font-bold">{exp.organization}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] text-slate-400 font-medium">{exp.duration}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-3 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 italic">Experience pending...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Cloud */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] text-center">Tech Stack</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {portfolio.sections.skills.map((s, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm hover:border-indigo-200 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-100" />
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Featured Projects</h4>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                
                <div className={`grid gap-6 ${viewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {portfolio.sections.projects.length > 0 ? (
                    portfolio.sections.projects.map((p, i) => (
                      <div key={i} className="group overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-xl transition-all duration-300">
                        {p.image && (
                          <div className="aspect-video overflow-hidden">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                        <div className="p-5 space-y-2">
                          <h5 className="font-bold text-slate-900">{p.title}</h5>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{p.description}</p>
                          <div className="pt-3 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><ExternalLink className="w-3 h-3" /></div>
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><Code className="w-3 h-3" /></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                      <p className="text-xs text-slate-300 italic">No projects showcased yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Education Mock */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] text-center">Academic Background</h4>
                <div className="grid grid-cols-1 gap-4">
                  {portfolio.sections.education && portfolio.sections.education.length > 0 ? (
                    portfolio.sections.education.map((edu, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white border border-slate-50 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                           <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">{edu.title}</h5>
                          <p className="text-[10px] text-slate-500">{edu.organization} &bull; {edu.duration}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-300 italic text-center">Education details pending...</p>
                  )}
                </div>
              </div>

              {/* Footer Mock */}
              <div className="pt-20 pb-10 text-center space-y-4">
                <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full" />
                <p className="text-[10px] text-slate-300 font-medium tracking-widest uppercase">
                  Designed with FolioBuilder &copy; 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewTab;
