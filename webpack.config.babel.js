import { webpackDevConfig, webpackProdConfig } from './config/index.js';

export default env => env === 'dev' ? webpackDevConfig : webpackProdConfig
