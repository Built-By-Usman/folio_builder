import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../services/dbService';
import { Search, User, ArrowRight, Loader2, Globe } from 'lucide-react';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (searchTerm.length >= 2) {
        setLoading(true);
        try {
          const users = await dbService.searchUsers(searchTerm);
          setResults(users);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Explore Portfolios</h1>
          <p className="text-slate-500">Discover amazing work from our community of professionals.</p>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-5 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg"
            placeholder="Search by name or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {results.length > 0 ? (
            results.map((user) => (
              <Link
                key={user.uid}
                to={`/portfolio/${user.username}`}
                className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{user.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> @{user.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all">
                  View Portfolio <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))
          ) : searchTerm.length >= 2 && !loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <User className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500">No users found matching "{searchTerm}"</p>
            </div>
          ) : !loading && (
            <div className="text-center py-20">
              <p className="text-slate-400">Start typing to search for professionals...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
