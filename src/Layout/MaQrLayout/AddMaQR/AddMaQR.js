import { Modal } from '../../../component/Modal'
import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'

function AddMaQR ({ isOpen, onClose, fetchdata }) {
  const [url, seturl] = useState('')

  const handelClose = () => {
    seturl('')

    onClose()
  }

  const handelAddMaQR = async () => {
    try {
      const response = await fetch('http://localhost:8080/qrcode/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url
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
      <div className='AddMaQR'>
        <h2>Thêm qr</h2>
        <div className='div_input_group'>
          <div className='input-group'>
            <input
              type='text'
              value={url}
              onChange={e => seturl(e.target.value)}
              placeholder='Nhập url trang đích'
            />
          </div>
        </div>

        <div className='button-group'>
          <button onClick={handelAddMaQR} className='btnaddtl'>
            Thêm
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddMaQR
