import Vue from 'vue'
import Icon from '@/components/Icon'// svg组件

// register globally
Vue.component('icon', Icon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
