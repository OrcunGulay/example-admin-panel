/* eslint-disable */
import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import closeImage from '../../assets/images/close.png'
import ClipLoader from 'react-spinners/ClipLoader'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilUserX,
  cilUserUnfollow,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { post } from 'src/networking/Server'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const [object, setObject] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [campaign, setCampaign] = React.useState('')
  const [progressGroupExample2, setprogressGroupExample2] = React.useState([])
  const [campaignModal, setCampaignModal] = React.useState(null)
  const adm = localStorage.getItem('user')
  const admin = JSON.parse(adm)
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
    getHome()
  }, [])

  const getHome = () => {
    if (admin?.degree === 1) {
      post('/api/admins/get-home-superadmin').then((res) => {
        if (res.result) {
          setObject(res)
          setprogressGroupExample2([
            {
              title: 'Ebeveyn',
              icon: cilUser,
              value: ((res.parentCount / res.userCount) * 100).toFixed(2),
            },
            {
              title: 'Sipariş Teslim',
              icon: cilUserFemale,
              value: ((res.complorderCount / res.orderCount) * 100).toFixed(2),
            },
            {
              title: 'İptal - İade',
              icon: cilUserX,
              value: ((res.cancelorderCount / res.orderCount) * 100).toFixed(2),
            },
            {
              title: 'Abonelik Kullanım',
              icon: cilUserUnfollow,
              value: ((res.phrorderCount / res.subscriptionCount) * 100).toFixed(2),
            },
          ])
        }
      })
    } else {
      post('/api/admins/get-home-admin').then((res) => {
        if (res.result) {
          setObject(res)
          setprogressGroupExample2([
            {
              title: 'Bu Ay / Geçen Ay',
              icon: cilUser,
              value: ((res.topMonth / res.topLastMonth) * 100).toFixed(2),
            },
            {
              title: 'İptal / Randevular',
              icon: cilUserFemale,
              value: ((res.topCancel / res.topAppoint) * 100).toFixed(2),
            },
            {
              title: 'Ben / Diğer Bayiiler',
              icon: cilUserX,
              value: ((res.topAppoint / res.otherDealer) * 100).toFixed(2),
            },
            {
              title: 'Bu Ay / Tüm Zaman',
              icon: cilUserUnfollow,
              value: ((res.topMonth / res.topAppoint) * 100).toFixed(2),
            },
          ])
        }
      })
    }
  }

  const postCampaign = (discount, id) => {
    post('/api/admins/post-campaign', { discount, id }).then((res) => {
      if (res.result) {
        addToast(exampleToast('Kampanya Eklendi.'))
        setCampaignModal(null)
        window.location.reload()
      }
    })
  }

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      {admin?.degree != 1 && object?.dealer?.status == 2 ? (
        <div style={{ fontFamily: 'bold', color: 'red', fontSize: 20 }}>
          {' '}
          Üyeliğiniz / Bayiiniz Admin tarafından durudulmuştur. Yeni sipariş ve randevu
          alamayacaksınız
        </div>
      ) : (
        <></>
      )}
      <WidgetsDropdown />

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Trafik {' & '} Durumlar</CCardHeader>

            <CCardBody>
              {admin?.degree == 1 ? (
                <CRow>
                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3">
                          <div className="text-medium-emphasis small">Yeni Ürünler</div>
                          <div className="fs-5 fw-semibold">{object?.lastProducts}</div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Yeni Bayiiler</div>
                          <div className="fs-5 fw-semibold">{object?.lastDealers}</div>
                        </div>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />
                  </CCol>

                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Yeni Randevular</div>
                          <div className="fs-5 fw-semibold">{object?.lastAppoinment}</div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Yeni Katılanlar</div>
                          <div className="fs-5 fw-semibold">{object?.lastUsers}</div>
                        </div>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />
                    <div className="mb-5"></div>
                  </CCol>
                </CRow>
              ) : (
                <CRow>
                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3">
                          <div className="text-medium-emphasis small">Hizmet Kategori Sayısı</div>
                          <div className="fs-5 fw-semibold">{object?.subcCount}</div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">En Çok Verilen Hizmet</div>
                          <div className="fs-5 fw-semibold">
                            {object?.servicesName + '   (' + object?.servicesCount + ')'}
                          </div>
                        </div>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />
                  </CCol>

                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">
                            En Çok Tercih Edilen Saat
                          </div>
                          <div className="fs-5 fw-semibold">
                            {' '}
                            {object?.hoursName + '       (' + object?.hoursCount + ')'}
                          </div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Bayii Puanım</div>
                          <div className="fs-5 fw-semibold">{object?.puan}</div>
                        </div>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />
                    <div className="mb-5"></div>
                  </CCol>
                </CRow>
              )}
              <CCardHeader>
                Randevularınızın geçen aya oranı, iptal oranı, diğer bayiilere göre randevu oranı ve
                tüm zamana oranı gösterilmektedir.{' '}
              </CCardHeader>

              {progressGroupExample2.map((item, index) => (
                <div className="progress-group mb-4" key={index}>
                  <div className="progress-group-header">
                    <CIcon className="me-2" icon={item.icon} size="lg" />
                    <span>{item.title}</span>
                    <span className="ms-auto fw-semibold">{item.value}%</span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color="warning" value={item.value} />
                  </div>
                </div>
              ))}

              <br />
              {admin?.degree === 1 ? (
                <>
                  <h5 style={{ marginBottom: 20, marginLeft: 20 }}>Rekabet Gören Ürünler</h5>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">Adı</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Görsel</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Fiyat</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Kampanya Ekle</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {object?.topProducts?.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <span>{item.name}</span>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CAvatar
                              size="md"
                              src={JSON.parse(item.images)[0]}
                              status={JSON.parse(item.images)[0]}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span>{item.price} ₺</span>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {item?.discount > 0 ? (
                              <div>{item.discount} %</div>
                            ) : (
                              <CButton
                                onClick={() => {
                                  setCampaignModal(item)
                                }}
                                color="success"
                                style={{ color: 'white' }}
                              >
                                Kampanya Ekle
                              </CButton>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                  {campaignModal ? (
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        top: 500,
                        right: '20vw',
                        alignSelf: 'center',
                        width: '30vw',
                        minHeight: 50,
                        backgroundColor: 'white',
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
                            setCampaignModal(null)
                          }}
                          style={{ width: '50px', height: '50px', borderRadius: '20px' }}
                        />
                      </div>

                      <CForm style={{ width: '80%' }}>
                        Kategori Adı
                        <CFormInput
                          className="me-sm-2"
                          defaultValue={campaignModal?.discount}
                          size="sm"
                          onChange={(e) => {
                            setCampaign(e.target.value)
                          }}
                        />
                      </CForm>

                      <CTableDataCell className="text-center">
                        <CButton
                          style={{ width: '200px', marginTop: '20px', marginBottom: '30px' }}
                          onClick={() => {
                            postCampaign(campaign, campaignModal?.productId)
                            setLoading(true)
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
                            'Ekle'
                          )}
                        </CButton>
                      </CTableDataCell>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <h5 style={{ marginBottom: 20, marginLeft: 20 }}>Bugünün Randevuları</h5>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">Randevu Sahibi</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Telefon</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Saat</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Hizmet Alanı</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Açıklama</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {object?.todayAppoint?.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <span>
                              {item?.name} {item?.surname}
                            </span>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span>{item?.phone}</span>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span>{item?.hours}</span>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span>{item?.meetingSubc?.name}</span>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <span>{item?.description}</span>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
