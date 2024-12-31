import { db, storage } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  suburb: string;
  city: string;
  state: string;
  psiraGrade: string;
  psiraExpiry: string;
  driversLicense: string;
  businessCompetency: string;
  position: string;
}

export const submitApplication = async (
  data: ApplicationData,
  videoFile: File | null,
  cvFile: File | null
): Promise<string> => {
  try {
    let videoUrl = '';
    let cvUrl = '';

    // Upload video file if exists
    if (videoFile) {
      const videoRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
      await uploadBytes(videoRef, videoFile);
      videoUrl = await getDownloadURL(videoRef);
    }

    // Upload CV file if exists
    if (cvFile) {
      const cvRef = ref(storage, `cvs/${Date.now()}_${cvFile.name}`);
      await uploadBytes(cvRef, cvFile);
      cvUrl = await getDownloadURL(cvRef);
    }

    // Add application to Firestore
    const applicationsRef = collection(db, 'applications');
    const docRef = await addDoc(applicationsRef, {
      ...data,
      videoUrl,
      cvUrl,
      createdAt: serverTimestamp(),
      status: 'pending'
    });

    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('You do not have permission to submit applications. Please try again later.');
      }
      throw new Error(error.message);
    }
    throw new Error('Failed to submit application. Please try again later.');
  }
};