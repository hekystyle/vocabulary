import { z } from 'zod';
import { BASE_API_URL } from './constants';

const profileSchema = z.object({
  email: z.string().email(),
  photoURL: z.string().url().nullish(),
});

export class AuthApiClient {
  // eslint-disable-next-line class-methods-use-this
  async getUserProfile(signal: AbortSignal | undefined) {
    const url = new URL('/api/auth/profile', BASE_API_URL);
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal,
    });
    const data: unknown = await response.json();
    return profileSchema.parse(data);
  }

  // eslint-disable-next-line class-methods-use-this
  async signOut() {
    const url = new URL('/api/auth/sign-out', BASE_API_URL);
    await fetch(url, { method: 'POST' });
  }
}
