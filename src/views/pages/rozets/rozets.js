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
  CFormInput,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import Layout from '../../forms/layout/Layout'
import closeImage from "../../../assets/images/close.png";
import image from "../../../assets/images/image.png"
import ClipLoader from "react-spinners/ClipLoader";

const Gifts = () => {
  const [rozets, setRozets] = React.useState()
  const [levels, setLevels] = React.useState()
  const [waiting, setWaiting] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [buttonNumber, setButtonNumber] = React.useState()
  const [agree, setAgree] = React.useState([])
  const [rozetNumber, setRozetNumber] = React.useState()
  const [pImage, setPImage] = React.useState()
  const [aImage, setAImage] = React.useState()
  const [selectedAImage, setSelectedAImage] = React.useState(null);
  const [imageAObject, setImageAObject] = React.useState(null);
  const [selectedPImage, setSelectedPImage] = React.useState(null);
  const [imagePObject, setImagePObject] = React.useState(null);
  const [edit, setEdit] = React.useState(false)
  const [create, setCreate] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [rozet, setRozet] = React.useState()
  const [isTouch, setTouch] = React.useState(true)
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
        <CToastBody>Paket {info}.</CToastBody>
      </CToast>
    );
  };

  //-----FOR UPLOAD IMAGE---
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        if (buttonNumber == 1) {
          setSelectedAImage(URL.createObjectURL(file));
          setImageAObject(file);
        } else if (buttonNumber == 2) {
          setSelectedPImage(URL.createObjectURL(file));
          setImagePObject(file);
        }
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
  console.log(agree)
  React.useEffect(() => {
    getRozets()
  }, [])
  const getRozets = () => {
    try {
      post('/api/admin/rozets').then((res) => {
        if (res.result) {
          setRozets(res.rozets)
          setLevels(res.levels)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const postRozets = () => {
    try {
      post('/api/admin/rozet-update', { agree, rozetId: rozet.rozetId, rozetNumber }).then(async (res) => {
        if (res.result) {
          addToast(exampleToast("Resim yükleniyor..."))

          const formData = new FormData();
          formData.append('image', imageAObject);
          formData.append('fileName', `Rozets/${rozet.rozetId}_a`);
          const formData2 = new FormData();
          formData2.append('image', imagePObject);
          formData2.append('fileName', `Rozets/${rozet.rozetId}_p`);

          const response = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
            method: 'POST',
            headers: {
              'x-access-token': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
          });

          const response2 = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
            method: 'POST',
            headers: {
              'x-access-token': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData2,
          });

          if (response.ok && response2.ok) {
            const data = await response.json();
            const data2 = await response2.json();

            if (data.type == "success" && data2.type == "success") {
              getRozets()
              addToast(exampleToast("Eklendi"))
            } else {
              addToast(exampleToast(data.error))
            }
          } else {
            addToast(exampleToast("Bir sorun meydana geldi!"))
          }
          setLoading(false)
          setEdit(false)
          getRozets()
          setAgree([])
          setRozetNumber()
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const postCreate = () => {
    try {
      post('/api/admin/rozet-create', { agree, rozetNumber }).then(async (res) => {
        if (res.result) {

          addToast(exampleToast("Resim yükleniyor..."))

          const formData = new FormData();
          formData.append('image', imageAObject);
          formData.append('fileName', `Rozets/${res.id}_a`);
          const formData2 = new FormData();
          formData2.append('image', imagePObject);
          formData2.append('fileName', `Rozets/${res.id}_p`);

          const response = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
            method: 'POST',
            headers: {
              'x-access-token': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
          });
          const response2 = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
            method: 'POST',
            headers: {
              'x-access-token': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData2,
          });

          if (response.ok && response2.ok) {
            const data = await response.json();
            const data2 = await response2.json();

            if (data.type == "success" && data2.type == "success") {
              getRozets()
              addToast(exampleToast("Eklendi"))
            } else {
              addToast(exampleToast(data.error))
            }
          } else {
            addToast(exampleToast("Bir sorun meydana geldi!"))
          }
          setLoading(false)
          setCreate(false)
          getRozets()
          setAgree([])
          setRozetNumber()
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const setDelete = (rozet) => {
    try {
      post('/api/admin/rozet-delete', { rozet }).then((res) => { })
    } catch (e) {
      console.log('hata')
    }
  }

  const agress = (params) => {
    if (agree.includes(params)) {
      let b = agree;
      let yer = agree.indexOf(params);
      b.splice(yer, 1);
      setAgree(b);
    } else if (agree.length < 10) {
      let a = agree;
      a.push(params);
      setAgree(a);
    } else {
      console.log("max 10 ");
    }
    return agree;
  };

  return (
    <>
      <CCol xs={6}>
        <CButton
          onClick={() => { setCreate(true) }}
          style={{ marginTop: 10, marginBottom: 20 }}
          color="success"
          className="px-4"
        >
          Rozet Oluştur
        </CButton>
      </CCol>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Aktif Görsel</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Pasif Görsel</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Rozet Numarası</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Sahip Olduğu Seviyeler</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {rozets?.map((item, index) => {
            return (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <img src={item?.activeImage} alt="aktif" style={{ width: '100px', height: '100px', borderRadius: '20px' }} />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <img src={item?.passiveImage} alt="pasif" style={{ width: '100px', height: '100px', borderRadius: '20px' }} />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.rozetNumber}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item?.levelNumbers}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton onClick={() => { setRozet(item); setEdit(true) }}>Düzenle</CButton>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    disabled={waiting}
                    color="danger"
                    onClick={() => {
                      setRozet(item)
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
              width: '70%',
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: '200px',
              paddingRight: '200px',
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }} >
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <img src={selectedAImage ? selectedAImage : rozet?.activeImage} alt="image" style={{ width: '300px', height: '300px' }} />
                <CTableDataCell className="text-center">
                  <CFormInput
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    onClick={() => { setButtonNumber(1) }}
                  />
                </CTableDataCell>
              </div>
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <img src={selectedPImage ? selectedPImage : rozet?.passiveImage} alt="image" style={{ width: '300px', height: '300px' }} />
                <CTableDataCell className="text-center">
                  <CFormInput
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    onClick={() => { setButtonNumber(2) }}
                  />
                </CTableDataCell>
              </div>
            </div>

            <CFormInput
              placeholder={"(" + rozet?.rozetNumber + ")" + "Rozet Numarası"}
              style={{ width: "50%", marginTop: "10px" }}
              onChange={(e) => {
                setRozetNumber(e.target.value)
              }}
            />
            <span style={{ marginTop: "50px" }}>
              Bağlı olan seviyeler
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
              {levels.map((item, index) => {
                let numberArray = rozet?.levelNumbers ? rozet?.levelNumbers?.split(",") : ""
                let isHas = numberArray.includes(String(item?.levelId))
                return (
                  <div key={index}
                    onClick={() => {
                      agress(item.levelId);
                      setTouch(!isTouch);

                    }}
                    class="hover-element"
                    style={{
                      width: "18%",
                      height: "30px",
                      margin: "8px",
                      backgroundColor: agree.includes(item.levelId) == true
                        ? "rgb(0, 255, 255)"
                        : isHas == true ? "rgb(0, 255, 120)" : "rgb(180, 180, 180)",
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: isHas == true ? "green" : "gray",
                      borderRadius: "5px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}>
                    <span>{item.levelNumber}</span>
                  </div>
                )
              })}
            </div>

            <CTableDataCell className="text-center">
              <CButton onClick={() => { postRozets(); setLoading(true) }}>
                {loading == true ?

                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    cssOverride={{ marginRight: "20px", marginLeft: "20px" }}
                    // cssOverride={override}
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
              width: '70%',
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: '200px',
              paddingRight: '200px',
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }} >
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <img src={selectedAImage ? selectedAImage : image} alt="image" style={{ width: '300px', height: '300px' }} />
                <CTableDataCell className="text-center">
                  <CFormInput
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    onClick={() => { setButtonNumber(1) }}
                  />
                </CTableDataCell>
              </div>
              <div style={{
                width: '300px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <img src={selectedPImage ? selectedPImage : image} alt="image" style={{ width: '300px', height: '300px' }} />
                <CTableDataCell className="text-center">
                  <CFormInput
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    onClick={() => { setButtonNumber(2) }}
                  />
                </CTableDataCell>
              </div>
            </div>

            <CFormInput
              placeholder="Rozet Numarası"
              style={{ width: "50%", marginTop: "10px" }}
              onChange={(e) => {
                setRozetNumber(e.target.value)
              }}
            />
            <span style={{ marginTop: "50px" }}>
              Bağlı olan seviyeler
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
              {levels.map((item, index) => {
                let numberArray = rozet?.levelNumbers ? rozet?.levelNumbers?.split(",") : ""
                let isHas = numberArray.includes(String(item?.levelId))
                return (
                  <div key={index}
                    onClick={() => {
                      agress(item.levelId);
                      setTouch(!isTouch);

                    }}
                    class="hover-element"
                    style={{
                      width: "18%",
                      height: "30px",
                      margin: "8px",
                      backgroundColor: agree.includes(item.levelId) == true
                        ? "rgb(0, 255, 255)"
                        : isHas == true ? "rgb(0, 255, 120)" : "rgb(180, 180, 180)",
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: isHas == true ? "green" : "gray",
                      borderRadius: "5px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}>
                    <span>{item.levelNumber}</span>
                  </div>
                )
              })}
            </div>
            <CTableDataCell className="text-center">
              <CButton onClick={() => { postCreate(); setLoading(true) }}>
                {loading == true ?

                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    cssOverride={{ marginRight: "20px", marginLeft: "20px" }}
                    // cssOverride={override}
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
              width: '70%',
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: '200px',
              paddingRight: '200px',
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }} >

              <img src={rozet?.activeImage} alt="aktif" style={{ width: '300px', height: '300px' }} />
              <img src={rozet?.passiveImage} alt="pasif" style={{ width: '300px', height: '300px' }} />
            </div>

            <CFormInput
              placeholder={"(" + rozet?.rozetNumber + ")" + "Rozet Numarası"}
              style={{ width: "50%", marginTop: "10px" }}
              disabled
            />
            <span style={{ marginTop: "50px" }}>
              Bağlı olan seviyeler
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", width: "70%", justifyContent: "center" }}>

              {rozet?.levelNumbers ?
                levels.map((item, index) => {
                  let numberArray = rozet?.levelNumbers ? rozet?.levelNumbers?.split(",") : ""
                  let isHas = numberArray.includes(String(item?.levelId))
                  return (
                    isHas == true ?
                      <div key={index}
                        onClick={() => {
                          agress(item.levelId);
                          setTouch(!isTouch);

                        }}
                        class="hover-element"
                        style={{
                          width: "18%",
                          height: "30px",
                          margin: "8px",
                          backgroundColor: isHas == true ? "rgb(0, 255, 120)" : "rgb(180, 180, 180)",
                          borderWidth: 2,
                          borderStyle: "solid",
                          borderColor: isHas == true ? "green" : "gray",
                          borderRadius: "5px",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}>
                        <span>{item.levelNumber}</span>
                      </div>

                      :
                      <></>
                  )
                })

                :
                <span style={{ marginTop: "50px", color: "red" }}>
                  Bağlı olan seviye bulunmamaktadır
                </span>}

            </div>
            <CTableDataCell className="text-center">
              <CButton style={{ width: "200px" }} onClick={() => {
                setDelete(rozet)
                setLoading(true)
                handleReload()
              }}>
                {loading == true ?

                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    // cssOverride={override}
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
