// services/postService.js
import api from './api';

export const postService = {
  // GET semua post (dengan pagination)
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/posts', {
      params: { _page: page, _limit: limit }
    });
    return response.data;
  },
  // GET satu post berdasarkan ID
  getById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  // POST — Buat post baru
  create: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },
  // PUT — Update post
  update: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },
  // DELETE — Hapus post
  delete: async (id) => {
    await api.delete(`/posts/${id}`);
    return true;
  },
  // GET komentar dari sebuah post
  getComments: async (postId) => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },
};
