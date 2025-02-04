import React, { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';


interface AuthComponentProps {
  supabase: SupabaseClient;
  redirectUrl: string;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ supabase, redirectUrl }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role: 'tutor' },
            emailRedirectTo: redirectUrl
          }
        });
        
        if (error) throw error;

        console.log(`signup -> ${data}`)
        
        setSuccessMessage(
          'Please check your email for a verification link to complete your registration.'
        );

        setEmail('')
        setPassword('')

      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;

        console.log(`signin -> ${data}`)

      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border border-teal-500 p-5 rounded-lg">
      <div>
        <div className='my-2'>
          <h2 className='text-center text-2xl font-semibold'>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          <p className='text-center text-lg'>
            {isSignUp 
              ? 'Sign up for a new tutor account' 
              : 'Welcome back tutor!'}
          </p>
        </div>
        <hr className='my-5 bg-teal-500'/>
        <div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <p className='font-semibold text-lg'>
                {isSignUp ? 'Lecturer Email' : 'Email'}
              </p>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setEmail(e.target.value)}
                required
                className="w-full rounded-lg pl-2 h-10"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <p className='font-semibold text-lg'>
                Password
              </p>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setPassword(e.target.value)}
                required
                className="w-full rounded-lg pl-2 h-10"
                placeholder="Enter your password"
                minLength={6}
              />
            </div>

            <div className='my-4'>
                <button 
                type="submit" 
                className="w-full btn btn-success text-white text-lg"
                disabled={loading}
                >
                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>
            </div>

            {error && (
              <div className='bg-red-300 border border-red-600 text-red-600 p-3 my-3 rounded-lg'>
                <p>{error}</p>
              </div>
            )}

            {successMessage && (
              <div className='bg-green-300 border border-green-600 text-green-600 p-3 my-3 rounded-lg'>
                <p>{successMessage}</p>
              </div>
            )}

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccessMessage('');
                }}
                className="text-teal-600 hover:underline text-lg"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : 'Need an account? Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;