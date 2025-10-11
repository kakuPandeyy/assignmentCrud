import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Form from '../components/Form';
import { logInRouter } from '../utils/apiRoutes';

export default function Login() {
  // all validation error object
  const [errors, setErrors] = useState({});
  // all form data object
  const [formData, setFormData] = useState({});

  //validation function validate all fieds in formData and , unvalidate goes to errors (useState hook)

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // this check if email  is in formate  or not
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

  //fields requred in form components

  const fields = [
    {
      keyId: '123', // hardcoded key for dealing key prop requried error
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
      {/* login form */}
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
