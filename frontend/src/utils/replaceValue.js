function replaceForCurrency(e) {
  let value = e.currentTarget.value;

  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')

  e.currentTarget.value = value
}

function replaceForDecimal(value) {
  value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  value = value.replace('R$', '')
  value = value.trim()
  
  return value
}

function replaceForNumber(value) {
  if (value.length <= 0)
    return 0;
  
  const valueFormatted = value
    .replaceAll(".", "")
    .replaceAll(",", ".")
    .replace("R$", "");

  return Number(valueFormatted);
}

export { replaceForCurrency, replaceForNumber, replaceForDecimal };
