module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
      },
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*', // Ensure this is correctly set
      },
    ];
  },
};
