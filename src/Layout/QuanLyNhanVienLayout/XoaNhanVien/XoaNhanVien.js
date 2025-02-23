import { Modal } from '../../../component/Modal'
import './XoaNhanVien.scss'
import { MdDeleteForever } from 'react-icons/md'
import { MdCancelPresentation } from 'react-icons/md'

function XoaNhanVien ({
  isOpen,
  onClose,
  idnhanvien,
  fetchdata,
  setSelectedIds
}) {
  const handleXoaNhanVien = async () => {
    try {
      const response = await fetch(`http://localhost:8080/deleteNhanvien`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: idnhanvien })
      })
      if (response.ok) {
        onClose()
        setSelectedIds([])
        fetchdata()
        alert('Xóa thành công!')
      }
    } catch (error) {
      console.error('lỗi xóa nhân viên:', error)
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <p>Bạn có chắc muốn xóa nhân viên này?</p>
        <div className='divbtnxtl'>
          <button onClick={handleXoaNhanVien} className='btndelete'>
            <MdDeleteForever />
            Xóa
          </button>
          <button onClick={onClose} className='btnhuy'>
            <MdCancelPresentation />
            Hủy
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default XoaNhanVien
