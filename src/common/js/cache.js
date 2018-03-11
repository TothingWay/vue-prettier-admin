import storage from 'good-storage'

const loginKey = '__login__'

export function saveLogin (user) {
  storage.set(loginKey, user)
}

export function loadLogin () {
  return storage.get(loginKey, {})
}
