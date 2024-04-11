import { FC, useEffect, useState } from "react";
import { Session, createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

//TODO: Move this to a file that isn't stored in repo;

const SignIn: FC = (): JSX.Element => {
    const supabaseAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bmR6YWRlemN5Y3F1eXFxd2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NDY5NzgsImV4cCI6MjAyODQyMjk3OH0.OrvA_keyA4qbt7GDxnPSU85Tj2Q2f-kXBnvt0icdlvg";
    
    const supabase = createClient('https://kyndzadezcycquyqqwdq.supabase.co', supabaseAPIKey);
    
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
  
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
  
        return () => subscription.unsubscribe()
      }, [])

      if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
      }
      else {
        return (<div>Logged in!</div>)
      }
}

export default SignIn;
