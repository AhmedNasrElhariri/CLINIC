module.exports = {
  apps: [
    {
      name: 'clinic r',
      script: './main.js',
      env: {
        DATABASE_URL:
          'postgresql://doadmin:e6qro1g7jzmvm0f8@db-postgresql-fra1-13324-do-user-4250315-0.b.db.ondigitalocean.com:25060/clinicr?schema=public&sslmode=require',
      },
      env_production: {
        DATABASE_URL:
          'postgresql://doadmin:e6qro1g7jzmvm0f8@db-postgresql-fra1-13324-do-user-4250315-0.b.db.ondigitalocean.com:25060/clinicr?schema=public&sslmode=require',
        NODE_ENV: 'production',
      },
    },
  ],
};
