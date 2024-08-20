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
  CFormSelect,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import ClipLoader from 'react-spinners/ClipLoader'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import Quill from 'quill'
import Emoji from 'quill-emoji'
import { useParams } from 'react-router-dom'

Quill.register('modules/emoji', Emoji)

const Sekans = () => {
  const { id } = useParams()
  const [products, setProducts] = React.useState()
  const [advice, setAdvice] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [toast, addToast] = React.useState(0)
  const [added, setAdded] = React.useState([])
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
  //   let added = advice?.products ? JSON.parse(advice?.products) : []
  React.useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    try {
      post('/api/admins/get-products-advices', { id }).then((res) => {
        if (res.result) {
          setProducts(res.products)
          setAdvice(res.advice)
          setAdded(JSON.parse(res.advice?.products))
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postProduct = (productId, statu) => {
    try {
      post('/api/admins/post-products-advices', { productId, statu, id }).then((res) => {
        if (res.result) {
          addToast(exampleToast(statu == 0 ? 'Ürün Kaldırıldı .' : 'Ürün Eklendi .'))
          getProducts()
          setLoading(null)

        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <h2> {advice?.title}</h2>
      </div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Ürün Görseli</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ürün Adı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Tavsiyeye Ekle</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products?.map((item, index) => {
            return (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <img
                    src={item?.images ? JSON.parse(item?.images)[0] : []}
                    alt="ikon"
                    style={{ width: '50px', height: '50px' }}
                  />
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div>{item?.name}</div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  {added?.includes(item?.productId) ? (
                    <CButton
                      //   disabled={loading}
                      color="danger"
                      onClick={() => {
                        postProduct(item?.productId, 0)
                        setLoading(item?.productId)
                      }}
                    >
                      {loading == item?.productId ? (
                        <ClipLoader
                          color={'white'}
                          loading={loading}
                          size={20}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        'Kaldır'
                      )}
                    </CButton>
                  ) : (
                    <CButton
                      //   disabled={loading}
                      color="success"
                      onClick={() => {
                        postProduct(item?.productId, 1)
                        setLoading(item?.productId)
                      }}
                    >
                      {loading == item?.productId ? (
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
                  )}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Sekans
