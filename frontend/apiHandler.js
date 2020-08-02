class ApiHandler {
  constructor(cookie) {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    this.fetchOpts = {
      headers: { cookie }
    };
  }

  async get(path) {
    return await fetch(`${this.baseUrl}/${path}`, this.fetchOpts);
  }
}

export default ApiHandler;
