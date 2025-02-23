
import './ChamCongThanhCong.scss'

function ChamCongThanhCong() {
  return (
    <div className='register_container'>
      
      <div className='payment-success-container'>
        <div className='payment-success-content'>
          <div className='checkmark-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-check-circle'
            >
              <path d='M9 12l2 2 4-4' />
              <circle cx='12' cy='12' r='10' />
            </svg>
          </div>
          <h2>Chấm công thành công!</h2>
        </div>
      </div>
    </div>
  )
}

export default ChamCongThanhCong
