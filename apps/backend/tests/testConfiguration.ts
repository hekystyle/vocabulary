import { faker } from '@faker-js/faker';
import { AppConfig } from '@/config/configuration.js';

export default (): AppConfig => ({
  database: {
    url: new URL(faker.string.alphanumeric(8), process.env['MEMORY_MONGO_URI'] ?? '').toString(),
  },
  jwt: {
    secret: 'test-secret',
  },
  session: {
    secret: 'test-secret',
  },
  github: {
    clientId: 'test',
    clientSecret: '',
  },
});
