import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jvbyzzbbcmfrcatoahwx.supabase.co'
const supabaseKey = 'sb_publishable_8HENcXz0A7cG8b6n760kyA__H81sMdh'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)