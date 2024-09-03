import ENV from 'rock-and-roll/config/environment';

async function enableMocking() {
  if (ENV.environment === 'development') {
    // Проверяем, что мы в режиме разработки
    console.log('Enabling mocking in development mode');

    const { worker } = await import('../mocks/browser');

    // `worker.start()` возвращает Promise, который решается
    // после того, как Service Worker будет готов перехватывать запросы.
    worker.start();
  } else {
    console.log('MSW is disabled in production');
  }
}

export function initialize(application) {
  application.deferReadiness();
  console.log('This is The MSW initializer!');
  enableMocking().then(() => {
    console.log('enable Mocking enabled');
    application.advanceReadiness();
  });
}

export default {
  initialize,
};
