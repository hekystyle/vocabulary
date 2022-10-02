import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'App';
import { Providers } from 'Providers';

it('should render without crashing', () => {
  const run = () =>
    render(<App />, {
      wrapper: Providers,
    });

  expect(run).not.toThrow();
});

it('should test features without crashing', async () => {
  const user = userEvent.setup();

  render(<App />, {
    wrapper: Providers,
  });

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toBe('#/list');

  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(window.location.hash).toBe('#/record');

  await user.type(screen.getByRole('combobox', { name: /word/i }), 'car');
  await user.type(screen.getByRole('combobox', { name: /part of speech/i }), 'noun');
  await user.type(screen.getByRole('textbox', { name: /translation/i }), 'auto');
  await user.type(
    screen.getByRole('textbox', { name: /definition/i }),
    'a motor vehicle with four wheels; usually propelled by an internal combustion engine',
  );
  await user.click(screen.getByRole('button', { name: /confirm/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toBe('#/list');

  expect(screen.getByRole('cell', { name: 'car' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(window.location.hash).toBe('#/record');

  await user.type(screen.getByRole('combobox', { name: /word/i }), 'cake');
  await user.type(screen.getByRole('combobox', { name: /part of speech/i }), 'noun');
  await user.type(screen.getByRole('textbox', { name: /translation/i }), 'dort');
  await user.type(
    screen.getByRole('textbox', { name: /definition/i }),
    'a sweet baked food made from flour, sugar, and eggs',
  );
  await user.click(screen.getByRole('button', { name: /confirm/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toBe('#/list');

  expect(screen.getByRole('cell', { name: 'cake' })).toBeInTheDocument();

  await user.click(screen.getAllByRole('button', { name: /edit/i })[1]);

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toBe('#/record/1');

  await user.click(screen.getByRole('button', { name: /cancel/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toBe('#/list');

  // switch on Practice page
  await user.click(screen.getByRole('button', { name: /practice/i }));

  expect(window.location.hash).toBe('#/practice');

  await user.click(screen.getByRole('button', { name: /start session/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  await user.click(screen.getByRole('button', { name: /edit/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toMatch(/#\/record\/\d+/);

  await user.click(screen.getByRole('button', { name: /cancel/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toBe('#/practice');

  await user.click(screen.getByRole('button', { name: /reveal answer/i }));

  await user.click(screen.getByRole('button', { name: /i was correct/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  await user.click(screen.getByRole('button', { name: /reveal answer/i }));

  await user.click(screen.getByRole('button', { name: /i was incorrect/i }));

  await user.click(screen.getByRole('button', { name: /end session/i }));

  // switch on List page
  await user.click(screen.getByRole('button', { name: /list/i }));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(window.location.hash).toBe('#/list');

  await user.click(screen.getAllByRole('button', { name: /delete/i })[1]);
  await user.click(await screen.findByText('OK'));

  await waitForElementToBeRemoved(() => screen.queryByRole('status'));

  expect(screen.queryByRole('cell', { name: 'car' })).not.toBeInTheDocument();
}, 15000);
