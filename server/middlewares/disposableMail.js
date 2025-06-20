import { readFileSync } from 'fs';

const disposableDomains = JSON.parse(
  readFileSync('./node_modules/disposable-email-domains/index.json', 'utf-8')
);

const isDisposableEmail = (email) => {
  const domain = email.split('@')[1].toLowerCase();
  return disposableDomains.includes(domain);
};

export default isDisposableEmail;