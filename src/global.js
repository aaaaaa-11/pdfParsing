const dev = process.env.NODE_ENV !== 'production'
const { protocol } = location
const isHTTPS = protocol === 'https:'
export default {
  isDev: dev,
  isHTTPS
}
