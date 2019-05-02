module.exports = {
  /**
   * 앱 설정
   */
  apps: [
    {
      name: 'reactweb',
      script: './App.js', // 앱 실행 스크립트
      instances: 4, // 앱 인스턴스의 수
      exec_mode: 'cluster', // 실행 모드.
      env: { // 환경변수. 모든 배포 환경에서 공통으로 사용한다.
        NODE_ENV: 'production',
      }
    },
  ],

  /**
   * 배포 설정
   */
  deploy: {
    staging: {
      user: 'root', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 한다.
      host: '115.68.230.30', // 서버 도메인 또는 IP
      ref: 'origin/dev_ant', // 서버에서 clone할 브랜치
      repo: 'git@github.com:HoYoungYoon/MovieStore.git', // Git 저장소 URL
      ssh_options: 'StrictHostKeyChecking=no', // SSH 접속 옵션.
      path: '/root/MovieStore/front-end/web/reactweb', // 앱을 설치할 폴더 위치
      'post-deploy': // PM2가 배포(git clone)한 후 실행할 명령어
          'npm install && npm run build && pm2 reload app.config.js'
    },
  },
};