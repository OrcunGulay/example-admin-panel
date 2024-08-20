/* eslint-disable */
import React from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CCol,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import ClipLoader from 'react-spinners/ClipLoader'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import Quill from 'quill'
import Emoji from 'quill-emoji'
import closeImage from '../../../assets/images/close.png'

Quill.register('modules/emoji', Emoji)

const Sekans = () => {
  const adm = localStorage.getItem('user')
  const admin = JSON.parse(adm)
  const [products, setProducts] = React.useState()
  const [waiting, setWaiting] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [spinner, setSpinner] = React.useState(false)
  const [toast, addToast] = React.useState(0)
  const [openModel, setOpenModal] = React.useState(false)
  const [statu, setStatu] = React.useState(false)
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
    getProducts(1)
  }, [])
  const getProducts = (statu) => {
    try {
      post('/api/admins/get-phrorders', { id: admin?.dealerId, statu }).then((res) => {
        if (res.result) {
          console.log(res)
          setProducts(res.orders)
          setWaiting(false)
          setLoading(null)
          setSpinner(null)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postProduct = (id, block) => {
    try {
      post('/api/admins/post-phrorders', { id, block }).then((res) => {
        if (res.result) {
          addToast(exampleToast('İşlem tamamlandı .'))
          getProducts(1)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postBack = (id, statu) => {
    if (statu == 1) {
      addToast(exampleToast('Sipariş durumunu geri alamazsınız .'))
      getProducts(1)
    } else {
      try {
        post('/api/admins/post-phrorders-back', { id }).then((res) => {
          if (res.result) {
            addToast(exampleToast('İşlem tamamlandı .'))
            getProducts(1)
          }
        })
      } catch (e) {
        console.log('hata')
      }
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCol xs={6}>
        {statu ? (
          <CButton
            onClick={() => {
              setWaiting(true)
              getProducts(1)
              setStatu(false)
            }}
            style={{ marginTop: 10, marginBottom: 20 }}
            color="warning"
            className="px-4"
          >
            Aktif Siparişler{' '}
          </CButton>
        ) : (
          <CButton
            onClick={() => {
              setWaiting(true)
              getProducts(2)
              setStatu(true)
            }}
            style={{ marginTop: 10, marginBottom: 20 }}
            color="warning"
            className="px-4"
          >
            Tüm Reçeteler{' '}
          </CButton>
        )}
      </CCol>
      {statu
        ? 'Tüm siparişler'
        : 'Aktif siparişler   (Siparişi görüntüle kısmından iptal edebilirsiniz...)'}
      {waiting == false ? (
        products?.length > 0 ? (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Ad</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Soyad</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tc</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Telefon</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Sigorta</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Şehir</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Sipariş Tarihi</CTableHeaderCell>
                {statu ? (
                  <>
                    <CTableHeaderCell className="text-center">Durum</CTableHeaderCell>
                  </>
                ) : (
                  <></>
                )}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {openModel ? (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: 200,
                    alignSelf: 'center',
                    width: '80vw',
                    minHeight: 400,
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
                        setOpenModal(false)
                      }}
                      style={{ width: '50px', height: '50px', borderRadius: '20px' }}
                    />
                  </div>

                  <div
                    style={{
                      alignSelf: 'center',
                      width: '80%',
                      flexDirection: 'row',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CForm style={{ width: '80%' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          Şehir: {openModel?.cityName} <br />
                          İlçe: {openModel?.districtName} <br />
                          Mahalle: {openModel?.neighboordName} <br />
                          Posta Kodu: {openModel?.postCode} <br />
                          Açık Adres: {openModel?.openAddress} <br />
                        </div>
                        <div>
                          {statu ? (
                            <></>
                          ) : (
                            <>
                              <div> Dikkat !</div>
                              <div> Sirarişi iptal ettiğiniz taktirde geri alamazsınız.</div>
                              <CButton
                                color={'danger'}
                                onClick={() => {
                                  postProduct(openModel?.id, 1)
                                  setOpenModal(false)
                                }}
                              >
                                Reddet
                              </CButton>
                            </>
                          )}
                        </div>
                      </div>
                      <br /> <br />
                      {openModel?.prescPhoto ? (
                        <img src={openModel?.prescPhoto} />
                      ) : (
                        <>
                          <div>
                            Reçete No: {openModel?.prescNo} <br />
                            Reçete Tarihi: {openModel?.prescDate} <br />
                          </div>
                        </>
                      )}
                    </CForm>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {products?.map((item, index) => {
                return (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">{item?.personName}</CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>{item?.personSurname}</div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">{item?.personTc}</CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>{item?.personPhone}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.personSgr}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.cityName}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.createdAt}</div>
                    </CTableDataCell>
                    {statu ? (
                      <CTableDataCell className="text-center">
                        <div>
                          {item.status == 0
                            ? 'İptal edildi'
                            : item.status == 1
                            ? 'Hazırlanıyor'
                            : item.status == 2
                            ? 'Gönderildi'
                            : item.status == 3
                            ? 'Teslim Edildi'
                            : 'Belirsiz'}
                        </div>
                        <div>{item?.updatedAt}</div>
                      </CTableDataCell>
                    ) : (
                      <></>
                    )}
                    <CTableDataCell className="text-center">
                      <CButton
                        color={'info'}
                        onClick={() => {
                          setOpenModal(item)
                        }}
                      >
                        {loading == item?.id ? (
                          <ClipLoader
                            color={'white'}
                            loading={spinner}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          'Görüntüle'
                        )}
                      </CButton>
                    </CTableDataCell>
                    {statu ? (
                      <></>
                    ) : (
                      <CTableDataCell className="text-center">
                        <CButton
                          color={item.status == 1 ? 'success' : 'warning'}
                          onClick={() => {
                            postProduct(item?.id, 0)
                            setSpinner(item?.id)
                          }}
                        >
                          {spinner == item?.id ? (
                            <ClipLoader
                              color={'white'}
                              loading={spinner}
                              size={20}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : item?.status == 1 ? (
                            'Gönderildi'
                          ) : (
                            'Teslim Edildi'
                          )}
                        </CButton>
                        <br />
                        <CButton
                          style={{ marginTop: 10 }}
                          color={'light'}
                          onClick={() => {
                            postBack(item?.id, item?.status)
                            setSpinner(item?.id)
                          }}
                        >
                          {spinner == item?.id ? (
                            <ClipLoader
                              color={'white'}
                              loading={spinner}
                              size={20}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            ' Geri al'
                          )}
                        </CButton>
                      </CTableDataCell>
                    )}
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <h2>Aktif Siparişiniz bulunmamaktadır</h2>
          </div>
        )
      ) : (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ClipLoader
            color={'blue'}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  )
}

export default Sekans
