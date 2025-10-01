import { useState, useEffect } from 'react';
import { supabase } from '../supabase-client';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) alert(error.message);
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) alert(error.message);
        if (!session) alert('Please check your inbox for email verification!');
        setLoading(false);
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                supabase.auth.startAutoRefresh();
            } else {
                supabase.auth.stopAutoRefresh();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className='card'>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="email@address.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className='btns'>
                <button onClick={signInWithEmail} disabled={loading}>
                    Sign in
                </button>
                <button onClick={signUpWithEmail} disabled={loading}>
                    Sign up
                </button>
            </div>
        </div>
    );
}