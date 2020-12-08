import React from 'react';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import Boards from './Boards';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <Boards/>;
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
