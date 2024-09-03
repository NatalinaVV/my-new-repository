import { debug } from '@ember/debug';

async function enableMocking() {
  console.log('Enabling mocking');

  const { worker } = await import('../mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  worker.start();
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
