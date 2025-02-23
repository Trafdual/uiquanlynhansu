/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from '../../../component/Modal'
import { useState, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'

function UpdateNhanVien ({ isOpen, onClose, fetchdata, idnhanvien }) {
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

  const handelClose = () => {
    setcccd('')
    setgioitinh('Nam')
    setdiachi('')
    setchucvu('')
    setpassword('')
    setusername('')
    sethoten('')
    setemail('')
    setphone('')
    setngaysinh('')
    onClose()
  }

  const fetchchitiet = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getchitietnv/${idnhanvien}`
      )

      if (response.ok) {
        const data = await response.json()
        setusername(data.user.username)
        setemail(data.user.email)
        setphone(data.nhanvien.sodienthoai)
        sethoten(data.nhanvien.hoten)
        setngaysinh((data.nhanvien.ngaysinh).split('T')[0])
        setgioitinh(data.nhanvien.gioitinh)
        setcccd(data.nhanvien.cccd)
        setdiachi(data.nhanvien.diachi)
        setchucvu(data.nhanvien.chucvu)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (idnhanvien && isOpen) {
      fetchchitiet()
    }
  }, [idnhanvien,isOpen])

  const handelUpdateNhanVien = async () => {
    try {
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
      if (response.ok) {
        handelClose()
        fetchdata()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={handelClose}>
      <div className='updateNhanVien'>
        <h2>Cập nhật nhân viên</h2>
        <div className='div_input_group'>
          <div className='input-group'>
            <input
              type='text'
              value={hoten}
              onChange={e => sethoten(e.target.value)}
              placeholder='Nhập tên nhân viên'
            />
            <input
              type='date'
              value={ngaysinh}
              onChange={e => setngaysinh(e.target.value)}
              placeholder='Nhập ngày sinh'
            />
            <input
              type='text'
              value={cccd}
              onChange={e => setcccd(e.target.value)}
              placeholder='Nhập căn cước công dân'
            />
            <input
              type='text'
              value={diachi}
              onChange={e => setdiachi(e.target.value)}
              placeholder='Nhập địa chỉ'
            />
            <input
              type='text'
              value={phone}
              onChange={e => setphone(e.target.value)}
              placeholder='Nhập số điện thoại'
            />
            <input
              type='text'
              value={email}
              onChange={e => setemail(e.target.value)}
              placeholder='Nhập email'
            />
          </div>

          <div className='input-group'>
            <div className='register_input_gioitinh'>
              <label for=''>Giới tính</label>
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

            <input
              type='text'
              value={username}
              onChange={e => setusername(e.target.value)}
              placeholder='Nhập username'
            />
            <input
              type='text'
              value={password}
              onChange={e => setpassword(e.target.value)}
              placeholder='Nhập password'
            />
            <input
              type='text'
              value={chucvu}
              onChange={e => setchucvu(e.target.value)}
              placeholder='Nhập chức vụ'
            />
          </div>
        </div>

        <div className='button-group'>
          <button onClick={handelUpdateNhanVien} className='btnaddtl'>
            Cập nhật
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateNhanVien
