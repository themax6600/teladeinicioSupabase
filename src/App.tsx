import './App.css'
import { supabase } from "./supabase-client";
import Auth from './components/Auth'
import Account from './components/Account'
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </div>
  )
}

export default App
