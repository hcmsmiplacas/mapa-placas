import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export function getImageUrl(nomeImagem) {

  return `https://jvbyzzbbcmfrcatoahwx.supabase.co/storage/v1/object/public/placas/${nomeImagem}`

}