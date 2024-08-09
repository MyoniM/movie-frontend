import { LooseObject } from '../../types';

const config: LooseObject = {
  development: {
    API_URL: 'http://localhost:3001/api',
    API_VERSION: '',
  },
  production: {
    API_URL: '',
    API_VERSION: '',
  },
};

export default process.env.NODE_ENV === 'production' ? config.production : config.development;
