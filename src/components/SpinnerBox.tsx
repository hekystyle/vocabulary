import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

export const SpinnerBox: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="d-flex flex-column align-items-center gap-3">
    <Spinner animation="border" role="status" />
    {children}
  </div>
);
