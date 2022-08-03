const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

// 개발 단계와 프로덕션 단계에서 다른 환경변수를 사용하는 경우
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'handam',
        mongodb_password: 'x8WjNCLheUOVJS8s',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'contact',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'handam',
      mongodb_password: 'x8WjNCLheUOVJS8s',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'contact',
    },
  };
};
