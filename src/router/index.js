import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const layout = () => import('@/base/layout/layout')
const page401 = () => import('@/base/errorPage/401')
const page404 = () => import('@/base/errorPage/404')
const overview = () => import('@/components/overview')
const login = () => import('@/components/login')

const iconExample = () => import('@/components/iconExample')
const permission = () => import('@/components/permission')
const button = () => import('@/components/button')
const tableMain = () => import('@/components/table')
const baseTable = () => import('@/components/table/base')
const borderTable = () => import('@/components/table/border')
const clipboard = () => import('@/components/clipboard')

/**
 * 路由配置项
 *
 * hidden: true                 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
 * redirect: noredirect         当设置 noredirect 的时候该路由不会在面包屑导航中出现
 * alwaysShow: true             当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
 *                              当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
 * name:'router-name'           设定路由的名字，一定要填写
 * meta : {
 *  roles: ['admin','editor']   设置该路由进入的权限，支持多个权限叠加
 *  title: 'title'              设置该路由在侧边栏和面包屑中展示的名字
 *  icon: 'name'                设置该路由的图标，名称为src/icons/svg 目录下的svg图标名称
 * }
 */

export const constantRouterMap = [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/404',
    component: page404,
    hidden: true
  },
  {
    path: '/401',
    component: page401,
    hidden: true
  },
  {
    path: '',
    component: layout,
    redirect: 'overview',
    hidden: true,
    children: [{
      path: 'overview',
      component: overview,
      name: 'overview',
      meta: {
        title: '总览'
      }
    }]
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/icon',
    component: layout,
    children: [{
      path: 'index',
      component: iconExample,
      name: 'iconExample',
      meta: {
        icon: 'icon',
        title: 'icon'
      }
    }]
  },
  {
    path: '/permission',
    component: layout,
    meta: {
      roles: ['admin'] // you can set roles in root nav
    },
    children: [{
      path: 'index',
      component: permission,
      name: 'permission',
      meta: {
        icon: 'key',
        title: '权限测试',
        meta: {
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    }]
  },
  {
    path: '/example',
    component: layout,
    meta: {
      icon: 'sort_light',
      title: '无限嵌套'
    },
    children: [
      {
        path: '/example/table',
        component: tableMain,
        name: 'tableMain',
        meta: {
          icon: 'tables',
          title: '表格'
        },
        children: [
          {
            path: 'baseTable',
            component: baseTable,
            name: 'baseTable',
            meta: {
              title: '基本表格'
            }
          },
          {
            path: 'borderTable',
            component: borderTable,
            name: 'borderTable',
            meta: {
              title: '带边框表格'
            }
          }
        ]
      },
      {
        path: 'button',
        component: button,
        name: 'buttons',
        meta: {
          icon: 'button',
          title: '按钮'
        }
      }
    ]
  },
  {
    path: '/clipboard',
    component: layout,
    children: [{
      path: 'index',
      component: clipboard,
      name: 'clipboard',
      meta: {
        icon: 'clipboard',
        title: '复制粘贴'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
