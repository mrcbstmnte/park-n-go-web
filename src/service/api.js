import axios from './axios'

export const CancelToken = axios.CancelToken
export const isCancel = axios.isCancel

const _api = createAPI()

export const api = _api
export default axios

axios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response) {
    return Promise.reject(error.response.data.error)
  }

  console.log(error)
  console.log('error.response', error.response)
  return Promise.reject(error)
})

function createAPI() {
  return {
    entryPoints: entryPoints(),
    invoices: invoices(),
    lots: lots(),
    slots: slots()
  }
}

function entryPoints() {
  async function create(lotId, name) {
    const response = await axios.post('/entry-point', {
      lotId,
      name
    })

    return response.entryPoint
  }

  async function list(lotId) {
    const response = await axios.get(`/entry-points/${lotId}`)

    return response.entryPoints
  }

  return {
    create,
    list
  }
}

function invoices() {
  async function create(entryPointId, vehicle, startDate) {
    const response = await axios.post('/invoice', {
      entryPointId,
      vehicle,
      startDate
    })

    return response.invoice
  }

  async function settle(invoiceId, endDate) {
    const response = await axios.post('/settle', {
      invoiceId,
      endDate
    })

    return response.invoice
  }

  return {
    create,
    settle
  }
}

function lots() {
  async function create(name, entryPoints) {
    const response = await axios.post('/lot', {
      name,
      entryPoints
    })

    return response.lot
  }

  async function list() {
    const response = await axios.get('/lots')

    return response.lots
  }

  return {
    create,
    list
  }
}

function slots() {
  async function create(lotId, slots) {
    const response = await axios.post('/slot', {
      lotId,
      slots
    })

    return response.slots[0]
  }

  async function get(slotId) {
    const response = await axios.get(`/slot/${slotId}`)

    return response.slot
  }

  async function list(lotId) {
    const response = await axios.get(`/slots/${lotId}`)

    return response.slots
  }

  return {
    create,
    get,
    list
  }
}