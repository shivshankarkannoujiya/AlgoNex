class ApiClient {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async customFetch(endpoint, options = {}, retry = true) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options?.headers };

      const config = {
        ...options,
        headers,
        credentials: "include",
      };

      const response = await fetch(url, config);

      // Handling expired token
      if (response.status === 401 && retry) {
        const refreshResponse = await fetch(
          `${this.baseUrl}/users/refresh-token`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (refreshResponse.ok) {
          return this.customFetch(endpoint, options, false);
        } else {
          throw new Error("Session expired. Please log in again.");
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API ERROR: ", error.message);
      throw error;
    }
  }

  async signup(username, email, password) {
    return this.customFetch("/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  }

  async verifyEmail(token) {
    return this.customFetch(`/users/verify/${token}`, {
      method: "GET",
    });
  }

  async login(email, password) {
    return this.customFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe() {
    return this.customFetch("/users/me");
  }

  async getUserDashboardSummary() {
    return this.customFetch("/users/user-dashboard", {
      method: "GET",
    });
  }

  async logout() {
    return this.customFetch("/users/logout", {
      method: "POST",
    });
  }

  async createProblem(problemData) {
    return this.customFetch("/problems/create-problem", {
      method: "POST",
      body: JSON.stringify(problemData),
    });
  }

  async getAllProblems() {
    return this.customFetch("/problems/get-all-problems", {
      method: "GET",
    });
  }

  async getProblemById(id) {
    return this.customFetch(`/problems/get-problem/${id}`, {
      method: "GET",
    });
  }

  async getSolvedProblem() {
    return this.customFetch("/problems/get-solved-problem", {
      method: "GET",
    });
  }

  async updateProblem(id, problemData) {
    return this.customFetch(`/problems/update-problem/${id}`, {
      method: "PUT",
      body: JSON.stringify(problemData),
    });
  }

  async deleteProblem(id) {
    return this.customFetch(`/problems/delete-problem/${id}`, {
      method: "DELETE",
    });
  }

  async executeCode({
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId,
  }) {
    return this.customFetch("/code/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      }),
    });
  }

  async runCode({
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId,
  }) {
    this.customFetch("/code/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      }),
    });
  }

  async getAllSubmissions() {
    return this.customFetch("/submission/getAllSubmission", {
      method: "GET",
    });
  }

  async getSubmissionForProblem(id) {
    return this.customFetch(`/submission/getSubmission/${id}`, {
      method: "GET",
    });
  }

  async getSubmissionCountForProblem(id) {
    return this.customFetch(`/submission/getSubmissionCount/${id}`, {
      method: "GET",
    });
  }

  async getSubmissionHeatMap() {
    return this.customFetch(`/submission/getSubmissionheatmap`, {
      method: "GET",
    });
  }

  async createPlaylist({ name, description }) {
    return this.customFetch("/playlist/createPlaylist", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
  }

  async getAllPlaylists() {
    return this.customFetch("/playlist", {
      method: "GET",
    });
  }

  async getPlaylistDetail(playlistId) {
    return this.customFetch(`/playlist/${playlistId}`, {
      method: "GET",
    });
  }

  async addProblemToPlaylist(playlistId, problemIds) {
    return this.customFetch(`/playlist/${playlistId}/addProblem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problemIds }),
    });
  }

  async removeProblemFromPlaylist(playlistId, problemIds) {
    return this.customFetch(`/playlist/${playlistId}/removeProblem`, {
      method: "POST",
      body: JSON.stringify(problemIds),
    });
  }

  async deletePlaylist(playlistId) {
    return this.customFetch(`/playlist/${playlistId}`, {
      method: "DELETE",
    });
  }

  async updatePlaylist({ id, name, description }) {
    return this.customFetch(`/playlist/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });
  }

  async createPost(postData) {
    return this.customFetch("/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  }

  async fetchPosts() {
    return this.customFetch("/post/posts", {
      method: "GET",
    });
  }

  async fetchPostById(postId) {
    return this.customFetch(`/post/${postId}`, {
      method: "GET",
    });
  }

  async addComment(postId, content) {
    return this.customFetch(`/comment/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(content),
    });
  }

  async deleteComment(commentId) {
    return this.customFetch(`/comment/${commentId}`, {
      method: "DELETE",
    });
  }

  async togglePostUpvote(postId) {
    return this.customFetch(`/post/${postId}/upvote`, {
      method: "PUT",
    });
  }

  async toggleCommentUpvote(commentId) {
    return this.customFetch(`/comments/${commentId}/upvote`, {
      method: "PUT",
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;
