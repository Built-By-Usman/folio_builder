import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';
import { Layout, Mail, Lock, User, Loader2, Check, X } from 'lucide-react';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores allowed')
    .transform(val => val.toLowerCase()),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState('idle'); // idle, checking, available, taken

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const username = watch('username');

  // Check username availability
  React.useEffect(() => {
    if (username && username.length >= 3) {
      const timeoutId = setTimeout(async () => {
        setUsernameStatus('checking');
        try {
          const available = await authService.checkUsername(username);
          setUsernameStatus(available ? 'available' : 'taken');
        } catch (err) {
          console.error(err);
          setUsernameStatus('idle');
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setUsernameStatus('idle');
    }
  }, [username]);

  const onSubmit = async (data) => {
    if (usernameStatus !== 'available') {
      toast.error('Please choose a different username');
      return;
    }

    setLoading(true);
    try {
      await signup(data.email, data.password, data.username, data.fullName);
      toast.success('Account created successfully!');
      navigate('/dashboard/editor');
    } catch (err) {
      toast.error(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary flex items-center justify-center rounded-xl mb-4">
            <Layout className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Create Account</h2>
          <p className="mt-2 text-sm text-slate-500">
            Already have an account? {' '}
            <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Login here
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register('fullName')}
                  className="input-field pl-11"
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium select-none">@</div>
                <input
                  {...register('username')}
                  className={`input-field pl-8 ${
                    usernameStatus === 'available' ? 'border-green-500 focus:ring-green-500' : 
                    usernameStatus === 'taken' ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="johndoe"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {usernameStatus === 'checking' && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
                  {usernameStatus === 'available' && <Check className="w-4 h-4 text-green-500" />}
                  {usernameStatus === 'taken' && <X className="w-4 h-4 text-red-500" />}
                </div>
              </div>
              {usernameStatus === 'taken' && <p className="mt-1 text-xs text-red-500">This username is already taken</p>}
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register('email')}
                  type="email"
                  className="input-field pl-11"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  {...register('password')}
                  type="password"
                  className="input-field pl-11"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || usernameStatus !== 'available'}
            className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
