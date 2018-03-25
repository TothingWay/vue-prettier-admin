# Admin-template

<div>
  <img src="https://img.shields.io/badge/vue-v2.5.2-blue.svg"/>
  <img src="https://img.shields.io/badge/vue--router-v3.0.1-blue.svg"/>
  <img src="https://img.shields.io/badge/vuex-v3.0.1-blue.svg"/>
  <img src="https://img.shields.io/badge/axios-0.18.0-blue.svg"/>
  <img src="https://img.shields.io/badge/element--ui-v2.2.2-blue.svg"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
</div>

## 介绍
基于Vue.js的后端管理基础模板，[项目预览](http://www.tothingway.me/admin/#/login)。

## 功能

* 登录/注销
* 权限验证  
* 动态侧边栏（支持多级路由）
* 动态面包屑
* Svg Sprite 图标
* 401/404错误页面

Ps：写了一篇关于 Svg Sprite 图标的文章 [如何优雅的使用icon？](https://juejin.im/post/5ab5e624f265da23906bf749) 

## 项目结构

<pre>
├── build                  // 构建服务和 webpack 配置
├── config                 // 项目不同环境的配置
├── index.html             // 项目入口文件
├── package.json           // 项目配置文件
├── static                 // 放置静态资源
├── src                    // 生产目录
│   ├── api                   // api请求
│   ├── assets                // 公共的images, js
│   ├── base                  // 公共组件
│   ├── components            // 各种组件
│   ├── icon                  // Svg Sprite 图标
│   ├── store                 // vuex状态管理
│   ├── styles                // 全局CSS样式
│   ├── utils                 // 全局工具函数
│   ├── App.vue               // 主页面
│   ├── router                // 路由配置
│   └── main.js               // Webpack 预编译入口
</pre>

## 安装

``` bash
# 克隆项目
git clone https://github.com/TothingWay/admin-template.git

# 安装依赖
npm install

# 本地开发 启动项目
npm run dev

# 项目打包上线
npm run build
```
## 权限验证

不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成。

**思路:**

* **登录**：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个token，拿到token之后将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态，前端根据token再去拉取一个 `userInfo` 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。
* **权限验证**：通过token获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 `router.addRoutes` 动态挂载这些路由。

Ps: 上述所有的数据和操作都是通过vuex全局管理控制的

## 路由和导航菜单

#### 路由配置项

```javascript
hidden: true                 // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
redirect: noredirect         // 当设置 noredirect 的时候该路由不会在面包屑导航中出现
alwaysShow: true             // 当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
                             // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
name:'router-name'           // 设定路由的名字，一定要填写
meta : {
  roles: ['admin','editor']   // 设置该路由进入的权限，支持多个权限叠加
  title: 'title'              // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'name'                // 设置该路由的图标，名称为src/icons/svg 目录下的svg图标名称
}
```

#### 示例

```javascript
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
}
```

#### 路由
路由分为两种，`constantRouterMap` 和 `asyncRouterMap`

* `constantRouterMap` 代表那些不需要动态判断权限的路由，如登录页，404，等通用页面。

* `asyncRouterMap` 代表那些需求动态判断权限并通过 Vue2.2 的新特性 `addRouters` 动态添加的页面。

#### 侧边栏
侧边栏是通过读取路由并结合权限判断动态生成的，还支持路由无限嵌套

> 在 `Sidebar` 组件中已经做了判断，当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。如果子路由正好等于一个就会默认将子路由作为根路由显示在侧边栏中，若不想，可以通过设置在根路由中设置 `alwaysShow: true` 来取消这一特性

## License
MIT license.


