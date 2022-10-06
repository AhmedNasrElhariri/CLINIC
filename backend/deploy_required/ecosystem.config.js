module.exports = {
  apps: [
    {
      name: 'clinicr',
      script: './main.js',
      env: {
        APP_PORT: 4000,
        NODE_ENV: 'production',
      },
    },
  ],
};
