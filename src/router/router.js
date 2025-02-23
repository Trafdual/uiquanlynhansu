import { DangNhapLayout } from '../Layout/DangNhapLayout'
import { DangKyLayout } from '../Layout/DangKyLayout'
import { DefaultLayout } from '../Layout/DefaultLayout'
import { PostChamCong } from '../Layout/PostChamCong'
import { ChamCongThanhCong } from '../Layout/ChamCongThanhCong'

const publicRoutes = [
  { path: '/', component: DangNhapLayout, layout: null },
  { path: '/register', component: DangKyLayout, layout: null },
  { path: '/trangchu', component: DefaultLayout, layout: null },
  { path: '/postchamcong', component: PostChamCong, layout: null },
  { path: '/chamcongthanhcong', component: ChamCongThanhCong, layout: null }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
