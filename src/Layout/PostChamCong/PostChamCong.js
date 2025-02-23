import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PostChamCong () {
  const [manv, setmanv] = useState('')

  const validate = () => {
    let isValid = true

    if (!manv) {
      toast.error('bạn chưa nhập mã nhân viên', {
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
        const response = await fetch('http://localhost:8080/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            manv
          })
        })
        const data = await response.json()
        if (data.message) {
          toast.error(data.message, {
            position: 'top-right',
            autoClose: 2000
          })
        } else {
          window.location.href = data.data
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
            <label htmlFor=''>Mã nhân viên</label>
            <div className='divinput_register'>
              <input
                type='text'
                placeholder='Nhập mã nhân viên'
                value={manv}
                onChange={e => {
                  setmanv(e.target.value)
                }}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='register_button'>
            <button onClick={handleregister}>Chấm công</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostChamCong
