import axios from 'axios'

export default async function request (req, res) {
  try {
    const { cep } = req.params

    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    return res.json({
      result: 'success',
      data
    })
  } catch (err) {
    return res.json({
      result: 'error',
      message: 'Nenhum cep encontrado'
    })
  }
}
