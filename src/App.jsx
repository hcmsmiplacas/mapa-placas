import { useEffect, useState } from 'react'

import { supabase } from './lib/supabase'

import Login from './pages/Login'
import UploadExcel from './components/UploadExcel'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

function App() {

  const [session, setSession] = useState(null)
  const [placas, setPlacas] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function carregarPlacas() {
    const { data } = await supabase
      .from('placas')
      .select('*')

    setPlacas(data || [])
  }

  useEffect(() => {
    if (session) carregarPlacas()
  }, [session])

  async function logout() {
    await supabase.auth.signOut()
  }

  if (!session) {
    return <Login />
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>

      <button
        onClick={logout}
        style={{
          position: 'absolute',
          zIndex: 1000,
          top: 10,
          right: 10
        }}
      >
        Sair
      </button>

      <UploadExcel onUpload={carregarPlacas} />

      <MapContainer
        center={[-25.3058, -49.0554]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {placas.map((placa) => (
          <Marker
            key={placa.id}
            position={[placa.latitude, placa.longitude]}
          >
            <Popup>
              <h3>{placa.codigo}</h3>
              <p>{placa.endereco}</p>
              <img src={placa.foto} width="200" />
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  )
}

export default App