import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/teste',
      name: 'Teste',
      component: Index
    }
  ]
})
