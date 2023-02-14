import { RETURN_URL_FIELD } from '../constants';

export function hasReturnUrlField(obj: Record<string, unknown>): obj is Record<typeof RETURN_URL_FIELD, string> {
  return typeof (obj as Record<typeof RETURN_URL_FIELD, unknown>).returnUrl === 'string';
}
