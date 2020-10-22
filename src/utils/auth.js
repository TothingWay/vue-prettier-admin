import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// TagsView
const TagsView = 'TagsView'

export function getTagsView() {
  return Cookies.get(TagsView)
}

export function setTagsView(isOpen) {
  return Cookies.set(TagsView, isOpen)
}

// FixedHeader
const FixedHeader = 'FixedHeader'

export function getFixedHeader() {
  return Cookies.get(FixedHeader)
}

export function setFixedHeader(isOpen) {
  return Cookies.set(FixedHeader, isOpen)
}

// SidebarLogo
const SidebarLogo = 'SidebarLogo'

export function getSidebarLogo() {
  return Cookies.get(SidebarLogo)
}

export function setSidebarLogo(isOpen) {
  return Cookies.set(SidebarLogo, isOpen)
}
