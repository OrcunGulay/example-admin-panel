/* eslint-disable */
import React, { Component } from 'react'
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
  CFormTextarea,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CFormSelect,
  CDropdownItem,
  CDropdown,
  CBadge,
  CDropdownToggle,
  CDropdownDivider,
  CDropdownHeader,
  CFormCheck,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import styles from 'src/assets/styles/homeStyles.css'
import ClipLoader from 'react-spinners/ClipLoader'
import 'react-quill/dist/quill.snow.css'

const Horoscopes = () => {
  const admin = JSON.parse(localStorage.getItem('user'))
  const [horoscopes, setHoroscopes] = React.useState()
  const [subcategorie, setSubCategorie] = React.useState([])
  const [subcategori, setSubCategori] = React.useState([])
  const [images, setImages] = React.useState()
  const [selectedImage, setSelectedImage] = React.useState()
  const [selectedImage2, setSelectedImage2] = React.useState()
  const [selectedImage3, setSelectedImage3] = React.useState()
  const [imageObject, setImageObject] = React.useState()
  const [imageObject2, setImageObject2] = React.useState()
  const [imageObject3, setImageObject3] = React.useState()
  const [name, setName] = React.useState()
  const [description, setDescription] = React.useState()
  const [city, setCity] = React.useState()
  const [button, setButton] = React.useState()
  const [price, setPrice] = React.useState()
  const [department, setDepatment] = React.useState()
  const [latitude, setLatitude] = React.useState()
  const [longitude, setLongitude] = React.useState()
  const [openAddress, setOpenAddress] = React.useState()
  const [loading, setLoading] = React.useState(false)
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
  //-----FOR UPLOAD IMAGE---
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.type.startsWith('image/')) {
        if (button == 0) {
          setSelectedImage(URL.createObjectURL(file))
          setImageObject(file)
        } else if (button == 1) {
          setSelectedImage2(URL.createObjectURL(file))
          setImageObject2(file)
        } else if (button == 2) {
          setSelectedImage3(URL.createObjectURL(file))
          setImageObject3(file)
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: 'Seçilen format desteklenmiyor!',
        })
        return
      }
    }
  }
  React.useEffect(() => {
    getInfo()
  }, [])

  const getProduct = (id) => {
    try {
      post('/api/admins/get-subcategories', { categorie: id }).then((res) => {
        if (res.result) {
          setSubCategorie(res.subcategorie)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const handleCheckboxChange = (category) => {
    setSubCategori((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category],
    )
  }
  const getInfo = () => {
    try {
      post('/api/admins/get-dealer', { dealerId: admin?.dealerId }).then((res) => {
        if (res.result) {
          setHoroscopes(res.dealer)
          setImages(res.dealer?.image ? JSON.parse(res.dealer?.image) : [])
          getProduct(res.dealer?.meetingId)
          setSubCategori(res?.dealer?.meetingSubsIds ? JSON.parse(res?.dealer?.meetingSubsIds) : [])
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const postInfo = (name, city, description) => {
    try {
      post('/api/admins/post-dealer', {
        dealerId: admin?.dealerId,
        degree: admin?.degree,
        name,
        city,
        description,
        price,
        department,
        latitude,
        longitude,
        openAddress,
        subcategori,
      }).then(async (res) => {
        if (res.result) {
          if (selectedImage || selectedImage2 || selectedImage3) {
            addToast(exampleToast('Resim yükleniyor...'))

            const formData = new FormData()
            formData.append('image', imageObject)
            formData.append('fileName', `dealers/${res?.id}.1`)

            const formData2 = new FormData()
            formData2.append('image', imageObject2)
            formData2.append('fileName', `dealers/${res?.id}.2`)

            const formData3 = new FormData()
            formData3.append('image', imageObject3)
            formData3.append('fileName', `dealers/${res?.id}.3`)

            const response = await fetch(
              `https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`,
              {
                method: 'POST',
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
              },
            )

            const response2 = await fetch(
              `https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`,
              {
                method: 'POST',
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData2,
              },
            )

            const response3 = await fetch(
              `https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`,
              {
                method: 'POST',
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData3,
              },
            )

            if (response.ok || response2.ok || response3.ok) {
              const data = await response.json()
              const data2 = await response2.json()
              const data3 = await response3.json()

              if (data.type == 'success' || data2.type == 'success' || data3.type == 'success') {
                addToast(exampleToast('Eklendi'))
              } else {
                addToast(exampleToast(data.error))
              }
            } else {
              addToast(exampleToast('Bir sorun meydana geldi!'))
            }
          }
          setLoading(false)
          addToast(exampleToast('Bilgileriniz güncellendi ...'))
          getInfo()
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
        <div
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: 20,
            margin: '10px',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <CFormInput
            className="me-sm-2"
            defaultValue={horoscopes?.name}
            size="lg"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <br />

          <CFormInput
            className="me-sm-2"
            defaultValue={horoscopes?.city}
            size="md"
            onChange={(e) => {
              setCity(e.target.value)
            }}
          />
          <br />

          {admin?.degree == 3 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ width: '48%' }}>
                Seans Ücretiniz
                <CFormInput
                  className="me-sm-2"
                  defaultValue={horoscopes?.price}
                  size="md"
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                />
              </div>
              <div style={{ width: '48%' }}>
                Uzmanlık Alanınız
                <CFormInput
                  className="me-sm-2"
                  defaultValue={horoscopes?.department}
                  size="md"
                  onChange={(e) => {
                    setDepatment(e.target.value)
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: '48%' }}>
                  Enlem
                  <CFormInput
                    className="me-sm-2"
                    defaultValue={horoscopes?.latitude}
                    size="md"
                    onChange={(e) => {
                      setLatitude(e.target.value)
                    }}
                  />
                </div>
                <div style={{ width: '48%' }}>
                  Boylam
                  <CFormInput
                    className="me-sm-2"
                    defaultValue={horoscopes?.longitude}
                    size="md"
                    onChange={(e) => {
                      setLongitude(e.target.value)
                    }}
                  />
                </div>
              </div>
              <br />

              <p style={{ color: 'red' }}>
                Kargoların iadesinde gönderilmesi gereken adresi giriniz.
              </p>
              <CFormInput
                className="me-sm-2"
                defaultValue={horoscopes?.openAddress}
                size="md"
                onChange={(e) => {
                  setOpenAddress(e.target.value)
                }}
              />
            </>
          )}
          <p>
            <br />
            <p style={{ color: 'red' }}>İşletmenizin detayında yazacak olan açıklamadır.</p>
            <CFormTextarea
              className="me-sm-2"
              defaultValue={horoscopes?.description}
              style={{ height: '200px', overflowY: 'auto' }}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </p>
          <br />
          <p style={{ color: 'red' }}>Görselleri değiştirebilmek için butonlara tıklayınız</p>
          <div
            style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              width: '100%',
              justifyContent: 'space-betwwen',
            }}
          >
            {images?.map((image, index) => (
              <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                <CFormInput
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  onClick={() => {
                    setButton(index)
                  }}
                />
                <img
                  src={
                    index == 0
                      ? selectedImage ?? image
                      : index == 1
                      ? selectedImage2 ?? image
                      : index == 2
                      ? selectedImage3 ?? image
                      : ''
                  }
                  alt={`Profil fotografı ${index + 1}`}
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          <br />
          <p style={{ color: 'red' }}>Verdiğiniz hizmetleri güncelleyebilirsiniz</p>

          {subcategorie?.map((_item, _index) => (
            <CFormCheck
              key={_index}
              type="checkbox"
              label={_item?.name}
              id={`categoryCheckbox-${_item.id}`}
              checked={subcategori && subcategori.includes(_item.id)}
              onChange={() => handleCheckboxChange(_item.id)}
            />
          ))}

          <CButton
            style={{ width: '500px', marginTop: '50px' }}
            onClick={() => {
              postInfo(
                name ? name : horoscopes?.name,
                city ? city : horoscopes?.city,
                description ? description : horoscopes?.description,
              )
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
              'Güncelle'
            )}
          </CButton>
        </div>
      </div>
    </>
  )
}

export default Horoscopes
