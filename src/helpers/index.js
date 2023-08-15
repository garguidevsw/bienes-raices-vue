
export const formatearPrecio = (precio) => {
  return Number(precio).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}
