import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = ()=> import('views/home/home')
const Category = ()=> import('views/category/category')
const Shopcart = ()=> import('views/cart/shopcart')
const Profile = ()=> import('views/profile/profile')
const Detail = ()=> import('views/detail/Detail')
const Map = ()=> import('views/map/MapSearch')


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Shopcart 
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/map',
    component: Map
  },

]

const router = new VueRouter({
  routes
})

export default router
