import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { dbService } from '../../services/dbService';
import { User, Type, FileText, Globe, Upload, FileUp, Loader2, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ProfileTab = () => {
  const { portfolio, updateProfile } = usePortfolioStore();
  const { profile, user, updateLocalProfile } = useAuth();
  const [uploading, setUploading] = React.useState({ profile: false, resume: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateProfile({ [name]: value });
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [type]: true }));
    try {
      let url = '';
      if (type === 'profile') {
        url = await storageService.uploadProfileImage(user.uid, file);
        // Update both Auth profile and Firestore
        await updateDoc(doc(db, 'users', user.uid), { profileImage: url });
        updateLocalProfile({ profileImage: url });
        toast.success('Profile image updated!');
      } else {
        url = await storageService.uploadResume(user.uid, file);
        updateProfile({ resumeURL: url });
        toast.success('Resume uploaded!');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Personal Information</h3>
        <p className="text-sm text-slate-500">Update your public profile details</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-md bg-indigo-600 flex items-center justify-center">
              {profile?.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white">{profile?.name?.charAt(0)}</span>
              )}
              {uploading.profile && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2.5 bg-white text-indigo-600 rounded-full shadow-xl cursor-pointer hover:scale-110 transition-all border border-slate-100">
              <Upload className="w-4 h-4" />
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'profile')} />
            </label>
          </div>
          <p className="text-xs text-slate-500 font-medium">Click icon to change photo</p>
        </div>

        {/* Info Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              Full Name
            </label>
            <input
              type="text"
              className="input-field bg-slate-50 cursor-not-allowed"
              value={profile?.name || ''}
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Type className="w-4 h-4 text-slate-400" />
              Professional Title
            </label>
            <input
              name="title"
              type="text"
              className="input-field"
              placeholder="Senior Full Stack Developer"
              value={portfolio?.title || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-full space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Short Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              className="input-field resize-none"
              placeholder="Tell the world about yourself..."
              value={portfolio?.bio || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              Location
            </label>
            <input
              name="location"
              type="text"
              className="input-field"
              placeholder="New York, NY"
              value={portfolio?.location || ''}
              onChange={handleChange}
            />
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-slate-400" />
              Resume (PDF)
            </label>
            <div className={`relative border-2 border-dashed rounded-xl p-3 flex items-center justify-between transition-colors ${portfolio?.resumeURL ? 'border-green-100 bg-green-50/30' : 'border-slate-200 hover:border-primary/30'}`}>
              <div className="flex items-center gap-3 overflow-hidden">
                {portfolio?.resumeURL ? (
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="text-xs text-slate-500 truncate">
                  {portfolio?.resumeURL ? 'Resume Uploaded' : 'No resume uploaded'}
                </span>
              </div>
              <label className="shrink-0 text-xs font-bold text-primary hover:underline cursor-pointer disabled:opacity-50">
                {uploading.resume ? 'Uploading...' : portfolio?.resumeURL ? 'Change' : 'Upload'}
                <input type="file" className="hidden" accept="application/pdf" disabled={uploading.resume} onChange={(e) => handleFileUpload(e, 'resume')} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
