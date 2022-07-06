import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@ticketingjl/common';

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
    // set it to false in test environment so that cookies are set
    secure: process.env.NODE_ENV !== 'test',
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

export { app };
