import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function ProjectSelector({ value, onChange }) {

  const [projetos, setProjetos] = useState([])

  async function carregar() {

    const { data } = await supabase
      .from('projetos')
      .select('*')

    setProjetos(data || [])
  }

  useEffect(() => {
    carregar()
  }, [])

  return (

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        position: 'absolute',
        zIndex: 1000,
        top: 10,
        left: 250
      }}
    >

      {projetos.map((p) => (
        <option key={p.id} value={p.id}>
          {p.nome}
        </option>
      ))}

    </select>
  )
}

export default ProjectSelector