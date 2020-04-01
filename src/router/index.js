import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import BooksOperation from '../views/BooksManagement/BooksOperation.vue'
import BooksStatistics from '../views/BooksManagement/BooksStatistics.vue'
import SalesList from '../views/SalesManagement/SalesList.vue'
import SalesStatistics from '../views/SalesManagement/SalesStatistics.vue'
import axios from 'axios'

Vue.use(VueRouter)
Vue.prototype.$axios = axios

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
        path: '/home/BooksOperation',
        name: 'BooksOperation',
        component: BooksOperation
      },
      {
        path: '/home/BooksStatistics',
        name: 'BooksStatistics',
        component: BooksStatistics
      },
      {
        path: '/home/SalesList',
        name: 'SalesList',
        component: SalesList
      },
      {
        path: '/home/SalesStatistics',
        name: 'SalesStatistics',
        component: SalesStatistics
      }
    ]
  },
  {
    path: '/BooksOperation',
    name: 'BooksOperation',
    component: BooksOperation
  },
  {
    path: '/BooksStatistics',
    name: 'BooksStatistics',
    component: BooksStatistics
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router