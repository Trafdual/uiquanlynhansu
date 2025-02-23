import { useState, useEffect } from 'react'
import {  FaPlus } from 'react-icons/fa'

import { FaTrashCan } from 'react-icons/fa6'
import './MaQrLayout.scss'
import { AddMaQR } from './AddMaQR'
import { XoaMaQR } from './XoaMaQR'

function MaQrLayout () {
  const [data, setData] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenXoaTL, setisOpenXoaTL] = useState(false)

  const fetchdata = async () => {
    try {
      const response = await fetch('http://localhost:8080/getqr')
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

  return (
    <div className='theloai_container'>
      <div className='nav_chucnang'>
        <button className='btnthemtheloai' onClick={() => setIsOpen(true)}>
          <FaPlus className='icons' />
          Thêm mã qr
        </button>

        <button
          className='btnthemtheloai'
          onClick={() =>
            selectedIds.length > 0
              ? setisOpenXoaTL(true)
              : alert('Chọn mã qr để xóa')
          }
        >
          <FaTrashCan className='icons' />
          Xóa mã qr
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
            <th>ID</th>
            <th>Mã QR</th>
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
                <td>{item._id}</td>
                <td>
                  <img src={`${item.image}`} alt='' />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='8'>Không có mã qr</td>
            </tr>
          )}
        </tbody>
      </table>
      <AddMaQR
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fetchdata={fetchdata}
      />
      <XoaMaQR
        isOpen={isOpenXoaTL}
        onClose={() => setisOpenXoaTL(false)}
        idmaqr={selectedIds}
        fetchdata={fetchdata}
        setSelectedIds={setSelectedIds}
      />

    </div>
  )
}

export default MaQrLayout
