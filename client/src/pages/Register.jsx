import { useState } from 'react';
import { Mail, Lock, LogOut, User } from 'lucide-react';

import Form from '../components/Form';
import { registerRoute } from '../utils/apiRoutes';

export default function Register() {
  // all validation error object
  const [errors, setErrors] = useState({});
  // all form data object
  const [formData, setFormData] = useState({});
  //validation function validate all fieds in formData and , unvalidate goes to errors (useState hook)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

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
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'confirmPassword is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password and confirm password should be same';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fields = [
    {
      keyId: '100', // hardcoded key for dealing key prop requried error
      labal: ' Name ',
      placeholder: 'ram',
      fieldName: 'name',
      type: 'text',
      icon: (
        <User className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
      ),
    },
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
    {
      keyId: '2933',
      labal: ' Confirm Password ',
      fieldName: 'confirmPassword',
      type: 'password',
      icon: (
        <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
      ),
    },
  ];

  return (
    <>
      {/* register form */}
      <Form
        signIn={false}
        formData={formData}
        setFormData={setFormData}
        route={registerRoute}
        fields={fields}
        heading={'Create Account'}
        sumbitLabal={'Create Account'}
        labalLink={'Already registered Auth?  '}
        Link={'/login'}
        linkPlaceholder={'Login'}
        validateForm={validateForm}
        errors={errors}
      />
    </>
  );
}
