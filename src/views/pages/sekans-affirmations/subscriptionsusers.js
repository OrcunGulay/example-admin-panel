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
      post('/api/admins/get-subsusers').then((res) => {
        if (res.result) {
          setProducts(res.users)
          setWaiting(false)
          setLoading(null)
          setSpinner(null)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postProduct = (id) => {
    try {
      post('/api/admins/post-subsusers', { id }).then((res) => {
        if (res.result) {
          addToast(exampleToast('İşlem tamamlandı .'))
          getProducts()
        }
      })
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
                <CTableHeaderCell className="text-center">Kişi</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Abobelik Paketi</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Abonelik Tarihi</CTableHeaderCell>
                <CTableHeaderCell className="text-center">İptal</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {products?.map((item, index) => {
                return (
                  <CTableRow v-for="item in tableItems" key={index}>

                    <CTableDataCell className="text-center">
                      <div>{item?.user?.name +"  "+ item?.user?.surname}</div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>{item?.subscription?.name }</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>
                       {item?.createdAt}
                      </div>
                      <div>{item?.basket?.user?.phone}</div>
                    </CTableDataCell>
                 
                    <CTableDataCell className="text-center">
                      <CButton
                        color={'danger'}
                        onClick={() => {
                          postProduct(item?.id)
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
                          'İptal'
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
            <h2> Abone kişi bulunmamaktadır</h2>
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
