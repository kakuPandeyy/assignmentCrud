import { useState } from 'react';
import { Mail, Lock, LogOut, User } from 'lucide-react';

import Form from '../components/Form';
import { logInRouter } from '../utils/apiRoutes';

export default function Login() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // this check if email is valid
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fields = [
    {
      keyId: '123',
      labal: ' Email Address',
      placeholder: 'your@email.com',
      fieldName: 'email',
      type: 'email',
      icon: (
        <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
      ),
    },
    {
      keyId: '223',
      labal: ' Password ',
      fieldName: 'password',
      type: 'password',
      icon: (
        <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
      ),
    },
  ];

  return (
    <>
      <Form
        signIn={true}
        formData={formData}
        setFormData={setFormData}
        route={logInRouter}
        fields={fields}
        heading={'Sign In'}
        sumbitLabal={'Login'}
        labalLink={'New to SecureAuth?  '}
        Link={'/register'}
        linkPlaceholder={'Create Account'}
        validateForm={validateForm}
        errors={errors}
      />
    </>
  );
}
