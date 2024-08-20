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
import { useParams } from 'react-router-dom'

Quill.register('modules/emoji', Emoji)

const Sekans = () => {
  const adm = localStorage.getItem('user')
  const admin = JSON.parse(adm)
  const [products, setProducts] = React.useState()
  const [waiting, setWaiting] = React.useState(true)
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
  React.useEffect(() => {
    getProducts()
  }, [])
  const getProducts = () => {
    try {
      post('/api/admins/get-allproducts', { id: admin?.dealerId }).then((res) => {
        if (res.result) {
          setProducts(res.allproducts)
          setWaiting(false)
          setLoading(null)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postProduct = (id, productId, statu) => {
    try {
      post('/api/admins/post-myproducts', { id, productId, statu, dealerId: admin?.dealerId }).then(
        (res) => {
          if (res.result) {
            addToast(exampleToast('Ürün eklendi .'))
            getProducts()
          }
        },
      )
    } catch (e) {
      console.log('hata')
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      {waiting == false ? (
        products?.length > 0 ? (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Ürün Görseli</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ürün Kodu</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ürün Adı</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Fiyat</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Renkler</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Bedenler</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Açıklaması</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ürünü Ekle</CTableHeaderCell>
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
                      <div>{item?.productNo}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.name}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.price}</div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>
                        {JSON.parse(item?.colors).map((color) => {
                          const colorNumber = parseInt(color, 10)
                          return colorNumber === 0
                            ? 'Beyaz,'
                            : colorNumber === 1
                            ? 'Siyah,'
                            : colorNumber === 2
                            ? 'Mor,'
                            : colorNumber === 3
                            ? 'Sarı,'
                            : colorNumber === 4
                            ? 'Kırmızı,'
                            : colorNumber === 5
                            ? 'Mavi,'
                            : colorNumber === 6
                            ? 'Yeşil,'
                            : null
                        })}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>
                        {JSON.parse(item?.size).map((color) => {
                          const sizeNumber = parseInt(color, 10)
                          return sizeNumber === 0
                            ? 'XS,'
                            : sizeNumber === 1
                            ? 'S,'
                            : sizeNumber === 2
                            ? 'M,'
                            : sizeNumber === 3
                            ? 'L,'
                            : sizeNumber === 4
                            ? 'XL,'
                            : sizeNumber === 5
                            ? 'XXL,'
                            : sizeNumber === 6
                            ? 'XXXL,'
                            : null
                        })}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell style={{ maxWidth: 250 }} className="text-center">
                      <div>{item?.desc}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="success"
                        onClick={() => {
                          postProduct(item?.id, item?.productId, 1)
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
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <h2>Ürününüz bulunmamaktadır</h2>
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
