import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './DangKyLayout.scss'
import { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function DagNhapLayout () {
  const [ispassword, setispassword] = useState(true)
  const [password, setpassword] = useState('')
  const [username, setusername] = useState('')
  const [hoten, sethoten] = useState('')
  const [email, setemail] = useState('')

  const [phone, setphone] = useState('')
  const [ngaysinh, setngaysinh] = useState('')

  const [cccd, setcccd] = useState('')
  const [gioitinh, setgioitinh] = useState('Nam')
  const [diachi, setdiachi] = useState('')
  const [chucvu, setchucvu] = useState('')

  const validate = () => {
    let isValid = true
    if (!password) {
      toast.error('bạn chưa nhập mật khẩu', {
        position: 'top-right',
        autoClose: 2000
      })
      isValid = false
    }
    if (!username) {
      toast.error('bạn chưa nhập tài khoản', {
        position: 'top-right',
        autoClose: 2000
      })
      isValid = false
    }

    return isValid
  }

  const handleregister = async () => {
    try {
      if (validate()) {
        const response = await fetch('http://localhost:8080/registernhanvien', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password,
            email,
            phone,
            hoten,
            ngaysinh,
            gioitinh,
            cccd,
            diachi,
            chucvu
          })
        })
        const data = await response.json()
        if (data.message) {
          toast.error(data.message, {
            position: 'top-right',
            autoClose: 2000
          })
        } else {
          toast.success('đăng ký thành công', {
            position: 'top-right',
            autoClose: 2000
          })

          localStorage.setItem('data', data)
          window.location.href = '/'
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='register_container'>
      <ToastContainer />
      <div className='register_main'>
        <div className='register_right'>
          <div className='register_input'>
            <label htmlFor=''>Tài khoản</label>
            <div className='divinput_register'>
              <input
                type='text'
                placeholder='Nhập tài khoản'
                value={username}
                onChange={e => {
                  setusername(e.target.value)
                }}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='register_input'>
            <label htmlFor=''>Mật khẩu</label>
            <div className='divinput_register'>
              <input
                type={ispassword ? 'password' : 'text'}
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={e => {
                  setpassword(e.target.value)
                }}
                autoComplete='new-password'
              />
              <FontAwesomeIcon
                icon={ispassword ? faEyeSlash : faEye}
                onClick={() => setispassword(!ispassword)}
              />
            </div>
          </div>
          <div className='register_input_gioitinh'>
            <div className='divgoitinh'>
              <input
                type='radio'
                onClick={() => setgioitinh('Nam')}
                checked={gioitinh === 'Nam'}
              />

              <label htmlFor=''>Nam</label>
            </div>
            <div className='divgoitinh'>
              <input
                type='radio'
                onClick={() => setgioitinh('Nữ')}
                checked={gioitinh === 'Nữ'}
              />

              <label htmlFor=''>Nữ</label>
            </div>
          </div>

          <div className='register_input'>
            <label htmlFor=''>Họ và tên</label>
            <div className='divinput_register'>
              <input
                type='text'
                placeholder='Nhập họ và tên'
                value={hoten}
                onChange={e => {
                  sethoten(e.target.value)
                }}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='register_input'>
            <label htmlFor=''>Ngày sinh</label>
            <div className='divinput_register'>
              <input
                type={'date'}
                placeholder='Nhập ngày sinh'
                value={ngaysinh}
                onChange={e => {
                  setngaysinh(e.target.value)
                }}
              />
            </div>
          </div>

          <div className='register_input'>
            <label htmlFor=''>Địa chỉ</label>
            <div className='divinput_register'>
              <input
                type={'text'}
                placeholder='Nhập địa chỉ'
                value={diachi}
                onChange={e => {
                  setdiachi(e.target.value)
                }}
              />
            </div>
          </div>

          <div className='register_input'>
            <label htmlFor=''>Căn cước công dân</label>
            <div className='divinput_register'>
              <input
                type='text'
                placeholder='Nhập Căn cước công dân'
                value={cccd}
                onChange={e => {
                  setcccd(e.target.value)
                }}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='register_input'>
            <label htmlFor=''>Email</label>
            <div className='divinput_register'>
              <input
                type={'email'}
                placeholder='Nhập email'
                value={email}
                onChange={e => {
                  setemail(e.target.value)
                }}
              />
            </div>
          </div>

          <div className='register_input'>
            <label htmlFor=''>Số điện thoại</label>
            <div className='divinput_register'>
              <input
                type={'text'}
                placeholder='Nhập số điện thoại'
                value={phone}
                onChange={e => {
                  setphone(e.target.value)
                }}
              />
            </div>
          </div>
          <div className='register_input'>
            <label htmlFor=''>Chức vụ</label>
            <div className='divinput_register'>
              <input
                type={'text'}
                placeholder='Nhập chức vụ'
                value={chucvu}
                onChange={e => {
                  setchucvu(e.target.value)
                }}
              />
            </div>
          </div>

          <div className='register_button'>
            <button onClick={handleregister}>Đăng ký</button>
            <p>
              Bạn đã có tài khoản? <a href='/'>Đăng nhập</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DagNhapLayout
