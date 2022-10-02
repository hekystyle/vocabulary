// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'reflect-metadata';
import 'fake-indexeddb/auto';

window.matchMedia = query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

window.speechSynthesis = {
  onvoiceschanged: jest.fn(),
  paused: false,
  pending: false,
  speaking: false,
  cancel: jest.fn(),
  getVoices: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  speak: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
};
