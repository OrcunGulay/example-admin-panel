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
import closeImage from '../../../assets/images/close.png'

const DealerForms = () => {
  const [dealers, setDealers] = React.useState([])
  const [meeCat, setMCat] = React.useState([])
  const [subs, setSubs] = React.useState([])
  const [waiting, setWaiting] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [spinner, setSpinner] = React.useState(false)
  const [listType, setListType] = React.useState(true)
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
    getDealers(1)
  }, [])
  const getDealers = (statu) => {
    try {
      post('/api/admins/get-dealer-forms', { statu }).then((res) => {
        if (res.result) {
          setDealers(res.dealers)
          setMCat(res.meetingCategories)
          setSubs(res.subscCategories)
          setWaiting(false)
          setSpinner(null)
        } else {
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const postForm = (id, statu) => {
    try {
      post('/api/admins/post-dealer-forms', { id, statu }).then((res) => {
        if (res.result) {
          if (statu == 2) {
            addToast(exampleToast('İşlem tamamlandı. Bayii Eklendi'))
            getDealers(1)
          } else {
            addToast(exampleToast('İşlem tamamlandı. Başvuru silindi'))
            getDealers(1)
          }
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const postBack = (id) => {
    try {
      post('/api/admins/updated-dealer-forms', { id }).then((res) => {
        if (res.result) {
          addToast(exampleToast('İşlem Tamamlandı. Başvuru geri alındı'))
          getDealers(2)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  if (listType == true) {
    return (
      <>
        <CToaster ref={toaster} push={toast} placement="top-end" />
        <CCol xs={6}>
          <CButton
            onClick={() => {
              setWaiting(true)
              setListType(false)
              getDealers(2)
            }}
            style={{ marginTop: 10, marginBottom: 20 }}
            color="danger"
            className="px-4"
          >
            Reddedilenler
          </CButton>
        </CCol>
        Bekleyen başvurular aşağıda listelenmektedir. Reddedilen başvurular için yukarıdaki butona
        tıklayınız.
        {waiting == false ? (
          dealers?.length > 0 ? (
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Başvuru Tarihi</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Başvuran</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Mail/Telefon</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Bayii Adı</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Açıklama</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Hizmet Kategorisi</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Hizmet Alanları</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Seans Ücreti</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Uzmanlık Alanı</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Şehir</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Açık Adres</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Reddet</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dealers?.map((item, index) => {
                  return (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item?.createdAt}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.adminName}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.adminMail}</div>
                        <div>{item?.adminPhone}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.name}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.description}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{meeCat?.find((_item) => _item.id === item?.meetingId)?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>
                          {subs
                            ?.filter((subItem) => item?.meetingSubsIds.includes(subItem.id))
                            .map((matchedItem, index, array) => (
                              <React.Fragment key={matchedItem.id}>
                                {matchedItem.name + ','}
                                {index !== array.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                        </div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.price ?? '--'}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.department ?? '--'}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.city}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.openAddress}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <CButton
                          style={{ marginBottom: 5 }}
                          color={'success'}
                          onClick={() => {
                            setSpinner(item?.id)
                            postForm(item?.id, 2)
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
                            'Onayla'
                          )}
                        </CButton>
                        <CButton
                          color={'danger'}
                          onClick={() => {
                            setSpinner(item?.id)
                            postForm(item?.id, 0)
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
              </CTableBody>
            </CTable>
          ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <h2>Başvuru bulunmamaktadır</h2>
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
  } else {
    return (
      <>
        <CToaster ref={toaster} push={toast} placement="top-end" />
        <CCol xs={6}>
          <CButton
            onClick={() => {
              setWaiting(true)
              setListType(true)
              getDealers(1)
            }}
            style={{ marginTop: 10, marginBottom: 20 }}
            color="success"
            className="px-4"
          >
            Bekleyen Başvurular
          </CButton>
        </CCol>
        Reddedilen başvurular aşağıda listelenmektedir. Bekleyen başvurular için yukarıdaki butona
        tıklayınız.
        {waiting == false ? (
          dealers?.length > 0 ? (
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Başvuru Tarihi</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Başvuran</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Mail/Telefon</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Bayii Adı</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Açıklama</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Hizmet Kategorisi</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Hizmet Alanları</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Seans Ücreti</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Uzmanlık Alanı</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Şehir</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Açık Adres</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Başvuru Durumu</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dealers?.map((item, index) => {
                  return (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item?.createdAt}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.adminName}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.adminMail}</div>
                        <div>{item?.adminPhone}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.name}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.description}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{meeCat?.find((_item) => _item.id === item?.meetingId)?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>
                          {subs
                            ?.filter((subItem) => item?.meetingSubsIds.includes(subItem.id))
                            .map((matchedItem, index, array) => (
                              <React.Fragment key={matchedItem.id}>
                                {matchedItem.name + ','}
                                {index !== array.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                        </div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item?.price ?? '--'}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.department ?? '--'}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.city}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.openAddress}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <CButton
                          style={{ marginBottom: 5 }}
                          color={'info'}
                          onClick={() => {
                            setSpinner(item?.id)
                            postBack(item?.id)
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
                            'Geri al'
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
              <h2>Reddedilen başvuru bulunmamaktadır</h2>
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
}
export default DealerForms
