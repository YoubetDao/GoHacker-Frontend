import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-TP4XVBRQ9T';

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (action: string, category?: string) => {
  ReactGA.event({
    action,
    category: category || 'General',
  });
};