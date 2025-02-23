import { useState, useEffect } from 'react'
import { FaEdit, FaPlus, FaSignal } from 'react-icons/fa'

import { FaTrashCan } from 'react-icons/fa6'
import './QuanLyNhanVienLayout.scss'
import moment from 'moment'
import { AddNhanVien } from './AddNhanVien'
import { UpdateNhanVien } from './UpdateNhanVien'
import { XoaNhanVien } from './XoaNhanVien'
import { ChamCongLayoutAdmin } from '../ChamCongLayoutAdmin'
function QuanLyNhanVienLayout () {
  const [data, setData] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenXoaTL, setisOpenXoaTL] = useState(false)
  const [isOpenCapNhat, setisOpenCapNhat] = useState(false)
  const [isOpenChamCong, setisOpenChamCong] = useState(false)

  const fetchdata = async () => {
    try {
      const response = await fetch('http://localhost:8080/getnhanvien')
      if (response.ok) {
        const data = await response.json()
        setData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
    } else {
      setSelectedIds(data.map(item => item._id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectItem = id => {
    let newSelectedIds = [...selectedIds]
    if (newSelectedIds.includes(id)) {
      newSelectedIds = newSelectedIds.filter(itemId => itemId !== id)
    } else {
      newSelectedIds.push(id)
    }
    setSelectedIds(newSelectedIds)

    setSelectAll(newSelectedIds.length === data.length)
  }

  const handleRoleChange = async (id, value) => {
    try {
      const response = await fetch(`http://localhost:8080/setrole/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: value
        })
      })

      if (response.ok) {
        fetchdata()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='theloai_container'>
      <div className='nav_chucnang'>
        <button className='btnthemtheloai' onClick={() => setIsOpen(true)}>
          <FaPlus className='icons' />
          Thêm nhân viên
        </button>
        <button
          className='btnthemtheloai'
          onClick={() => {
            if (selectedIds.length === 0) {
              alert('Chọn một nhân viên để cập nhật')
            } else if (selectedIds.length > 1) {
              alert('Chỉ được chọn một nhân viên để cập nhật')
            } else {
              setisOpenCapNhat(true)
            }
          }}
        >
          <FaEdit className='icons' />
          Cập nhật
        </button>
        <button
          className='btnthemtheloai'
          onClick={() =>
            selectedIds.length > 0
              ? setisOpenXoaTL(true)
              : alert('Chọn nhân viên để xóa')
          }
        >
          <FaTrashCan className='icons' />
          Xóa nhân viên
        </button>

        <button
          className='btnthemtheloai'
          onClick={() => {
            if (selectedIds.length === 0) {
              alert('Chọn một nhân viên để xem dung lượng')
            } else if (selectedIds.length > 1) {
              alert('Chỉ được chọn một nhân viên để xem dung lượng')
            } else {
              setisOpenChamCong(true)
            }
          }}
        >
          <FaSignal className='icons' />
          Chấm công
        </button>
      </div>

      <table className='tablenhap'>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>STT</th>
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Ngày sinh</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Quyền</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <input
                    type='checkbox'
                    checked={selectedIds.includes(item._id)}
                    onChange={() => handleSelectItem(item._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{item.manv}</td>
                <td>{item.hoten}</td>
                <td>{moment(item.ngaysinh).format('DD/MM/YYYY')}</td>
                <td>{item.sodienthoai}</td>
                <td>{item.email}</td>
                <td>{item.chucvu}</td>

                <td>
                  <select
                    value={item.user.role}
                    className='custom-select'
                    onChange={e => handleRoleChange(item._id, e.target.value)}
                  >
                    <option value='nhanvien'>Nhân viên</option>
                    <option value='admin'>Admin</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='8'>Không có nhân viên</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddNhanVien
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fetchdata={fetchdata}
      />
      <UpdateNhanVien
        isOpen={isOpenCapNhat}
        onClose={() => setisOpenCapNhat(false)}
        fetchdata={fetchdata}
        idnhanvien={selectedIds}
      />
      <XoaNhanVien
        isOpen={isOpenXoaTL}
        onClose={() => setisOpenXoaTL(false)}
        idnhanvien={selectedIds}
        fetchdata={fetchdata}
        setSelectedIds={setSelectedIds}
      />
      <ChamCongLayoutAdmin
        isModalOpen={isOpenChamCong}
        setIsModalOpen={setisOpenChamCong}
        idnhanvien={selectedIds}
      />
    </div>
  )
}

export default QuanLyNhanVienLayout
