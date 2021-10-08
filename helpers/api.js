import axios from 'axios'

export function createAccount(values) {
  return axios.post('/api/create-account', values)
}

export function confirmPayment(values) {
  return axios.post('/api/confirm-payment', values)
}

export function updateUser(values) {
  return axios.post('/api/update-user', values)
}

export function cancelSubscription(app_user_id) {
  return axios.delete(`/api/subscriptions/${app_user_id}`);
}
