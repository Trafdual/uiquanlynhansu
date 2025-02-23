/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import dayjs from 'dayjs'
import ModalBig from '../../component/ModalBig/ModalBig'

function ChamCongLayoutAdmin ({ isModalOpen, setIsModalOpen, idnhanvien }) {
  const [chamCongData, setChamCongData] = useState([])

  useEffect(() => {
    const fetchChamCong = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/getchamcongadmin/${idnhanvien}`
        )
        setChamCongData(res.data)
      } catch (error) {
        console.error('Lỗi tải dữ liệu chấm công:', error)
      }
    }
    if (idnhanvien && isModalOpen) {
      fetchChamCong()
    }
  }, [idnhanvien, isModalOpen])

  const getStatus = (checkIn, checkOut) => {
    const checkInTime = dayjs(checkIn).format('HH:mm')
    const checkOutTime = dayjs(checkOut).format('HH:mm')

    const isLate = checkInTime > '09:00'
    const isEarly = checkOutTime < '18:00'

    if (isLate && isEarly) return 'Đi muộn & Về sớm'
    if (isLate) return 'Đi muộn'
    if (isEarly) return 'Về sớm'
    return 'Đúng giờ'
  }

  return (
    <ModalBig isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div>
        <table className='tablenhap'>
          <thead>
            <tr>
              <th>Ngày chấm công</th>
              <th>giờ checkin</th>
              <th>giờ checkout</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {chamCongData.map((cc, index) => (
              <tr key={index}>
                <td>{dayjs(cc.ngaycham).format('DD/MM/YYYY')}</td>
                <td>{dayjs(cc.giocheckin).format('HH:mm')}</td>
                <td>{dayjs(cc.giocheckOut).format('HH:mm')}</td>
                <td>{getStatus(cc.giocheckin, cc.giocheckOut)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalBig>
  )
}

export default ChamCongLayoutAdmin
