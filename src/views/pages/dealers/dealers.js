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
import CIcon from '@coreui/icons-react'
import { post } from 'src/networking/Server'
import { cilPeople } from '@coreui/icons'
import closeImage from '../../../assets/images/close.png'
import ClipLoader from 'react-spinners/ClipLoader'
import { useParams } from 'react-router-dom'
;<script src="src\components\script.html"></script>

const Users = () => {
  const { categoriId } = useParams()
  const [dealers, setDealers] = React.useState([])
  const [toast, addToast] = React.useState(0)
  const [select, setSelect] = React.useState()
  const [allAppoint, setAllAppoint] = React.useState()
  const [activeAppoint, setActiveAppoint] = React.useState()
  const [allOrders, setAllOrders] = React.useState()
  const [completedOrders, setCompletedOrders] = React.useState()
  const [loading, setLoading] = React.useState(false)
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
    getDealers()
  }, [])
  const getDealers = () => {
    try {
      post('/api/admins/dealers', { id: categoriId }).then((res) => {
        if (res.result) {
          setDealers(res.dealers)
        } else {
          addToast(exampleToast('Bir şeyler Ters Gitti.'))
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const getDealerInfo = (id) => {
    try {
      post('/api/admins/dealer-info', { id }).then((res) => {
        if (res.result) {
          setAllAppoint(res.allAppoint)
          setActiveAppoint(res.activeAppoint)
          setCompletedOrders(res.completedOrders)
          setAllOrders(res.allOrders)
          setLoading(false)
        } else {
          addToast(exampleToast('Bir şeyler Ters Gitti.'))
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
            onClick={() => {
              setLoading(true)
              getDealerInfo(item?.id)
              setSelect(item?.id)
            }}
          >
            <h3 style={{}}>{item?.name}</h3>
            <p>
              ({item?.city})
              <br />
              {item?.description}
            </p>
            <img
              src={item?.image ? JSON.parse(item?.image)[0] : ''}
              alt="Profil fotografı"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
            {select == item.id ? (
              loading == true ? (
                <CTable style={{marginTop:10}} className='text-center'>
                    <ClipLoader
                  color={'black'}
                  loading={loading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                </CTable>
              ) : (
                <>
                {' '}
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        Toplam Randevu Sayısı
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Aktif Randevu Sayısı
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Toplam Sipariş Sayısı
                      </CTableHeaderCell>
                      <CTableHeaderCell className="text-center">
                        Teslim Edilen Sipariş Sayısı
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">{allAppoint}</CTableDataCell>

                      <CTableDataCell className="text-center">{activeAppoint}</CTableDataCell>
                      <CTableDataCell className="text-center">{allOrders}</CTableDataCell>
                      <CTableDataCell className="text-center">{completedOrders}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </>
              )
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
export default Users
