import { useState } from 'react';
import { Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormField from './FormField';

export default function Form({
  fields,
  formData,
  setFormData,
  route,
  heading,
  sumbitLabal,
  labalLink,
  Link,
  linkPlaceholder,
  errors,
  validateForm,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //login or submit handler

  const handleLogin = async e => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true); // request started

      try {
        // post request or signin and signup return jwt token
        const res = await axios.post(route, formData);
        // saving token for future  authentication and authorization
        localStorage.setItem('token', res.data.token);
        // after successfull authentication routing to next page
        navigate('/');
      } catch (err) {
        if (err.response) {
          // notification by toast for error like invaild password or user not found
          toast.error(err.response.data?.message);

          return;
        }
      } finally {
        setIsLoading(false); // request finished
      }
    }
  };

  // handle input changes
  const handleChange = async e => {
    try {
      const { name, value } = e.target;

      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* body of form */}
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* background of form */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#57C785] to-[#]"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        {/* logo for auth */}
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-green-600 rounded-2xl mb-4 transform hover:scale-110 transition-transform">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* form card  */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden">
            <div className="p-8 space-y-6">
              {/* form card header */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{heading}</h2>
                <p className="text-slate-400 text-sm">Access your secure workspace</p>
              </div>
              {/* form card fieds */}
              {fields.map(field => (
                <div key={field.keyId}>
                  <FormField
                    label={field.labal}
                    placeholder={field.placeholder}
                    fieldName={field.fieldName}
                    type={field.type}
                    icon={field.icon}
                    handleChange={handleChange}
                    formData={formData}
                    errors={errors}
                  />
                </div>
              ))}
              {/* sumbit button for form */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-green-600 hover:from-cyan-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95  hover:shadow-cyan-500/70 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {/* enable loading icon */}
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <h2>{sumbitLabal}</h2>
                )}
              </button>

              {/* footer of form card and link between signin and signout */}
              <p className="text-center text-sm text-slate-400">
                {labalLink}
                <a
                  href={Link}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  {linkPlaceholder}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
