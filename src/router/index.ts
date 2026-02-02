import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Calculator from '../views/Calculator.vue'
import GoldCalculator from '../views/GoldCalculator.vue'
import SilverCalculator from '../views/SilverCalculator.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/gold-calculator',
    name: 'GoldCalculator',
    component: GoldCalculator
  },
  {
    path: '/silver-calculator',
    name: 'SilverCalculator',
    component: SilverCalculator
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
