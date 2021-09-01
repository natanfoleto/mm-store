export default async function page (response, params) {
  const { page, limit } = params
  const total = response.length

  if (limit === '0') {
    return { data: response, total }
  }

  const data = []
  let pages = []
  let indice = 0

  response.forEach((item, key) => {
    pages.push(item)
    if (Math.trunc((key + 1) / limit) !== indice) {
      data.push(pages)
      pages = []
      indice++
    }
  })

  pages[0] && data.push(pages)

  return { data: data[page - 1], total }
}
