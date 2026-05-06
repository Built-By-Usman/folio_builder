import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../hooks/usePortfolio';
import { PortfolioSkeleton } from '../components/common/Feedback/LoadingSkeleton';
import { 
  Code, 
  ExternalLink, 
  MapPin, 
  Mail, 
  Download,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const PublicPortfolio = () => {
  const { username } = useParams();
  const { data, loading, error } = usePortfolio(username);

  if (loading) return <PortfolioSkeleton />;
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">404</h2>
        <p className="text-slate-500 max-w-md">The portfolio for @{username} could not be found or doesn't exist.</p>
      </div>
    );
  }

  const { user, portfolio } = data;
  const { sections } = portfolio;

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Helmet>
        <title>{user.name} | Portfolio</title>
        <meta name="description" content={portfolio.bio} />
      </Helmet>

      {/* Hero Section */}
      <header className="relative py-32 overflow-hidden bg-[#f8fafc]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative inline-block mb-10">
            <div className="w-32 h-32 bg-white p-1.5 rounded-[2.5rem] shadow-2xl mx-auto border border-slate-100 overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover rounded-[2rem]" />
              ) : (
                <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-4xl font-bold text-white rounded-[2rem]">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white shadow-lg" />
          </div>

          <h1 className="text-6xl font-display font-bold text-slate-900 mb-4 tracking-tight">{user.name}</h1>
          <p className="text-xl font-bold text-indigo-600 uppercase tracking-widest mb-8">{portfolio.title || 'Digital Creative'}</p>
          
          <div className="flex flex-wrap justify-center gap-4 text-slate-500 mb-12">
            {portfolio.location && (
              <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-sm font-medium">
                <MapPin className="w-4 h-4 text-indigo-500" /> {portfolio.location}
              </span>
            )}
            <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-sm font-medium">
              <Mail className="w-4 h-4 text-indigo-500" /> {user.email}
            </span>
          </div>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12 italic">
            "{portfolio.bio}"
          </p>

          {portfolio.resumeURL && (
            <a 
              href={portfolio.resumeURL} 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary px-8 py-4 bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-200"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        {/* Skills Section */}
        {sections.skills.length > 0 && (
          <section className="text-center">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">Technical Arsenal</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {sections.skills.map((skill, i) => (
                <span key={i} className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {sections.projects.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-3xl font-display font-bold text-slate-900 whitespace-nowrap">Selected Work</h2>
              <div className="h-px w-full bg-slate-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {sections.projects.map((project, i) => (
                <div key={i} className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                  {project.image && (
                    <div className="aspect-video overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                      <div className="flex gap-3">
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                            <Code className="w-5 h-5" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 transition-all">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-500 mb-8 leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.techStack.split(',').map((tech, j) => (
                        <span key={j} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Journey Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {sections.experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">Professional Experience</h2>
              <div className="space-y-12">
                {sections.experience.map((exp, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)]" />
                    <div className="absolute left-[5.5px] top-6 w-px h-full bg-slate-100 group-last:hidden" />
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{exp.title}</h4>
                    <p className="text-indigo-600 font-bold text-sm mb-2">{exp.organization}</p>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">{exp.duration}</p>
                    <p className="text-slate-500 leading-relaxed text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sections.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">Education</h2>
              <div className="space-y-6">
                {sections.education.map((edu, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{edu.title}</h4>
                        <p className="text-indigo-600 text-sm font-bold">{edu.organization}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">{edu.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Connect Footer */}
      <footer className="py-32 text-center bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-8 tracking-tight">Interested in working together?</h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <a 
            href={`mailto:${user.email}`}
            className="btn-primary px-10 py-5 rounded-2xl bg-white text-slate-900 hover:bg-slate-50 shadow-2xl shadow-black/20"
          >
            Start a Conversation
          </a>
        </div>
      </footer>
    </div>
  );
};
    ;

export default PublicPortfolio;
