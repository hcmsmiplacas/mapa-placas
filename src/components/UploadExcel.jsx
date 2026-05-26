import * as XLSX from 'xlsx'
import { supabase } from '../lib/supabase'

function UploadExcel({ onUpload }) {

  async function handleFile(event) {

    const file = event.target.files[0]

    if (!file) return

    const data = await file.arrayBuffer()

    const workbook = XLSX.read(data)

    const sheet = workbook.Sheets[
      workbook.SheetNames[0]
    ]

    const rows = XLSX.utils.sheet_to_json(sheet)

    console.log(rows)

    const { error } = await supabase
      .from('placas')
      .insert(rows)

    if (error) {
      console.log(error)
      alert('Erro ao salvar')
      return
    }

    alert('Planilha importada com sucesso!')
	
    onUpload()
  }

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
        top: 10,
        left: 10,
        background: 'white',
        padding: 10,
        borderRadius: 8
      }}
    >

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
      />

    </div>
  )
}

export default UploadExcel