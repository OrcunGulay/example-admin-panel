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
import closeImage from "../../../assets/images/close.png";
import ClipLoader from "react-spinners/ClipLoader";
<script src="src\components\script.html"></script>


const Users = () => {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState()
  const [message, setMessage] = React.useState("")
  const [waiting, setWaiting] = React.useState(false)
  const [user, setUser] = React.useState()
  const [detail, setDetail] = React.useState()
  const [supportId, setSupportId] = React.useState()
  const [modal, setModal] = React.useState(false)
  const [select, setSelect] = React.useState(0)
  const [isSend, setSend] = React.useState(false)
  const handleReload = () => {
    setWaiting(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000) // 2000 milisaniye (2 saniye) bekleyecek
  }
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
    );
  };



  function copyText(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    addToast(exampleToast("Iban Kopyalandı."))
  }

  React.useEffect(() => {
    getUsers()
    setSelect(0)
  }, [])
  const getUsers = () => {
    try {
      post('/api/admins/users').then((res) => {
        if (res.result) {
          setUsers(res.users)
        }
        else {

          addToast(exampleToast("Bir şeyler Ters Gitti."))
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const getSupports = () => {
    try {
      post('/api/admins/supports').then((res) => {
        if (res.result) {
          setUsers(res.users)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const setSupport = (supportId, message, user) => {
    try {
      post('/api/admins/post-support', { supportId, message, support: user }).then((res) => {
        if (res.result) {
          setLoading(false);
          setModal(false);
          getSupports()
        }
        else {
          addToast(exampleToast("Bir şeyler Ters Gitti."))
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postSend = (userId) => {
    try {
      post('/api/admin/gifts-payment', { userId }).then((res) => {
        if (res.result) {
          addToast(exampleToast(res.info))
          getPaymentUser()
        }
        else {
          addToast(exampleToast("Bir şeyler Ters Gitti."))
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const setBlock = (userId, status) => {
    try {
      post('/api/admin/user-delete', { userId, status }).then((res) => { })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCol xs={6}>
        {select == 0 ?
          <CButton
            style={{ marginTop: 10, marginBottom: 20 }}
            color={select == 1 ? "success" : "danger"}
            className="px-4"
            onClick={() => { getSupports(); setSelect(1) }}
          >
            Destek Bekleyenler
          </CButton>
          :
          <CButton
            style={{ marginTop: 10, marginBottom: 20 }}
            color={select == 0 ? "success" : "danger"}
            className="px-4"
            onClick={() => { getUsers(); setSelect(0) }}
          >
            Tüm Kullanıcılar
          </CButton>
        }


      </CCol>
      {select == 0 ?
        <>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Kullanıcı</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Şehri</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Düzenle</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Engelle</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users?.map((item, index) => {
                console.log(users)
                return (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <img src={item?.image} alt="Profil fotografı" style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.name} {item?.surname}</div>
                      <div className="small text-medium-emphasis">| Kayıt Tarihi: {item?.createdAt}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.cityName}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton href={`#/user/edit/${item.userId}`}>Düzenle</CButton>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        disabled={waiting}
                        color="danger"
                        onClick={() => {
                          setBlock(item?.userId, !item.status)
                          handleReload()
                        }}
                      >
                        {item?.status === 1 ? 'Engelle' : ' Engeli kaldır'}
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </>
        :
        <>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Kullanıcı</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Destek Kategorisi</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Destek Mesajı</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Destek Ver</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users?.map((item, index) => {
                return (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <img src={item?.user?.image} alt="Profil fotografı" style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.user?.name} {item?.user?.surname}</div>
                      <div className="small text-medium-emphasis">| Destek Tarihi: {item?.createdAt}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item?.support?.title}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>
                        {item?.supportId == 1 ?
                          "Sipariş Numarası :"
                          :
                          item?.supportId == 2 ?
                            "Ürün Numarası :"
                            :
                            item?.supportId == 3 ?
                              "Randevu Bilgisi :"
                              :
                              item?.supportId == 4 ?
                                "Uygulama Güncel mi ?"
                                :
                                "Diğer :"
                        }
                        ({item?.title})
                      </div>
                      <div>
                        Açıklama :    {item?.detail}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        onClick={() => {
                          setModal(true)
                          setUser(item)
                          setSupportId(item?.id)
                          setDetail(item?.detail)
                        }}
                        color="primary"
                        className="px-4"
                      >
                        Mesaj gönder
                      </CButton>
                    </CTableDataCell>

                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </>
      }
      {
        modal ?
          <div style={{
            position: "absolute",
            zIndex: 10,
            top: 200,
            alignSelf: "center",
            minWidth: 400,
            minHeight: 400,
            backgroundColor: "white",
            borderRadius: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 30
          }} >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end"
            }}>
              <img src={closeImage} alt="aktif" onClick={() => {
                setModal(false)
              }} style={{ width: '50px', height: '50px', borderRadius: '20px' }} />
            </div>
            <div style={{
              alignSelf: "center",
              width: '100%',
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }} >
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <img src={user?.user?.image} alt="image" style={{ width: '100px', height: '100px' }} />
              </div>

              <div>
                <div>
                  {user?.user?.name} {user?.user?.surname}
                </div>
                <div>
                  Kategori : {user?.support?.title}
                </div>
                <div>
                  {user?.supportId == 1 ?
                    "Sipariş Numarası :"
                    :
                    user?.supportId == 2 ?
                      "Ürün Numarası :"
                      :
                      user?.supportId == 3 ?
                        "Randevu Bilgisi :"
                        :
                        user?.supportId == 4 ?
                          "Uygulama Güncel mi ?"
                          :
                          "Diğer :"
                  }
                  ({user?.title})
                </div>
                <div>
                  Açıklama :    {user?.detail}
                </div>
              </div>
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              </div>
            </div>

            <div style={{ width: "100%", marginTop: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <CFormInput
                placeholder={"Destek Mesajınız Bildirim olarak gidecektir."}
                style={{
                  width: "65%",
                  minHeight: 100,
                  boxSizing: "border-box",
                  resize: "none", // Kullanıcının yeniden boyutlandırmasını engellemek için
                  display: "flex",
                  textAlign: "start"
                }}
                onChange={(e) => {
                  setMessage(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                rows={1}
              />

              <CTableDataCell className="text-center">
                <CButton style={{ marginTop: 20 }} onClick={() => {
                  setSupport(supportId, message, user)
                  setLoading(true)
                }}>
                  {loading == true ?

                    <ClipLoader
                      color={"white"}
                      loading={loading}
                      cssOverride={{ marginRight: "20px", marginLeft: "20px" }}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    :
                    "Gönder"
                  }
                </CButton>
              </CTableDataCell>
            </div>
          </div>
          :
          <></>
      }
    </>
  )
}
export default Users

