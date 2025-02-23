import { useState, useEffect } from 'react'
import Calendar from 'react-calendar' // Thư viện lịch
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import dayjs from 'dayjs'
import './ChamCongLayout.scss'

function ChamCongLayout () {
  const [date, setDate] = useState(new Date())
  const [chamCongData, setChamCongData] = useState([])
  const [modalData, setModalData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const data = JSON.parse(sessionStorage.getItem('data'))

  useEffect(() => {
    const fetchChamCong = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/getchamcong/${data.user._id}`
        )
        setChamCongData(res.data)
      } catch (error) {
        console.error('Lỗi tải dữ liệu chấm công:', error)
      }
    }

    fetchChamCong()
  }, [data.user._id])

  // Lấy dữ liệu của ngày được chọn
  const getChamCongStatus = date => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD')
    const record = chamCongData.find(
      cc => dayjs(cc.ngaycham).format('YYYY-MM-DD') === formattedDate
    )

    if (!record) return null

    const checkIn = record.giocheckin
      ? dayjs(record.giocheckin).format('HH:mm')
      : 'Không có'
    const checkOut = record.giocheckOut
      ? dayjs(record.giocheckOut).format('HH:mm')
      : 'Không có'

    const checkInTime = record.giocheckin ? dayjs(record.giocheckin) : null
    const checkOutTime = record.giocheckOut ? dayjs(record.giocheckOut) : null

    const standardCheckIn = dayjs(record.ngaycham).hour(9).minute(0).second(0)
    const standardCheckOut = dayjs(record.ngaycham).hour(18).minute(0).second(0)

    let note = 'Đúng giờ'

    if (
      checkInTime &&
      checkInTime.isAfter(standardCheckIn) &&
      checkOutTime &&
      checkOutTime.isBefore(standardCheckOut)
    ) {
      note = 'Check-in muộn & Check-out sớm'
    } else if (checkInTime && checkInTime.isAfter(standardCheckIn)) {
      note = 'Check-in muộn'
    } else if (checkOutTime && checkOutTime.isBefore(standardCheckOut)) {
      note = 'Check-out sớm'
    }

    const className = note === 'Đúng giờ' ? 'green-day' : 'red-day'

    return { className, note, checkIn, checkOut }
  }

  // Khi click vào ngày, mở modal
  const handleDayClick = date => {
    const status = getChamCongStatus(date)
    if (status) {
      setModalData({ ...status, date: dayjs(date).format('DD/MM/YYYY') })
      setIsModalOpen(true)
    }
  }

  return (
    <div className='chamcong-container'>
      <h2 className='title'>Lịch Chấm Công</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) => getChamCongStatus(date)?.className}
        onClickDay={handleDayClick}
      />

      {/* Hiển thị modal khi click vào ngày */}
      {isModalOpen && modalData && (
        <div className='modal-chamcong'>
          <div className='modal-chamcong-content'>
            <span
              className='close-chamcong'
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h3>Chi Tiết Chấm Công</h3>

            <p>
              <strong>Ngày:</strong> {modalData.date}
            </p>
            <p>
              <strong>Giờ làm việc:</strong> 09:00 - 18:00
            </p>

            <p>
              <strong>Check-in:</strong> {modalData.checkIn}
            </p>
            <p>
              <strong>Check-out:</strong> {modalData.checkOut}
            </p>
            <p>
              <strong>Trạng thái:</strong> {modalData.note}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChamCongLayout
