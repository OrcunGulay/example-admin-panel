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
  CCol,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import styles from 'src/assets/styles/homeStyles.css'
import closeImage from '../../../assets/images/close.png'
import ClipLoader from 'react-spinners/ClipLoader'
import image from '../../../assets/images/image.png'

const Sekans = () => {
  const [products, setProducts] = React.useState()
  const [product, setProduct] = React.useState()
  const [waiting, setWaiting] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [create, setCreate] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [spinner, setSpinner] = React.useState(false)
  const [quest, setQuest] = React.useState()
  const [answer1, setAnswer1] = React.useState()
  const [answer2, setAnswer2] = React.useState()

  const handleReload = () => {
    setWaiting(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000) // 2000 milisaniye (2 saniye) bekleyecek
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    try {
      post('/api/admins/get-products').then((res) => {
        if (res.result) {
          setProducts(res.products)
          setSpinner(false)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const setBlock = (productId) => {
    try {
      post('/api/admins/delete-product', { productId }).then((res) => {
        setLoading(false)
        setDeleteModal(false)
        getProducts()
      })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
      <CCol xs={6}>
        <CButton
          onClick={() => {
            window.location.href = `#/products/create`
          }}
          style={{ marginTop: 10, marginBottom: 20 }}
          color="success"
          className="px-4"
        >
          Ürün Oluştur
        </CButton>
      </CCol>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Ürün</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ürün Kodu</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kategori</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Adı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Fiyatı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kampanya</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products?.map((item, index) => {
            let prdimage = item?.images ? JSON.parse(item?.images)[0] : image
            return (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <img src={prdimage} alt="ikon" style={{ width: '50px', height: '50px' }} />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.productNo}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.Productcategory?.name}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.name}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.price}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.discount}%</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    onClick={() => {
                      window.location.href = `#/products/edit/${item.productId}`
                    }}
                  >
                    Düzenle
                  </CButton>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    // disabled={waiting}
                    color="danger"
                    onClick={() => {
                      setSpinner(item.productId)
                      setBlock(item.productId)
                      setDeleteModal(true)
                    }}
                  >
                    {spinner == item?.productId ? (
                      <ClipLoader
                        color={'white'}
                        loading={spinner}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      'Sil'
                    )}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>

      {create ? (
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
                setCreate(false)
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
          ></div>
          <CForm style={{ width: '50%' }}>
            Soru
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows={3}
              onChange={(e) => {
                setQuest(e.target.value)
              }}
            ></CFormTextarea>
            Cevap-1
            <CFormInput
              className="me-sm-2"
              size="sm"
              onChange={(e) => {
                setAnswer1(e.target.value)
              }}
            />
            Cevap-2
            <CFormInput
              className="me-sm-2"
              size="sm"
              onChange={(e) => {
                setAnswer2(e.target.value)
              }}
            />
          </CForm>

          <CTableDataCell className="text-center">
            <CButton
              style={{ width: '200px', marginTop: '100px', marginBottom: '30px' }}
              onClick={() => {
                addQuestion(quest, answer1, answer2)
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

      {deleteModal ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 200,
            alignSelf: 'center',
            width: '80vw',
            minHeight: 300,
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
                setDeleteModal(false)
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
          ></div>

          <CForm style={{ width: '50%' }}>
            Silmek İstediğinize Emin misiniz?
            <CFormInput
              className="me-sm-2"
              disabled={true}
              defaultValue={product?.name}
              size="sm"
            />
          </CForm>

          <CTableDataCell className="text-center">
            <CButton
              style={{ width: '200px', marginTop: '60px', marginBottom: '30px' }}
              onClick={() => {
                setBlock(product.productId)
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
                'Sil'
              )}
            </CButton>
          </CTableDataCell>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Sekans
