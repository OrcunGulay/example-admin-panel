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
  CFormInput,
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
  const [dealer, setDealer] = React.useState()
  const [cargoName, setCargoName] = React.useState('')
  const [cargoNo, setCargoNo] = React.useState('')
  const [toast, addToast] = React.useState(0)
  const [openModel, setOpenModal] = React.useState(false)
  const [blockModal, setBlockModal] = React.useState(false)
  const [cargoModal, openCargoModal] = React.useState(false)
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
    getProducts()
  }, [])
  const getProducts = () => {
    try {
      post('/api/admins/get-myorders', { id: admin?.dealerId }).then((res) => {
        if (res.result) {
          setProducts(res.products)
          setDealer(res.dealer)
          setWaiting(false)
          setLoading(null)
          setSpinner(null)
          setCargoName(null)
          setCargoNo(null)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postProduct = (id, block) => {
    try {
      post('/api/admins/post-myorders', { id, block, cargoName, cargoNo }).then((res) => {
        if (res.result) {
          addToast(exampleToast('İşlem tamamlandı .'))
          getProducts()
          setBlockModal(null)
          openCargoModal(false)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postBack = (id, status) => {
    try {
      if (status > 1) {
        post('/api/admins/post-myorders-back', { id }).then((res) => {
          if (res.result) {
            addToast(exampleToast('İşlem tamamlandı .'))
            getProducts()
          }
        })
      } else {
        addToast(exampleToast('İlk aşama geriye alınamaz.'))
        getProducts()
      }
    } catch (e) {
      console.log('hata')
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCol xs={6}>
        <CButton
          onClick={() => {
            window.location.href = '#/dealer/myblockedorders'
          }}
          style={{ marginTop: 10, marginBottom: 20 }}
          color="danger"
          className="px-4"
        >
          İptal, İade / Red
        </CButton>
        {dealer?.meetingId == 2 ? (
          <CButton
            onClick={() => {
              window.location.href = '#/dealer/phrorders'
            }}
            style={{ marginTop: 10, marginBottom: 20, marginLeft: 20 }}
            color="success"
            className="px-4"
          >
            Reçete Siparişleri{' '}
          </CButton>
        ) : (
          <></>
        )}
      </CCol>
      {waiting == false ? (
        products?.length > 0 ? (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Ürün Görseli</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ürün Adı</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Beden</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Renk</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Adet</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Müşteri</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Adres</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Sipariş Tarihi-No</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Durum</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Durumu Güncelle</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Reddet</CTableHeaderCell>
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
                    width: '50vw',
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
                      {openModel?.addressId ? (
                        <div>
                          Şehir: {openModel?.address?.city} <br />
                          İlçe: {openModel?.address?.district} <br />
                          Mahalle: {openModel?.address?.neighboord} <br />
                          Sokak: {openModel?.address?.street} <br />
                          Kapı No: {openModel?.address?.homeNo} <br />
                          Posta Kodu: {openModel?.address?.code} <br />
                          Açık Adres: {openModel?.address?.openAddress} <br />
                        </div>
                      ) : (
                        <div>
                          Şehir: {openModel?.city} <br />
                          İlçe: {openModel?.district} <br />
                          Mahalle: {openModel?.neighboord} <br />
                          Sokak: {openModel?.street} <br />
                          Kapı No: {openModel?.homeNo} <br />
                          Posta Kodu: {openModel?.postaCode} <br />
                          Açık Adres: {openModel?.openAddress} <br />
                        </div>
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
                    <CTableDataCell className="text-center">
                      <img
                        src={
                          item?.basket?.product?.images
                            ? JSON.parse(item?.basket?.product?.images)[0]
                            : []
                        }
                        alt="ikon"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>{item?.basket?.product?.name}</div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>
                        {item?.basket?.size == 0
                          ? 'XS'
                          : item?.basket?.size == 1
                          ? 'Small'
                          : item?.basket?.size == 2
                          ? 'Medium'
                          : item?.basket?.size == 3
                          ? 'Large'
                          : item?.basket?.size == 4
                          ? 'XL'
                          : item?.basket?.size == 5
                          ? 'XXL'
                          : item?.basket?.size == 6
                          ? 'XXXL'
                          : 'Hata'}
                      </div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>
                        {item?.basket?.color == 0
                          ? 'Beyaz'
                          : item?.basket?.color == 1
                          ? 'Siyah'
                          : item?.basket?.color == 2
                          ? 'Mor'
                          : item?.basket?.color == 3
                          ? 'Sarı'
                          : item?.basket?.color == 4
                          ? 'Kırmızı'
                          : item?.basket?.color == 5
                          ? 'Mavi'
                          : item?.basket?.color == 6
                          ? 'Yeşil'
                          : 'Hata'}
                      </div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>{item?.basket?.number}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>
                        {item?.owner ??
                          item?.basket?.user?.name + '  ' + item?.basket?.user?.surname}
                      </div>
                      <div>{item?.basket?.user?.phone}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.addressId ? item?.address?.city : item?.city}</div>
                      <div>
                        <CButton
                          color={'light'}
                          onClick={() => {
                            setOpenModal(item)
                          }}
                        >
                          Görüntüle
                        </CButton>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.createdAt}</div>
                      <div style={{ color: 'red', fontFamily: 'bold' }}>S. No: {item?.orderNo}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>
                        {item?.status == 1
                          ? 'Sipariş alındı'
                          : item?.status == 2
                          ? 'Hazırlanıyor'
                          : item?.status == 3
                          ? 'Kargoya verildi'
                          : 'Belirsiz'}
                      </div>
                      <div style={{ color: 'red', fontFamily: 'bold' }}>
                        {item?.status == 3 ? 'no: ' + item?.deliveryNo : ''}
                      </div>
                      <div>{item?.updatedAt}</div>
                      {/* <div style={{ color: 'red', fontFamily: 'bold' }}> */}
                      {/* {!item?.cardId && !item?.cardNumber ? 'Kapıda Ödeme' : ''} */}
                      {/* </div> */}
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <CButton
                        color={
                          item?.status == 1
                            ? 'warning'
                            : item?.status == 2
                            ? 'dark'
                            : item?.status == 3
                            ? 'success'
                            : 'danger'
                        }
                        onClick={() => {
                          if (item.status == 2) {
                            openCargoModal(item?.id)
                          } else {
                            postProduct(item?.id)
                            setLoading(item?.id)
                          }
                        }}
                      >
                        {loading == item?.id ? (
                          <ClipLoader
                            color={'white'}
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : item?.status == 1 ? (
                          'Hazırlanıyor'
                        ) : item?.status == 2 ? (
                          'Kargoya Verildi'
                        ) : item?.status == 3 ? (
                          'Teslim Edildi'
                        ) : (
                          'Hata'
                        )}
                      </CButton>
                      <br />
                      <CButton
                        style={{ marginTop: 10 }}
                        color={'light'}
                        onClick={() => {
                          postBack(item?.id, item?.status)
                          setLoading(item?.id)
                        }}
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
                          'geri al'
                        )}
                      </CButton>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <CButton
                        color={'danger'}
                        onClick={() => {
                          setBlockModal(item)
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
                          'Reddet'
                        )}
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
              {blockModal ? (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: 200,
                    alignSelf: 'center',
                    width: '70vw',
                    minHeight: 500,
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
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={closeImage}
                      alt="aktif"
                      onClick={() => {
                        setBlockModal(null)
                      }}
                      style={{ width: '50px', height: '50px', borderRadius: '20px' }}
                    />
                    <br />
                    <br />
                    <div style={{ fontFamily: 'bold', fontSize: 20, color: 'red' }}>
                      {' '}
                      Bu işlemi geri alamazsınız!{' '}
                    </div>
                    <div style={{ fontFamily: 'bold', fontSize: 20, color: 'black' }}>
                      Siparişi reddettiğiniz taktirde farklı bir bayii için sipraiş
                      oluşturulacaktır.
                    </div>
                    <div style={{ fontFamily: 'bold', fontSize: 18, color: 'red' }}>
                      {' '}
                      Siparişi reddetmek istediğinizden emin misiniz?
                    </div>
                    <br />
                    <br />
                    {blockModal?.basket?.user?.name + '  ' + blockModal?.basket?.user?.surname}
                    <br />
                    {blockModal?.addressId ? blockModal?.address?.city : blockModal?.city}
                    <br />
                    {blockModal?.basket?.product?.name}
                  </div>

                  <CTableDataCell className="text-center">
                    <CButton
                      style={{ width: '200px', marginTop: '10px', marginBottom: '30px' }}
                      onClick={() => {
                        postProduct(blockModal?.id, 5)
                        setSpinner(blockModal?.id)
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
                        'Reddet'
                      )}
                    </CButton>
                  </CTableDataCell>
                </div>
              ) : (
                <></>
              )}
              {cargoModal ? (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: 200,
                    alignSelf: 'center',
                    width: '70vw',
                    minHeight: 500,
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
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={closeImage}
                      alt="aktif"
                      onClick={() => {
                        openCargoModal(false)
                      }}
                      style={{ width: '50px', height: '50px', borderRadius: '20px' }}
                    />

                    <br />
                    <CFormInput
                      className="me-sm-2"
                      placeholder="Kargo Şirketi"
                      size="sm"
                      onChange={(e) => {
                        setCargoName(e.target.value)
                      }}
                    />
                    <br />
                    <CFormInput
                      className="me-sm-2"
                      placeholder="Teslimat Kodu"
                      size="sm"
                      onChange={(e) => {
                        setCargoNo(e.target.value)
                      }}
                    />
                  </div>

                  <CTableDataCell className="text-center">
                    <CButton
                      style={{ width: '200px', marginTop: '10px', marginBottom: '30px' }}
                      onClick={() => {
                        if (cargoName && cargoNo) {
                          openCargoModal(false)
                          postProduct(cargoModal)
                          setLoading(cargoModal)
                        }else{
                          addToast(exampleToast('Lütfen alanları boş bırakmayınız .'))
                        }
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
                        'Güncelle'
                      )}
                    </CButton>
                  </CTableDataCell>
                </div>
              ) : (
                <></>
              )}
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
