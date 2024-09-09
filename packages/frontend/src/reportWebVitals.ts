/* istanbul ignore file */

import { ReportCallback } from 'web-vitals';

const reportWebVitals = (onReport?: ReportCallback): void => {
  if (onReport && onReport instanceof Function) {
    import('web-vitals').then(
      ({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
        onCLS(onReport);
        onFID(onReport);
        onFCP(onReport);
        onLCP(onReport);
        onTTFB(onReport);
      },
      e => console.error(e),
    );
  }
};

export default reportWebVitals;
