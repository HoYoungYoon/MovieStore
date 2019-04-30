module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'reactweb',
      script    : 'npm',
      args      : 'run start:production',
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {},
    staging: {
      user: 'jaeuk',
      host: 'localhost',
      ref: 'origin/master',
      repo: 'git@github.com:HoYoungYoon/MovieStore.git',
      path: '/root/MovieStore/front-end/web/reactweb',
      key: '/absolute/path/to/key',
      ssh_options: ['ForwardAgent=yes'],
      'post-deploy': 'npm install && pm2 reload app.config.js --env production'
    },
    dev : {}
  }
};