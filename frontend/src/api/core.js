import api from './axios';

// ===== SITE INFO =====
export const fetchSiteInfo = () => api.get('siteinfo/');

// ===== ENQUIRIES =====
export const createEnquiry = (data) => api.post('enquiries/', data);
export const listEnquiries = () => api.get('enquiries/');
export const patchEnquiry = (id, patch) => api.patch(`enquiries/${id}/`, patch);

// ===== REVIEWS =====
export const createReview = (formData) =>
  api.post('reviews/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const listReviews = () => api.get('reviews/');
export const patchReview = (id, patch) => api.patch(`reviews/${id}/`, patch);

// ✅ NEW → Only approved reviews for Home Page
export const fetchApprovedReviews = () => api.get('reviews/approved/');
