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
  const [openModel, setOpenModal] = React.useState(false)

  React.useEffect(() => {
    getProducts()
  }, [])
  const getProducts = () => {
    try {
      post('/api/admins/get-myorders', { id: admin?.dealerId, statu: 1 }).then((res) => {
        if (res.result) {
          setProducts(res.products)
          setWaiting(false)
          setLoading(null)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
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
                <CTableHeaderCell className="text-center">Durum</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Tarih</CTableHeaderCell>
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
                      </div>{' '}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div
                        style={{
                          color: item?.status == 0 ? 'red' : item?.status == 5 ? 'Orange' : 'red',
                        }}
                      >
                        {item?.status == 0 ? 'İptal' : item?.status == 5 ? 'İade' : 'Belirsiz'}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.updatedAt}</div>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <h2>Bu durumda siparişiniz bulunmamaktadır</h2>
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
