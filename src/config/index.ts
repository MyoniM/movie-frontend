import { LooseObject } from '../../types';

const config: LooseObject = {
  development: {
    API_URL: 'http://localhost:3001/api',
    API_VERSION: '',
  },
  production: {
    API_URL: 'https://api.mymovies.store/api',
    API_VERSION: '',
  },
};

export default process.env.NODE_ENV === 'production' ? config.production : config.development;
