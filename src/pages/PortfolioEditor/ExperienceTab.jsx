import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Plus, Trash2, Briefcase, GraduationCap, Calendar } from 'lucide-react';

const ExperienceTab = () => {
  const { portfolio, updateLocalPortfolio } = usePortfolioStore();
  const [isAdding, setIsAdding] = useState(false);
  const [type, setType] = useState('experience'); // experience or education
  const [newItem, setNewItem] = useState({
    title: '',
    organization: '',
    duration: '',
    description: ''
  });

  const experience = portfolio?.sections?.experience || [];
  const education = portfolio?.sections?.education || [];

  const handleAddItem = () => {
    if (newItem.title && newItem.organization) {
      const currentList = type === 'experience' ? experience : education;
      updateLocalPortfolio(type, [...currentList, { ...newItem, id: Date.now() }]);
      setNewItem({ title: '', organization: '', duration: '', description: '' });
      setIsAdding(false);
    }
  };

  const handleRemoveItem = (itemType, id) => {
    const currentList = itemType === 'experience' ? experience : education;
    updateLocalPortfolio(itemType, currentList.filter(i => i.id !== id));
  };

  const renderList = (list, itemType, title, icon) => (
    <div className="space-y-4">
      <h4 className="font-bold text-slate-900 flex items-center gap-2">
        {React.cloneElement(icon, { className: "w-5 h-5 text-primary" })}
        {title}
      </h4>
      {list.length > 0 ? (
        list.map((item) => (
          <div key={item.id} className="group p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 transition-all flex justify-between items-start">
            <div className="space-y-1">
              <h5 className="font-bold text-slate-800">{item.title}</h5>
              <p className="text-sm font-medium text-slate-600">{item.organization}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {item.duration}
              </p>
              {item.description && <p className="text-sm text-slate-500 mt-2">{item.description}</p>}
            </div>
            <button
              onClick={() => handleRemoveItem(itemType, item.id)}
              className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-400 italic">No items added yet.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">Experience & Education</h3>
          <p className="text-sm text-slate-500">Document your professional journey</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-primary py-2 px-4 flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 animate-slide-up">
          <div className="flex gap-4 p-1 bg-slate-200 rounded-lg w-fit">
            <button
              onClick={() => setType('experience')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${type === 'experience' ? 'bg-white text-primary shadow-sm' : 'text-slate-600'}`}
            >
              Experience
            </button>
            <button
              onClick={() => setType('education')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${type === 'education' ? 'bg-white text-primary shadow-sm' : 'text-slate-600'}`}
            >
              Education
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={type === 'experience' ? "Job Title" : "Degree / Course"}
              className="input-field"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <input
              type="text"
              placeholder={type === 'experience' ? "Company Name" : "Institution Name"}
              className="input-field"
              value={newItem.organization}
              onChange={(e) => setNewItem({ ...newItem, organization: e.target.value })}
            />
            <input
              type="text"
              placeholder="Duration (e.g. 2020 - 2023)"
              className="input-field"
              value={newItem.duration}
              onChange={(e) => setNewItem({ ...newItem, duration: e.target.value })}
            />
            <textarea
              placeholder="Description (Optional)"
              className="input-field col-span-full resize-none"
              rows={3}
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="btn-primary py-2 px-6 text-sm"
            >
              Add {type === 'experience' ? 'Experience' : 'Education'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-12">
        {renderList(experience, 'experience', 'Work Experience', <Briefcase />)}
        <div className="border-t border-slate-100" />
        {renderList(education, 'education', 'Education', <GraduationCap />)}
      </div>
    </div>
  );
};

export default ExperienceTab;
