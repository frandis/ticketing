import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  try {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    return { pageProps, ...data };
  } catch (err) {
    return { pageProps, currentUser: null };
  }
};

export default AppComponent;
