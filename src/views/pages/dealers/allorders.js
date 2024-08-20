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
  CForm,
  CCol,
  CFormInput,
  CDropdownItem,
  CDropdown,
  CBadge,
  CDropdownToggle,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownMenu,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import styles from 'src/assets/styles/homeStyles.css'
import closeImage from '../../../assets/images/close.png'
import ClipLoader from 'react-spinners/ClipLoader'
import image from '../../../assets/images/image.png'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import Quill from 'quill'
import Emoji from 'quill-emoji'

Quill.register('modules/emoji', Emoji)

const AllOrders = () => {
  const [packages, setPackages] = React.useState()
  const [orders, setOrders] = React.useState(true)
  const [pack, setPack] = React.useState()
  const [name, setName] = React.useState()
  const [toast, addToast] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [deleteOrder, setDeleteOrder] = React.useState(false)
  const [deletePhr, setDeletePhr] = React.useState(false)
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
          <div className="fw-bold me-auto">İşlem Başarılı !</div>
        </CToastHeader>
        <CToastBody>{info}</CToastBody>
      </CToast>
    )
  }

  React.useEffect(() => {
    getSekanses(0)
  }, [])

  const getSekanses = (boolean) => {
    try {
      post('/api/admins/get-allorders', { boolean }).then((res) => {
        if (res.result) {
          setPackages(res.allorders)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postUpdate = (id, statu) => {
    try {
      post('/api/admins/post-allorders', { id, statu }).then((res) => {
        if (res.result) {
          setDeleteOrder(null)
          setDeletePhr(null)
          setLoading(false)
          getSekanses(statu)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  if (orders) {
    return (
      <>
        <CToaster ref={toaster} push={toast} placement="top-end" />
        <CCol xs={6}>
          <CButton
            onClick={() => {
              setOrders(false)
              getSekanses(1)
            }}
            style={{ marginTop: 10, marginBottom: 20 }}
            color="success"
            className="px-4"
          >
            Reçete Siparişleri
          </CButton>
        </CCol>
        'Ürün Siparişleri Listelenmektedir'
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">Sipariş Numarası</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Sipariş Tarihi</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Güncellenme Tarihi</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Bayii</CTableHeaderCell>
              <CTableHeaderCell className="text-center">İptal</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {packages?.map((item, index) => {
              return (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* <CTableDataCell className="text-center">
                                        <img src={item?.image} alt='ikon' style={{ width: "50px", height: "50px" }} />
                                    </CTableDataCell> */}
                  <CTableDataCell className="text-center">
                    <div>{item?.orderNo}</div>
                  </CTableDataCell>

                  <CTableDataCell style={{ maxWidth: '300px' }} className="text-center">
                    <div>{item?.createdAt}</div>
                  </CTableDataCell>
                  <CTableDataCell style={{ maxWidth: '300px' }} className="text-center">
                    <div>{item?.updatedAt}</div>
                  </CTableDataCell>
                  <CTableDataCell style={{ maxWidth: '600px' }} className="text-center">
                    <div>{item?.dealer?.name}</div>
                  </CTableDataCell>

                  <CTableDataCell className="text-center">
                    <CButton
                      style={{ marginTop: '10px' }}
                      color="danger"
                      onClick={() => {
                        setDeleteOrder(item)
                      }}
                    >
                      Sil
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
          {deleteOrder ? (
            <div
              style={{
                position: 'absolute',
                zIndex: 10,
                top: 200,
                alignSelf: 'center',
                width: '80vw',
                minHeight: 800,
                backgroundColor: 'white',
                paddingRight: '50px',
                paddingTop: '50px',
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
                    setDeleteOrder(null)
                  }}
                  style={{ width: '50px', height: '50px', borderRadius: '20px' }}
                />
              </div>
              Siparişi Silmek İstediğinizden Emin misiniz? <br />
              Sipariş No : <br />
              {deleteOrder?.orderNo}
              <CTableDataCell className="text-center">
                <CButton
                  style={{ width: '200px', marginTop: '100px', marginBottom: '30px' }}
                  onClick={() => {
                    setLoading(true)
                    postUpdate(deleteOrder.id, 0)
                  }}
                >
                  {loading == true ? (
                    <ClipLoader
                      color={'white'}
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    'Sil'
                  )}
                </CButton>
              </CTableDataCell>
            </div>
          ) : (
            <></>
          )}
        </CTable>
      </>
    )
  } else {
    return (
      <>
        <CToaster ref={toaster} push={toast} placement="top-end" />
        <CCol xs={6}>
          <CButton
            onClick={() => {
              setOrders(true)
              getSekanses(0)
            }}
            style={{ marginTop: 10, marginBottom: 20 }}
            color="info"
            className="px-4"
          >
            Ürün Siparişleri
          </CButton>
        </CCol>
        'Reçete Siparişleri Listelenmektedir'
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">Reçete Numarası</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Reçete Sahibi</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Sipariş Tarihi</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Bayii</CTableHeaderCell>
              <CTableHeaderCell className="text-center">İptal</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {packages?.map((item, index) => {
              return (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* <CTableDataCell className="text-center">
                                        <img src={item?.image} alt='ikon' style={{ width: "50px", height: "50px" }} />
                                    </CTableDataCell> */}
                  <CTableDataCell className="text-center">
                    <div>{item?.prescNo}</div>
                  </CTableDataCell>

                  <CTableDataCell style={{ maxWidth: '300px' }} className="text-center">
                    <div>{item?.personName + ' ' + item?.personSurname} </div>
                    <div>{item?.personPhone} </div>
                  </CTableDataCell>
                  <CTableDataCell style={{ maxWidth: '600px' }} className="text-center">
                    <div>{item?.createdAt}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item?.dealer?.name}</div>
                  </CTableDataCell>

                  <CTableDataCell className="text-center">
                    <CButton
                      style={{ marginTop: '10px' }}
                      color="danger"
                      onClick={() => {
                        setDeletePhr(item)
                      }}
                    >
                      Sil
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
          {deletePhr ? (
            <div
              style={{
                position: 'absolute',
                zIndex: 10,
                top: 200,
                alignSelf: 'center',
                width: '80vw',
                minHeight: 800,
                backgroundColor: 'white',
                paddingRight: '50px',
                paddingTop: '50px',
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
                    setDeletePhr(null)
                  }}
                  style={{ width: '50px', height: '50px', borderRadius: '20px' }}
                />
              </div>
              Siparişi Silmek İstediğinizden Emin misiniz? <br />
              Reçete No : <br />
              {deletePhr?.prescNo}
              <br />
              Kişi :<br />
              {deletePhr?.personName + ' ' + deletePhr?.personSurname}
              <CTableDataCell className="text-center">
                <CButton
                  style={{ width: '200px', marginTop: '100px', marginBottom: '30px' }}
                  onClick={() => {
                    setLoading(true)
                    postUpdate(deletePhr.id, 1)
                  }}
                >
                  {loading == true ? (
                    <ClipLoader
                      color={'white'}
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    'Sil'
                  )}
                </CButton>
              </CTableDataCell>
            </div>
          ) : (
            <></>
          )}
        </CTable>
      </>
    )
  }
}

export default AllOrders
