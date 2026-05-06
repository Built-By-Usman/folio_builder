import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_PDF_TYPE = 'application/pdf';

export const storageService = {
  uploadFile: async (file, path) => {
    // Basic validation
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 2MB limit');
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isPdf = file.type === ALLOWED_PDF_TYPE;

    if (!isImage && !isPdf) {
      throw new Error('Invalid file type. Only images and PDFs are allowed.');
    }

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },

  uploadProfileImage: (uid, file) => {
    return storageService.uploadFile(file, `users/${uid}/profile-image`);
  },

  uploadProjectImage: (uid, projectId, file) => {
    return storageService.uploadFile(file, `users/${uid}/projects/${projectId}`);
  },

  uploadResume: (uid, file) => {
    return storageService.uploadFile(file, `users/${uid}/resume.pdf`);
  }
};
