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
import { post } from 'src/networking/Server'
;<script src="src\components\script.html"></script>
import ClipLoader from 'react-spinners/ClipLoader'

const Users = () => {
  const [dealers, setDealers] = React.useState([])
  const [dealersWithUsage, setDealersWithUsage] = React.useState([])
  const [loading, setLoading] = React.useState(null)
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
          <div className="fw-bold me-auto">İşlem Başarılı !</div>
        </CToastHeader>
        <CToastBody>{info}</CToastBody>
      </CToast>
    )
  }

  React.useEffect(() => {
    getDealers()
  }, [])
  const getDealers = () => {
    try {
      post('/api/admins/statistics').then((res) => {
        if (res.result) {
          setDealers(res.dealers)
          setDealersWithUsage(res.dealersWithUsage)
          setLoading(null)
        } else {
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postDealers = (id, status) => {
    try {
      post('/api/admins/stop-dealer', { id, status }).then((res) => {
        if (res.result) {
          addToast(exampleToast('İşlem tamamlandı'))
          getDealers()
        } else {
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const closeDealers = (id, status) => {
    try {
      post('/api/admins/close-dealer', { id, status }).then((res) => {
        if (res.result) {
          addToast(exampleToast('İşlem tamamlandı'))
          getDealers()
        } else {
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <div
        style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column-reverse' }}
      >
        {dealers?.map((item, index) => (
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: 20,
              margin: '10px',
              width: '100%',
              backgroundColor: 'white',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <img
                src={item?.image ? JSON.parse(item?.image)[0] : ''}
                alt="Profil fotografı"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '100px',
                  objectFit: 'cover',
                  marginRight: '50px',
                }}
              />
              <p>
                <h3 style={{}}>{item?.name}</h3>({item?.city})
                <br />
              </p>
              <CCol xs={6}>
                {item.status == 1 ? (
                  <CButton
                    onClick={() => {
                      setLoading(item?.id)
                      postDealers(item?.id, 2)
                    }}
                    style={{ marginTop: 10, marginBottom: 20, marginLeft: 50 }}
                    color="primary"
                    className="px-4"
                  >
                    {loading == item?.id ? (
                      <ClipLoader
                        color={'white'}
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Bayii Durdur'
                    )}
                  </CButton>
                ) : item.status == 2 ? (
                  <CButton
                    onClick={() => {
                      setLoading(item?.id)
                      postDealers(item?.id, 1)
                    }}
                    style={{ marginTop: 10, marginBottom: 20, marginLeft: 50 }}
                    color="info"
                    className="px-4"
                  >
                    {loading == item?.id ? (
                      <ClipLoader
                        color={'white'}
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Bayii Devam Ettir'
                    )}
                  </CButton>
                ) : (
                  <></>
                )}
                {item.status == 0 ? (
                  <CButton
                    onClick={() => {
                      setLoading(item?.id)
                      closeDealers(item?.id, 1)
                    }}
                    style={{ marginTop: 10, marginBottom: 20, marginLeft: 50 }}
                    color="success"
                    className="px-4"
                  >
                    {loading == item?.id ? (
                      <ClipLoader
                        color={'white'}
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Bayii Yeniden aç'
                    )}
                  </CButton>
                ) : item.status == 2 ? (
                  <CButton
                    onClick={() => {
                      setLoading(item?.id)
                      closeDealers(item?.id, 0)
                    }}
                    style={{ marginTop: 10, marginBottom: 20, marginLeft: 50 }}
                    color="danger"
                    className="px-4"
                  >
                    {loading == item?.id ? (
                      <ClipLoader
                        color={'white'}
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Bayii Kapat'
                    )}
                  </CButton>
                ) : (
                  <></>
                )}
              </CCol>
            </div>
            {/* {item?.description} */}

            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Toplam Randevu Sayısı</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Aktif Randevu Sayısı</CTableHeaderCell>
                  {item?.meetingId == 3 ? (
                    <>
                      <CTableHeaderCell className="text-center">Toplam Kazanç</CTableHeaderCell>
                    </>
                  ) : (
                    <>
                      <CTableHeaderCell className="text-center">
                        Toplam Sipariş Sayısı
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Teslim Edilen Sipariş Sayısı
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Toplam Sipariş Kazancı
                      </CTableHeaderCell>
                    </>
                  )}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in tableItems">
                  <CTableDataCell className="text-center">
                    {dealersWithUsage[index]?.appoinmentusers?.allAppoint}
                  </CTableDataCell>

                  <CTableDataCell className="text-center">
                    {dealersWithUsage[index]?.appoinmentusers?.activeAppoint}
                  </CTableDataCell>
                  {item?.meetingId == 3 ? (
                    <>
                      <CTableDataCell className="text-center">
                        {item?.price * dealersWithUsage[index]?.appoinmentusers?.allAppoint} ₺
                      </CTableDataCell>
                    </>
                  ) : (
                    <>
                      <CTableDataCell className="text-center">
                        {dealersWithUsage[index]?.orders?.allOrders}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {dealersWithUsage[index]?.orders?.completedOrders}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {dealersWithUsage[index]?.totalPrice?.totalBasketPrice} ₺
                      </CTableDataCell>
                    </>
                  )}
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
        ))}
      </div>
    </>
  )
}
export default Users
