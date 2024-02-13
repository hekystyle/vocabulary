import { z } from 'zod';
import { BASE_API_URL } from './constants';

const profileSchema = z.object({
  email: z.string().email(),
  photoURL: z.string().url().nullish(),
});

export class AuthApiClient {
  constructor(private readonly baseUrl: URL | string = BASE_API_URL) {}

  async getUserProfile(signal: AbortSignal | undefined) {
    const url = new URL('/api/auth/profile', this.baseUrl);
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal,
    });
    const data: unknown = await response.json();
    return profileSchema.parse(data);
  }

  async signOut() {
    const url = new URL('/api/auth/sign-out', this.baseUrl);
    await fetch(url, { method: 'POST' });
  }
}
