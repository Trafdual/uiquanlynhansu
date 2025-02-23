import {
  faBars,
  faBlog,
  faMobile,
  faQrcode,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Sidebar.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar ({ activeTab }) {
  const [istoggle, setIstoggle] = useState(true)
  const navigate = useNavigate() // Hook để chuyển trang

  const data = JSON.parse(sessionStorage.getItem('data')) // Chuyển chuỗi JSON về object

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  const menus =
    data.user.role === 'admin'
      ? data.nhanvien
        ? [
            {
              name: 'Nhân Viên',
              icon: faMobile,
              link: '/trangchu?tab=Nhân Viên'
            },
            { name: 'Mã QR', icon: faQrcode, link: '/trangchu?tab=Mã QR' },
            {
              name: 'Chấm Công',
              icon: faBlog,
              link: '/trangchu?tab=Chấm Công'
            },
            {
              name: 'Đăng Xuất',
              icon: faRightFromBracket,
              action: handleLogout
            }
          ]
        : [
            {
              name: 'Nhân Viên',
              icon: faMobile,
              link: '/trangchu?tab=Nhân Viên'
            },
            { name: 'Mã QR', icon: faQrcode, link: '/trangchu?tab=Mã QR' },
            {
              name: 'Đăng Xuất',
              icon: faRightFromBracket,
              action: handleLogout
            }
          ]
      : [
          { name: 'Chấm Công', icon: faBlog, link: '/trangchu?tab=Chấm Công' },
          { name: 'Đăng Xuất', icon: faRightFromBracket, action: handleLogout }
        ]

  return (
    <div className={`sidebar_container ${istoggle ? 'open' : 'closed'}`}>
      <div className='sidebar_header'>
        <div className={`sidebar_logo ${istoggle ? 'show' : 'hide'}`}>
          <h3>
            {data.user.role === 'admin'
              ? 'Admin'
              : `${data.nhanvien.hoten} - ${data.nhanvien.manv}`}
          </h3>
        </div>
        <div className='sidebar_toggle' onClick={() => setIstoggle(!istoggle)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>

      <div className='sidebar_body'>
        {menus.map((menu, index) =>
          menu.action ? (
            <div key={index} className='sidebar_item' onClick={menu.action}>
              <FontAwesomeIcon icon={menu.icon} className='sidebar_icon' />
              <span className={`sidebar_text ${istoggle ? 'show' : 'hide'}`}>
                {menu.name}
              </span>
            </div>
          ) : (
            <a href={menu.link} key={index}>
              <div
                className={
                  activeTab === menu.name
                    ? 'sidebar_item sidebar_item_active'
                    : 'sidebar_item'
                }
              >
                <FontAwesomeIcon icon={menu.icon} className='sidebar_icon' />
                <span className={`sidebar_text ${istoggle ? 'show' : 'hide'}`}>
                  {menu.name}
                </span>
              </div>
            </a>
          )
        )}
      </div>
    </div>
  )
}

export default Sidebar
