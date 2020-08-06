class ApiHandler {
  constructor(cookie) {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    this.fetchOpts = {
      credentials: 'include',
      headers: { cookie, Accept: 'application/json', 'Content-Type': 'application/json' }
    };
  }

  async get(path) {
    return await fetch(`${this.baseUrl}/${path}`, this.fetchOpts);
  }

  async put(path, data) {
    return await fetch(`${this.baseUrl}/${path}`, {
      method: 'PUT',
      fetchOpts,
      body: JSON.stringify(data)
    });
  }
}

export default ApiHandler;
