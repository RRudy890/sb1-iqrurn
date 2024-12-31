const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export const validateFile = (file: File, type: 'cv' | 'video'): string | null => {
  if (!file) return 'File is required';

  if (type === 'cv') {
    if (file.size > MAX_CV_SIZE) {
      return 'CV file size must be less than 5MB';
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return 'CV must be in PDF, DOC, or DOCX format';
    }
  }

  if (type === 'video') {
    if (file.size > MAX_VIDEO_SIZE) {
      return 'Video file size must be less than 50MB';
    }

    if (!file.type.startsWith('video/')) {
      return 'Invalid video format';
    }
  }

  return null;
};