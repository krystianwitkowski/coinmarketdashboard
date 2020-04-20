import dotenv from 'dotenv';
const getEnvironment = process.env.NODE_ENV === 'prod' ? dotenv.config() : null
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import home from './routes/home';
import signin from './routes/signin';
import success from './routes/success';
import user from './routes/user';
import auth from './routes/auth';
import verify from './routes/verify';
import refresh from './routes/refresh';
import dashboard from './routes/dashboard';
import search from './routes/search';
import lang from './routes/lang';
import theme from './routes/theme';
import page from './routes/page';
import isExpired from './routes/isExpired';

import verifyAccessToken from './middlewares/verifyAccessToken';

const app = express();

const setPromise = mongoose.Promise = global.Promise;
const connect = mongoose.connect(process.env.DB_URI || 'mongodb://localhost/crypto', { useNewUrlParser: true }).catch(error => console.log(error))
const db = mongoose.connection;

db.once('open', () => {
  console.log('We are connected')
})

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/static', express.static('../build/assets'))

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());

app.use('/', home);
app.use('/signin', signin);
app.use('/success', success);
app.use('/user', user);
app.use('/auth', auth);
app.use('/verify', verify);
app.use('/refresh', refresh);
app.use('/lang', lang);
app.use('/theme', theme);

app.use(verifyAccessToken);
app.use('/dashboard', dashboard);
app.use('/dashboard/page', page);
app.use('/dashboard/search', search);
app.use('/isExpired', isExpired);

app.listen(process.env.PORT || 5001)
