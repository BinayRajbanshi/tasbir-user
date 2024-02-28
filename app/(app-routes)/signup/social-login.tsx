import React from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

interface SocialLoginProps {
  onFacebookLogin: () => void;
  onGoogleLogin: () => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onFacebookLogin, onGoogleLogin }) => {
  return (
    <div>
      <div className="flex space-x-2">
        <button
          onClick={onFacebookLogin}
          className="mb-3  flex w-32 bg-blue-600 items-center justify-center rounded  px-7 pb-2.5 pt-3 text-center text-xs font-medium uppercase leading-normal text-white"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <div className="mr-4">
            <FaFacebookF />
          </div>{' '}
          Facebook
        </button>
        <button
          onClick={onGoogleLogin}
          className="mb-3 flex w-32  items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-xs font-medium uppercase leading-normal bg-red-600 text-white "
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <div className="mr-4">
            {' '}
            <FaGoogle />{' '}
          </div>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
