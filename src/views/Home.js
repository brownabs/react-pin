import React from 'react';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import Pins from './Pins';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <Pins/>;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      {loadComponent()}
    </div>
  );
}
