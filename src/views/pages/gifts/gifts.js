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
  CForm,
  CCol,
  CFormInput,
  CDropdownItem,
  CDropdown,
  CBadge,
  CDropdownToggle,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownMenu,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import styles from 'src/assets/styles/homeStyles.css'
import closeImage from "../../../assets/images/close.png";
import ClipLoader from "react-spinners/ClipLoader";
import image from "../../../assets/images/image.png"



const Gifts = () => {
  const [gifts, setGifts] = React.useState()
  const [gift, setGift] = React.useState()
  const [waiting, setWaiting] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [create, setCreate] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageObject, setImageObject] = React.useState(null);
  const [status, setStatus] = React.useState()
  const [name, setName] = React.useState()
  const [price, setPrice] = React.useState()
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
        <CToastBody>Hediye {info}.</CToastBody>
      </CToast>
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(URL.createObjectURL(file));
        setImageObject(file);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: 'Seçilen format desteklenmiyor!',
        });
        return;
      }
    }
  };

  const handleReload = () => {
    setWaiting(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000) // 2000 milisaniye (2 saniye) bekleyecek
  }

  React.useEffect(() => {
    getGifts()
  }, [])
  const getGifts = () => {
    try {
      post('/api/admin/gifts').then((res) => {
        if (res.result) {
          setGifts(res.gifts)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const updateGift = (name, price, status) => {
    try {
      post('/api/admin/gift-update', {
        giftId: gift.giftId,
        name,
        price,
        status,
      }).then(async (res) => {
        if (res.result) {

          addToast(exampleToast("Resim yükleniyor..."))

          const formData = new FormData();
          formData.append('image', imageObject);
          formData.append('fileName', `Gifts/${gift.giftId}`);

          const response = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
            method: 'POST',
            headers: {
              'x-access-token': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();

            if (data.type == "success") {
              getGifts()
              addToast(exampleToast("Eklendi"))
            } else {
              addToast(exampleToast(data.error))
            }
          } else {
            addToast(exampleToast("Bir sorun meydana geldi!"))
          }


          setLoading(false)
          setEdit(false)
          getGifts()
          addToast(exampleToast("Güncellendi"))

        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const addGift = (name, price, status) => {
    try {
      post('/api/admin/gift-add', {
        name,
        price,
        status,
      }).then(async (res) => {
        if (res.result) {
          addToast(exampleToast("Resim yükleniyor..."))

          const formData = new FormData();
          formData.append('image', imageObject);
          formData.append('fileName', `Gifts/${res.id}`);

          const response = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
            method: 'POST',
            headers: {
              'x-access-token': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();

            if (data.type == "success") {
              getGifts()
              addToast(exampleToast("Eklendi"))
            } else {
              addToast(exampleToast(data.error))
            }
          } else {
            addToast(exampleToast("Bir sorun meydana geldi!"))
          }

          setLoading(false)
          setCreate(false)
        }
      })
    } catch (e) {
      addToast(exampleToast("Bir sorun meydana geldi!"))
      setLoading(false)
      setCreate(false)
    }
  }
  const setBlock = (giftId) => {
    try {
      post('/api/admin/gift-delete', { giftId }).then((res) => {
        setLoading(false)
        setDeleteModal(false)
        getGifts()
        addToast(exampleToast("Silindi"))

      })
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
            setCreate(true)
          }}
          style={{ marginTop: 10, marginBottom: 20 }}
          color="success"
          className="px-4"
        >
          Hediye Oluştur
        </CButton>
      </CCol>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Görseli</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Adı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Fiyatı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Özel/Genel</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {gifts?.map((item, index) => {
            return (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item?.image} />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.name}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.price}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item?.status === 0 ? <div>Genel</div> : <div>Özel</div>}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton onClick={() => { setGift(item); setEdit(true) }}>Düzenle</CButton>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    disabled={waiting}
                    color="danger"
                    onClick={() => {
                      setGift(item)
                      setDeleteModal(true)
                    }}
                  >
                    Sil
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>


      {
        edit ?
          <div style={{
            position: "absolute",
            zIndex: 10,
            top: 200,
            alignSelf: "center",
            width: '80vw',
            height: 800,
            backgroundColor: "white",
            paddingRight: "50px",
            paddingTop: "50px",
            borderRadius: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }} >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end"
            }}>
              <img src={closeImage} alt="aktif" onClick={() => {
                setEdit(false)
              }} style={{ width: '50px', height: '50px', borderRadius: '20px' }} />
            </div>
            <div style={{
              alignSelf: "center",
              width: '80%',
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }} >
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <img src={selectedImage ? selectedImage : gift?.image} alt="image" style={{ width: '300px', height: '300px' }} />
                <CTableDataCell className="text-center">
                  <CFormInput
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </CTableDataCell>
              </div>

              <CForm style={{ width: "50%" }}>
                Hediye adı
                <CFormInput
                  className="me-sm-2"
                  placeholder={gift?.name}
                  size="sm"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                Fiyatı
                <CFormInput
                  className="me-sm-2"
                  placeholder={gift?.price}
                  size="sm"
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                />
                Özel/Genel
                <CDropdown variant="nav-item">
                  <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                    <CFormInput
                      className="me-sm-2"
                      placeholder={
                        status === 0
                          ? 'Genel'
                          : status === 1
                            ? 'Özel'
                            : gift?.status === 0
                              ? 'Genel'
                              : 'Özel'
                      }
                      size="sm"
                    />
                  </CDropdownToggle>
                  <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownHeader className="bg-light fw-semibold py-2">Özel/Genel</CDropdownHeader>

                    <CDropdownItem onClick={() => setStatus(0)}>
                      Genel
                      <CBadge color="info" className="ms-2">
                        0
                      </CBadge>
                    </CDropdownItem>
                    <CDropdownItem onClick={() => setStatus(1)}>
                      Özel
                      <CBadge color="info" className="ms-2">
                        1
                      </CBadge>
                    </CDropdownItem>

                    <CDropdownDivider />
                  </CDropdownMenu>
                </CDropdown>
              </CForm>

            </div>
            {/* onClick={() => {
                  updateGift(
                    giftId,
                    name ? name : gift.name,
                    price ? price : gift.price,
                    status === 0 ? 0 : status === 1 ? 1 : gift.status,
                  )
                  getGift(giftId)
                }} */}

            <CTableDataCell className="text-center">
              <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                updateGift(
                  name ? name : gift.name,
                  price ? price : gift.price,
                  status === 0 ? 0 : status === 1 ? 1 : gift.status,
                )
                setLoading(true)
              }}>
                {loading == true ?

                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  :
                  "Güncelle"
                }
              </CButton>
            </CTableDataCell>
          </div>
          :
          <></>
      }

      {
        create ?
          <div style={{
            position: "absolute",
            zIndex: 10,
            top: 200,
            alignSelf: "center",
            width: '80vw',
            height: 800,
            backgroundColor: "white",
            paddingRight: "50px",
            paddingTop: "50px",
            borderRadius: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }} >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end"
            }}>
              <img src={closeImage} alt="aktif" onClick={() => {
                setCreate(false)
              }} style={{ width: '50px', height: '50px', borderRadius: '20px' }} />
            </div>
            <div style={{
              alignSelf: "center",
              width: '80%',
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }} >
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <img src={selectedImage ? selectedImage : image} alt="image" style={{ width: '300px', height: '300px' }} />
                <CTableDataCell className="text-center">
                  {/* <CButton onClick={() => { }}>Ekle</CButton> */}
                  <CFormInput
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />

                </CTableDataCell>
              </div>

              <CForm style={{ width: "50%" }}>
                Hediye adı
                <CFormInput
                  className="me-sm-2"
                  size="sm"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                Fiyatı
                <CFormInput
                  className="me-sm-2"
                  size="sm"
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                />
                Özel/Genel
                <CDropdown variant="nav-item">
                  <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                    <CFormInput
                      className="me-sm-2"
                      placeholder={
                        status === 0
                          ? 'Genel'
                          : status === 1
                            ? 'Özel'
                            : gift?.status === 0
                              ? 'Genel'
                              : 'Özel'
                      }
                      size="sm"
                    />
                  </CDropdownToggle>
                  <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownHeader className="bg-light fw-semibold py-2">Özel/Genel</CDropdownHeader>

                    <CDropdownItem onClick={() => setStatus(0)}>
                      Genel
                      <CBadge color="info" className="ms-2">
                        0
                      </CBadge>
                    </CDropdownItem>
                    <CDropdownItem onClick={() => setStatus(1)}>
                      Özel
                      <CBadge color="info" className="ms-2">
                        1
                      </CBadge>
                    </CDropdownItem>

                    <CDropdownDivider />
                  </CDropdownMenu>
                </CDropdown>
              </CForm>

            </div>
            <CTableDataCell className="text-center">
              <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                addGift(name, price, status)
                setLoading(true)
              }}>
                {loading == true ?

                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  :
                  "Ekle"
                }
              </CButton>
            </CTableDataCell>
          </div>
          :
          <></>
      }

      {
        deleteModal ?
          <div style={{
            position: "absolute",
            zIndex: 10,
            top: 200,
            alignSelf: "center",
            width: '80vw',
            height: 800,
            backgroundColor: "white",
            paddingRight: "50px",
            paddingTop: "50px",
            borderRadius: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }} >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end"
            }}>
              <img src={closeImage} alt="aktif" onClick={() => {
                setDeleteModal(false)
              }} style={{ width: '50px', height: '50px', borderRadius: '20px' }} />
            </div>
            <div style={{
              alignSelf: "center",
              width: '80%',
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }} >
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <img src={gift?.image} alt="image" style={{ width: '300px', height: '300px' }} />
                <CTableDataCell className="text-center">
                  <CButton onClick={() => { }}>Düzenle</CButton>
                </CTableDataCell>
              </div>

              <CForm style={{ width: "50%" }}>
                Hediye adı
                <CFormInput
                  className="me-sm-2"
                  placeholder={gift?.name}
                  size="sm"
                  disabled
                />
                Fiyatı
                <CFormInput
                  className="me-sm-2"
                  placeholder={gift?.price}
                  size="sm"
                  disabled
                />
                Özel/Genel
                <CDropdown variant="nav-item">
                  <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                    <CFormInput
                      className="me-sm-2"
                      placeholder={
                        gift?.status === 0
                          ? 'Genel'
                          : 'Özel'
                      }
                      size="sm"
                    />
                  </CDropdownToggle>
                </CDropdown>
              </CForm>

            </div>
            {/* onClick={() => {
                updateGift(
                  giftId,
                  name ? name : gift.name,
                  price ? price : gift.price,
                  status === 0 ? 0 : status === 1 ? 1 : gift.status,
                )
                getGift(giftId)
              }} */}

            <CTableDataCell className="text-center">
              <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                setBlock(gift?.giftId)
                setLoading(true)
              }}>
                {loading == true ?

                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  :
                  "Sil"
                }
              </CButton>
            </CTableDataCell>
          </div>
          :
          <></>
      }
    </>
  )
}

export default Gifts
