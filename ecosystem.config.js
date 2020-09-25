module.exports = {
  apps: [
    {
      name: 'clinic r',
      script: './main.js',
      env: {
        DATABASE_URL:
          'postgresql://admin:admin@localhost:5432/clinicr?schema=public',
      },
      env_production: {
        DATABASE_URL:
          'postgresql://admin:admin@localhost:5432/clinicr?schema=public',
        NODE_ENV: 'production',
      },
    },
  ],
};
