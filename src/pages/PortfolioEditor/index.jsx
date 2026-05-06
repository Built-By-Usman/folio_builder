import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { toast } from 'react-hot-toast';
import { 
  User, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Eye, 
  Save, 
  Loader2,
  AlertCircle
} from 'lucide-react';

// Tabs
import ProfileTab from './ProfileTab';
import SkillsTab from './SkillsTab';
import ProjectsTab from './ProjectsTab';
import ExperienceTab from './ExperienceTab';
import PreviewTab from './PreviewTab';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Exp & Edu', icon: GraduationCap },
  { id: 'preview', label: 'Preview', icon: Eye },
];

const PortfolioEditor = () => {
  const { user } = useAuth();
  const { 
    portfolio, 
    loading, 
    fetchPortfolio, 
    savePortfolio, 
    isDirty 
  } = usePortfolioStore();
  
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      fetchPortfolio(user.uid);
    }
  }, [user, fetchPortfolio]);

  const handleSave = async () => {
    try {
      await savePortfolio(user.uid);
      toast.success('Portfolio saved successfully!');
    } catch (err) {
      toast.error('Failed to save portfolio');
    }
  };

  if (!portfolio && loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="glass p-3 rounded-[2.5rem] sticky top-24">
              <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'editor-tab-active'
                        : 'editor-tab-inactive'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Editor Content */}
          <main className="flex-1">
            <div className="card min-h-[600px] flex flex-col">
              <div className="flex justify-between items-start mb-10 pb-8 border-b border-slate-100">
                <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-slate-500 mt-1">Refine your professional narrative</p>
                </div>
                <div className="flex items-center gap-4">
                  {isDirty && (
                    <span className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      Unsaved Changes
                    </span>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={loading || !isDirty}
                    className="btn-primary py-2.5 px-8 flex items-center gap-2 group"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-grow">
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'skills' && <SkillsTab />}
                {activeTab === 'projects' && <ProjectsTab />}
                {activeTab === 'experience' && <ExperienceTab />}
                {activeTab === 'preview' && <PreviewTab />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditor;
