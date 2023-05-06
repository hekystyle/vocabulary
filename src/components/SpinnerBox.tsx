import type { FC, PropsWithChildren } from 'react';
import { Spinner } from 'react-bootstrap';

export const SpinnerBox: FC<PropsWithChildren<{ label: string }>> = ({ children, label }) => (
  <div className="d-flex flex-column align-items-center gap-3" style={{ color: 'white' }}>
    <Spinner animation="border" aria-label={label} role="status" />
    {children ?? label}
  </div>
);
