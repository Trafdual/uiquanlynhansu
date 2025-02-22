import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useSearchParams } from 'react-router-dom'
import { QuanLyNhanVienLayout } from '../QuanLyNhanVienLayout'
import './DefaultLayout.scss'

function DefaultLayout () {
  const [searchParams] = useSearchParams()
  const tabFromUrl = searchParams.get('tab') || 'Trang chủ'

  return (
    <div className='default_container'>
      <Sidebar activeTab={tabFromUrl} />

      <div className='default_content'>
        <Header />
        {tabFromUrl === 'Nhân Viên' && <QuanLyNhanVienLayout />}
      </div>
    </div>
  )
}

export default DefaultLayout
