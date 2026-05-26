import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login({ onLogin }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      alert('Erro no login: ' + error.message)
      return
    }

    onLogin()
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f3f3f3'
    }}>
      
      <form
        onSubmit={handleLogin}
        style={{
          background: 'white',
          padding: 30,
          borderRadius: 10,
          width: 300
        }}
      >

        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

      </form>

    </div>
  )
}