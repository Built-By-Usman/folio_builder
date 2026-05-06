import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Plus, X, Code2 } from 'lucide-react';

const SkillsTab = () => {
  const { portfolio, updateLocalPortfolio } = usePortfolioStore();
  const [newSkill, setNewSkill] = useState('');

  const skills = portfolio?.sections?.skills || [];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      updateLocalPortfolio('skills', [...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    updateLocalPortfolio('skills', skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Skills & Technologies</h3>
        <p className="text-sm text-slate-500">Add the tools and technologies you excel at</p>
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <div className="relative flex-1">
          <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            className="input-field pl-11"
            placeholder="React, Node.js, Figma..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn-primary py-2 px-4 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold border border-slate-200 group hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all cursor-default"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="p-0.5 rounded-full hover:bg-red-100 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        ) : (
          <div className="w-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 text-sm">No skills added yet. Start by adding one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsTab;
