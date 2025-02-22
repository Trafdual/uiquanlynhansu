import { DangNhapLayout } from '../Layout/DangNhapLayout'
import { DangKyLayout } from '../Layout/DangKyLayout'
import { DefaultLayout } from '../Layout/DefaultLayout'

const publicRoutes = [
  { path: '/login', component: DangNhapLayout, layout: null },
  { path: '/register', component: DangKyLayout, layout: null },
  { path: '/trangchu', component: DefaultLayout, layout: null }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
