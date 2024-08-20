/* eslint-disable */
import React from 'react'
import {
  CAvatar,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCol,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { post } from 'src/networking/Server'
import { cilPeople } from '@coreui/icons'
import closeImage from '../../../assets/images/close.png'
import ClipLoader from 'react-spinners/ClipLoader'
;<script src="src\components\script.html"></script>

const DealerR = () => {
  const admin = JSON.parse(localStorage.getItem('user'))
  const [users, setUsers] = React.useState([])
  const [waiting, setWaiting] = React.useState(false)
  const [dealer, setDealer] = React.useState()
  const [imageModal, setImageModal] = React.useState(false)
  const handleReload = () => {
    setWaiting(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000) // 2000 milisaniye (2 saniye) bekleyecek
  }
  const [toast, addToast] = React.useState(0)
  const toaster = React.useRef()
  const exampleToast = (info) => {
    return (
      <CToast>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <div className="fw-bold me-auto"></div>
        </CToastHeader>
        <CToastBody>{info}</CToastBody>
      </CToast>
    )
  }

  React.useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    try {
      post('/api/admins/get-appoinments', { dealerId: admin?.dealerId }).then((res) => {
        if (res.result) {
          setUsers(res.appoinments)
          setDealer(res.dealer)
        } else {
          addToast(exampleToast('Bir şeyler Ters Gitti.'))
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const setBlock = (id) => {
    try {
      post('/api/admins/post-appoinment', { id }).then((res) => {
        addToast(exampleToast('Randevu iptal edildi'))
      })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>
                <CIcon icon={cilPeople} />
                Randevu Sahibi
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">Gün</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Saat</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Alan</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Açıklama</CTableHeaderCell>
              {dealer?.meetingId == 4 ? (
                <CTableHeaderCell className="text-center">Görsel</CTableHeaderCell>
              ) : (
                <></>
              )}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {imageModal ? (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  top: 200,
                  alignSelf: 'center',
                  width: '50vw',
                  minHeight: 400,
                  backgroundColor: 'white',
                  paddingRight: '50px',
                  paddingTop: '10px',
                  borderRadius: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}
                >
                  <img
                    src={closeImage}
                    alt="aktif"
                    onClick={() => {
                      setImageModal(false)
                    }}
                    style={{ width: '50px', height: '50px', borderRadius: '20px' }}
                  />
                </div>

                <img
                  src={{uri:imageModal?.image}}
                  style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain' }}
                  alt="image"
                />
                <img
                  src={{uri:imageModal?.imageTwo}}
                  style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain' }}
                  alt="image"
                />
                <img
                  src={{uri:imageModal?.imageThr}}
                  style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain' }}
                  alt="image"
                />
              </div>
            ) : (
              <></>
            )}

            {users?.map((item, index) => {
              return (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>
                    <div>
                      {item?.name} {item?.surname}
                    </div>
                    <div className="small text-medium-emphasis">
                      tc : {item?.tc} | telefon : {item?.phone}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item?.days}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item?.hours}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item?.meetingSubc?.name}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item?.description}</div>
                  </CTableDataCell>
                  {dealer?.meetingId == 4 ? (
                    item?.image ? (
                      <CTableDataCell className="text-center">
                        <CButton
                          disabled={waiting}
                          color="info"
                          onClick={() => {
                            setImageModal(item)
                          }}
                        >
                          Görüntüle
                        </CButton>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell className="text-center">Görsel Yok</CTableDataCell>
                    )
                  ) : (
                    <></>
                  )}

                  <CTableDataCell className="text-center">
                    <CButton
                      disabled={waiting}
                      color="danger"
                      onClick={() => {
                        setBlock(item?.id)
                        handleReload()
                      }}
                    >
                      İptal
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </>
    </>
  )
}
export default DealerR
