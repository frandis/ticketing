import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
    // try {
    //   const response = await axios.post('/api/users/signup', {
    //     email,
    //     password,
    //   });

    //   console.log(response.data);
    // } catch (err) {
    //   setErrors(err.response.data.errors);
    // }
  };
  return (
    <form onSubmit={onSubmit}>
      <h1> Sign up</h1>
      <div className='form-group'>
        <label htmlFor='email'>Email Address</label>
        <input
          type='text'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
};

export default Signup;
