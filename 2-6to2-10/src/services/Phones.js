import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = (newNumber) => { const request = axios.post(baseURL,newNumber)
  return request.then(response => response.data)
}

const exterminate = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}

const update = (id , newNumber) => {
  return axios.put(`${baseURL}/${id}`, newNumber).then(response => response.data)

}

export default {
  getAll,
  create,
  exterminate,
  update
}
