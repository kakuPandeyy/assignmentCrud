import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function FormField({
  label,
  placeholder,
  fieldName,
  type,
  icon,
  handleChange,
  formData,
  errors,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = fieldName === 'password' && showPassword ? 'text' : type;

  return (
    <>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {/* <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" /> */}
          {icon}
        </div>
        <input
          type={inputType}
          name={fieldName}
          value={formData[fieldName]}
          onChange={handleChange}
          className={`w-full pl-12 pr-4 py-3 bg-slate-800/50 border-2 ${
            errors.email ? 'border-red-500/50' : 'border-slate-700/50'
          } rounded-xl focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800 text-white placeholder-slate-500 transition-all duration-300`}
          placeholder={placeholder}
        />

        {fieldName === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-cyan-400 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {errors[fieldName] && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
          {errors[fieldName]}
        </p>
      )}
    </>
  );
}
