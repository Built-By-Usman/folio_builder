import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { 
  Layout, 
  Eye, 
  Settings, 
  ArrowRight, 
  Clock, 
  PlusCircle,
  Share2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { portfolio, fetchPortfolio, loading } = usePortfolioStore();

  useEffect(() => {
    if (user) {
      fetchPortfolio(user.uid);
    }
  }, [user, fetchPortfolio]);

  const copyLink = () => {
    const link = `${window.location.origin}/portfolio/${profile?.username}`;
    navigator.clipboard.writeText(link);
    toast.success('Portfolio link copied!');
  };

  const stats = [
    { label: 'Projects', value: portfolio?.sections?.projects?.length || 0, icon: Layout },
    { label: 'Skills', value: portfolio?.sections?.skills?.length || 0, icon: Settings },
    { label: 'Experience', value: portfolio?.sections?.experience?.length || 0, icon: Clock },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900">Welcome, {profile?.name}</h1>
          <p className="text-slate-500 mt-1">Manage your portfolio and track your professional growth.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            Share Link
          </button>
          <Link 
            to={`/portfolio/${profile?.username}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
          >
            <Eye className="w-4 h-4" />
            View Live
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="card flex items-center gap-5">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Edit */}
        <div className="card space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Portfolio Builder</h3>
            <Link to="/dashboard/editor" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Go to editor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-slate-500">Your portfolio is {portfolio?.sections?.projects?.length > 0 ? 'looking great!' : 'almost ready!'}</p>
          <div className="space-y-3">
            <Link to="/dashboard/editor?tab=profile" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <span className="font-semibold text-slate-700 group-hover:text-primary">Personal Profile</span>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </Link>
            <Link to="/dashboard/editor?tab=projects" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <span className="font-semibold text-slate-700 group-hover:text-primary">Featured Projects</span>
              <div className={`w-2 h-2 rounded-full ${portfolio?.sections?.projects?.length > 0 ? 'bg-green-500' : 'bg-slate-300'}`} />
            </Link>
          </div>
        </div>

        {/* Activity or Suggestions */}
        <div className="card bg-slate-900 text-white border-none shadow-xl shadow-primary/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <PlusCircle className="w-32 h-32" />
          </div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold">Quick Tip</h3>
            <p className="text-slate-400 leading-relaxed">
              Did you know that portfolios with at least 3 projects get 40% more engagement? 
              Add your latest work to stay relevant to recruiters.
            </p>
            <Link to="/dashboard/editor" className="btn-primary inline-flex items-center gap-2 shadow-none">
              Add New Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
