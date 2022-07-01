import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
const app = express();

app.use(json());

// traffic is proxied by ingress ngnix; we want express to trust proxy
app.set('trust proxy', true);
app.use(
  cookieSession({
    // we're only using cookie as a transport mechanism
    // since JWT has encryption, we can set signed to false, which
    // disables cookie encryption
    signed: false,
    // only set cookie on requests coming from https and not http
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// anytime this route is hit, express will throw NotFoundError, which will
// be caught by errorHandler middleware that will send the error with the error structure we specified
// in CustomError
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => console.log('Listening on Port 3000!!!'));
};

start();
