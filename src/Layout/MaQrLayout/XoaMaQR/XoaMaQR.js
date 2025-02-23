import { Modal } from '../../../component/Modal'
import { MdDeleteForever } from 'react-icons/md'
import { MdCancelPresentation } from 'react-icons/md'

function XoaMaQR ({
  isOpen,
  onClose,
  idmaqr,
  fetchdata,
  setSelectedIds
}) {
  const handleXoaMaQR = async () => {
    try {
      const response = await fetch(`http://localhost:8080/qrcode/delete-multiple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: idmaqr })
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
        <p>Bạn có chắc muốn xóa mã qr này?</p>
        <div className='divbtnxtl'>
          <button onClick={handleXoaMaQR} className='btndelete'>
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

export default XoaMaQR
