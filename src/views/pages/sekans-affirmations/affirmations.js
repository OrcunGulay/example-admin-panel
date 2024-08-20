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
  CFormTextarea,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CFormSelect,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import styles from 'src/assets/styles/homeStyles.css'
import closeImage from '../../../assets/images/close.png'
import ClipLoader from 'react-spinners/ClipLoader'
import image from '../../../assets/images/image.png'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import Quill from 'quill'
import Emoji from 'quill-emoji'

Quill.register('modules/emoji', Emoji)

const Sekans = () => {
  const [advices, setAdvices] = React.useState()
  const [selectAdvice, setSelectAdvice] = React.useState()
  const [waiting, setWaiting] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [create, setCreate] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(null)
  const [imageObject, setImageObject] = React.useState(null)
  const [repeatNumber, setRepeatNumber] = React.useState()
  const [title, setTitle] = React.useState()
  const [categorie, setCategorie] = React.useState('')
  const [categories, setCategories] = React.useState()
  const [agree, setAgree] = React.useState([])
  const [text, setText] = React.useState()
  const [touch, setTouch] = React.useState(false)
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

  const agress = (params) => {
    if (agree.includes(params)) {
      let b = agree
      let yer = agree.indexOf(params)
      b.splice(yer, 1)
      setAgree(b)
    } else {
      let a = agree
      a.push(params)
      setAgree(a)
    }
    return agree
  }

  //-----FOR UPLOAD IMAGE---
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(URL.createObjectURL(file))
        setImageObject(file)
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

  //    FOR TEXT EDITOR COLOR
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['emoji'],
    ],
  }
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'color',
    'background',
    'emoji',
  ]
  //--------FOR EDITOR END------

  const handleReload = () => {
    setWaiting(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000) // 2000 milisaniye (2 saniye) bekleyecek
  }

  React.useEffect(() => {
    getAdvices()
  }, [])

  const getAdvices = () => {
    try {
      post('/api/admins/get-advices').then((res) => {
        if (res.result) {
          setAdvices(res.advices)
          setCategories(res.categories)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const updateAdvice = (title, text, image, categorie) => {
    try {
      post('/api/admins/update-advice', {
        id: selectAdvice.id,
        title,
        text,
        categorie,
        products: agree,
      }).then(async (res) => {
        if (res.result) {
          addToast(exampleToast('Resim yükleniyor...'))

          const formData = new FormData()
          formData.append('image', imageObject)
          formData.append('fileName', `advices/article/${selectAdvice.id}`)

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

          if (response.ok) {
            const data = await response.json()

            if (data.type == 'success') {
              getAdvices()
              addToast(exampleToast('Güncellendi'))
            } else {
              addToast(exampleToast(data.error))
            }
          } else {
            addToast(exampleToast('Bir sorun meydana geldi!'))
          }
          setLoading(false)
          setEdit(false)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const deleteAdvice = () => {
    try {
      post('/api/admins/delete-advice', { id: selectAdvice.id }).then((res) => {
        if (res.result) {
          setLoading(false)
          setDeleteModal(false)
          addToast(exampleToast('Makale Silindi'))
          getAdvices()
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const createAdvice = (title, text, categorieId) => {
    try {
      if (title && text && categorieId) {
        post('/api/admins/create-advice', { title, text, categorieId }).then(async (res) => {
          if (res.result) {
            addToast(exampleToast('Resim yükleniyor...'))

            const formData = new FormData()
            formData.append('image', imageObject)
            formData.append('fileName', `advices/article/${res.id}`)

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

            if (response.ok) {
              const data = await response.json()

              if (data.type == 'success') {
                getAdvices()
                addToast(exampleToast('Eklendi'))
              } else {
                addToast(exampleToast(data.error))
              }
            } else {
              addToast(exampleToast('Bir sorun meydana geldi!'))
            }
            setLoading(false)
            setCreate(false)
          }
        })
      } else {
        setLoading(false)
        addToast(exampleToast('Boş Alan Bırakmayınız'))
      }
      setLoading(false)
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
          Tavsiye Oluştur
        </CButton>
      </CCol>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Makale Görseli</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Makale Başlığı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kategori</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Önerilen Ürün Sayısı</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {advices?.map((item, index) => {
            return (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <img src={item?.image} alt="ikon" style={{ width: '50px', height: '50px' }} />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.title}</div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div>{item?.category.name}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.products.length}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    onClick={() => {
                      setSelectAdvice(item)
                      setEdit(true)
                    }}
                  >
                    Düzenle
                  </CButton>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    disabled={waiting}
                    color="success"
                    onClick={() => {
                      window.location.href = `#/addproducts/${item?.id}`
                    }}
                  >
                    Ürün Ekle
                  </CButton>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    disabled={waiting}
                    color="danger"
                    onClick={() => {
                      setSelectAdvice(item)
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

      {edit ? (
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
                setEdit(false)
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
          <div
            style={{
              alignSelf: 'center',
              width: '80%',
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              Makale Başlığı
              <CFormInput
                className="me-sm-2"
                defaultValue={selectAdvice?.title}
                size="sm"
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              Makale Kategorisi
              <CFormSelect
                className="me-sm-2"
                size="sm"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                <option value="" disabled>
                  {selectAdvice?.category.name}
                </option>
                {categories?.map((_item, _index) => {
                  return <option value={_item?.id}>{_item?.name}</option>
                })}
              </CFormSelect>
              <img
                src={selectedImage ? selectedImage : selectAdvice?.image}
                alt="image"
                style={{ width: '300px', height: '300px' }}
              />
              <CTableDataCell className="text-center">
                <CFormInput type="file" name="image" onChange={handleImageChange} />
              </CTableDataCell>
            </div>

            <CForm style={{ width: '50%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: '20px',
                }}
              >
                {selectAdvice?.products?.map((i) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                      }}
                    >
                      <img
                        src={JSON.parse(i?.images)[0]}
                        alt="ikon"
                        style={{ width: '100px', height: '100px' }}
                      />
                      <div>{i?.name}</div>
                      <CButton
                        onClick={() => {
                          agress(i.productId)
                          setTouch(!touch)
                        }}
                        style={{
                          width: '200px',
                          backgroundColor: agree.includes(i.productId) == true ? 'gray' : 'blue',
                        }}
                      >
                        {agree.includes(i.productId) == true ? 'ekle' : 'Kaldır'}
                      </CButton>
                    </div>
                  )
                })}
              </div>
            </CForm>
          </div>

          <CForm style={{ width: '50%' }}>
            <div style={{ marginTop: '20px' }}>
              Makale Yazısı
              <ReactQuill
                theme="snow"
                defaultValue={selectAdvice?.text}
                onChange={setText}
                modules={modules}
                formats={formats}
                style={{ width: '100%', height: '200px', marginTop: '10px' }}
              />
            </div>
          </CForm>

          <CTableDataCell className="text-center">
            <CButton
              style={{ width: '200px', marginTop: '100px', marginBottom: '30px' }}
              onClick={() => {
                updateAdvice(
                  title ? title : selectAdvice.title,
                  text ? text : selectAdvice.text,
                  image ? image : selectAdvice.image,
                  categorie ? categorie : selectAdvice.category.id,
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
          </CTableDataCell>
        </div>
      ) : (
        <></>
      )}

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
          <div
            style={{
              alignSelf: 'center',
              width: '80%',
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={selectedImage ? selectedImage : image}
                alt="image"
                style={{ width: '300px', height: '300px' }}
              />
              <CTableDataCell className="text-center">
                <CFormInput type="file" name="image" onChange={handleImageChange} />
              </CTableDataCell>
            </div>

            <CForm style={{ width: '50%' }}>
              Makale Başlığı
              <CFormInput
                className="me-sm-2"
                placeholder="Başlık Giriniz"
                size="sm"
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              Makale Kategorisi
              <CFormSelect
                className="me-sm-2"
                size="sm"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                <option value="" disabled>
                  Kategori Seçiniz
                </option>
                {categories?.map((_item, _index) => {
                  return <option value={_item?.id}>{_item?.name}</option>
                })}
              </CFormSelect>
            </CForm>
          </div>

          <CForm style={{ width: '50%' }}>
            <div style={{ marginTop: '20px' }}>
              Makale İçeriği
              <ReactQuill
                theme="snow"
                placeholder="İçerik Yazınız"
                onChange={setText}
                modules={modules}
                formats={formats}
                style={{ width: '100%', height: '200px', marginTop: '10px' }}
              />
            </div>
          </CForm>

          <CTableDataCell className="text-center">
            <CButton
              style={{ width: '200px', marginTop: '100px', marginBottom: '30px' }}
              onClick={() => {
                createAdvice(title, text, categorie)
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
          <div
            style={{
              alignSelf: 'center',
              width: '80%',
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={selectAdvice?.image}
                alt="image"
                style={{ width: '300px', height: '300px' }}
              />
            </div>

            <CForm style={{ width: '50%' }}>
              Makale Adı
              <br />
              <p>{selectAdvice?.title}</p>
              Makale İçeriği
              <br />
              <p>{selectAdvice?.text?.substring(3, 400)} ...</p>
            </CForm>
          </div>

          <CTableDataCell className="text-center">
            <CButton
              style={{ width: '200px', marginTop: '60px', marginBottom: '30px' }}
              onClick={() => {
                setLoading(true)
                deleteAdvice()
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
