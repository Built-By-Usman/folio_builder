import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { Plus, Trash2, ExternalLink, Code, Layout, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProjectsTab = () => {
  const { portfolio, updateLocalPortfolio } = usePortfolioStore();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    liveLink: '',
    githubLink: '',
    image: ''
  });

  const projects = portfolio?.sections?.projects || [];

  const handleAddProject = () => {
    if (newProject.title) {
      updateLocalPortfolio('projects', [...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ title: '', description: '', techStack: '', liveLink: '', githubLink: '', image: '' });
      setIsAdding(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const projectId = Date.now().toString();
      const url = await storageService.uploadProjectImage(user.uid, projectId, file);
      setNewProject(prev => ({ ...prev, image: url }));
      toast.success('Project image uploaded!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveProject = (id) => {
    updateLocalPortfolio('projects', projects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">Projects</h3>
          <p className="text-sm text-slate-500">Showcase your best work and side projects</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-primary py-2 px-4 flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Title"
              className="input-field"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tech Stack (e.g. React, Firebase)"
              className="input-field"
              value={newProject.techStack}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
            />
            <input
              type="text"
              placeholder="Live Link"
              className="input-field"
              value={newProject.liveLink}
              onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
            />
            <input
              type="text"
              placeholder="GitHub Link"
              className="input-field"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
            />
            <textarea
              placeholder="Project Description"
              className="input-field col-span-full resize-none"
              rows={3}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />

            <div className="col-span-full">
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Project Cover Image</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-white overflow-hidden shrink-0">
                  {newProject.image ? (
                    <img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : uploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <label className="btn-primary py-2 px-4 text-xs cursor-pointer inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {newProject.image ? 'Change Image' : 'Upload Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProject}
              className="btn-primary py-2 px-6 text-sm"
            >
              Add Project
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="group p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 transition-all flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-slate-900">{project.title}</h4>
                </div>
                <p className="text-sm text-slate-500 max-w-xl">{project.description}</p>
                <div className="flex items-center gap-4 pt-2">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                      <ExternalLink className="w-3 h-3" /> Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-xs font-semibold text-slate-600 flex items-center gap-1 hover:underline">
                      <Code className="w-3 h-3" /> Source
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemoveProject(project.id)}
                className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : !isAdding && (
          <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 text-sm">No projects added yet. Showcase your work!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsTab;
