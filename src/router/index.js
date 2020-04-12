import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import BooksOperation from '../views/BooksManagement/BooksOperation.vue'
import CategoryManagement from '../views/BooksManagement/CategoryManagement.vue'
import BookDetail from '../views/BooksManagement/BookDetail.vue'
import SalesList from '../views/SalesManagement/SalesList.vue'
import SalesStatistics from '../views/SalesManagement/SalesStatistics.vue'
import OrderDetail from '../views/SalesManagement/OrderDetail.vue'
import Discount from '../views/SalesManagement/Discount.vue'
import Manager from '../views/WebsiteManagement/Manager.vue'
import Swiper from '../views/WebsiteManagement/Swiper.vue'
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
        path: '/home/CategoryManagement',
        name: 'CategoryManagement',
        component: CategoryManagement
      },
      {
        path: '/home/BookDetail',
        name: 'BookDetail',
        component: BookDetail
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
      },
      {
        path: '/home/OrderDetail',
        name: 'OrderDetail',
        component: OrderDetail
      },
      {
        path: '/home/Discount',
        name: 'Discount',
        component: Discount
      },
      {
        path: '/home/Manager',
        name: 'Manager',
        component: Manager
      },
      {
        path: '/home/Swiper',
        name: 'Swiper',
        component: Swiper
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
