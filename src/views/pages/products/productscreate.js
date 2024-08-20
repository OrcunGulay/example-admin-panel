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
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CFormCheck,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import ClipLoader from 'react-spinners/ClipLoader'
import { useParams } from 'react-router-dom'
import image from '../../../assets/images/image.png'

const Sekans = () => {
  const { item } = useParams()
  const [waiting, setWaiting] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState()
  const [selectedImage2, setSelectedImage2] = React.useState()
  const [selectedImage3, setSelectedImage3] = React.useState()
  const [selectedImage4, setSelectedImage4] = React.useState()
  const [buttonNumber, setButtonNumber] = React.useState()
  const [imageObject, setImageObject] = React.useState()
  const [imageObject2, setImageObject2] = React.useState()
  const [imageObject3, setImageObject3] = React.useState()
  const [imageObject4, setImageObject4] = React.useState()
  const [product, setProduct] = React.useState()
  const [products, setProducts] = React.useState([])
  const [categories, setCategories] = React.useState()
  const [categorie, setCategorie] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState()
  const [price, setPrice] = React.useState()
  const [discount, setDiscount] = React.useState()
  const [desc, setDesc] = React.useState()
  const colors = ['Beyaz', 'Siyah', 'Mor', 'Sarı', 'Kırmızı', 'Mavi', 'Yeşil']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [selectedSizes, setSelectedSizes] = React.useState([])
  const [selectedProducts, setSelectedProducts] = React.useState([])
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

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category],
    )
  }

  const handleCheckboxSizes = (category) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category],
    )
  }

  const handleCheckboxProducts = (category) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category],
    )
  }

  //-----FOR UPLOAD IMAGE---
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.type.startsWith('image/')) {
        if (buttonNumber == 1) {
          setSelectedImage(URL.createObjectURL(file))
          setImageObject(file)
        } else if (buttonNumber == 2) {
          setSelectedImage2(URL.createObjectURL(file))
          setImageObject2(file)
        } else if (buttonNumber == 3) {
          setSelectedImage3(URL.createObjectURL(file))
          setImageObject3(file)
        } else if (buttonNumber == 4) {
          setSelectedImage4(URL.createObjectURL(file))
          setImageObject4(file)
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
    getProduct()
  }, [])

  const getProduct = () => {
    try {
      post('/api/admins/get-products').then((res) => {
        if (res.result) {
          setProducts(res.products)
          setCategories(res.categories)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postProduct = (name, price, discount, categorieId, colors, size, desc, similar) => {
    try {
      if ((name, price, categorieId, imageObject || imageObject2 || imageObject3 || imageObject4)) {
        post('/api/admins/create-product', {
          name,
          price,
          discount,
          categorieId,
          colors,
          size,
          desc,
          similar,
        }).then(async (res) => {
          if (res.result) {
            addToast(exampleToast('Resim yükleniyor...'))

            const formData = new FormData()
            formData.append('image', imageObject)
            formData.append('fileName', `products/${res?.id}.1`)

            const formData2 = new FormData()
            formData2.append('image', imageObject2)
            formData2.append('fileName', `products/${res?.id}.2`)

            const formData3 = new FormData()
            formData3.append('image', imageObject3)
            formData3.append('fileName', `products/${res?.id}.3`)

            const formData4 = new FormData()
            formData4.append('image', imageObject4)
            formData4.append('fileName', `products/${res?.id}.4`)

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

            const response4 = await fetch(
              `https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`,
              {
                method: 'POST',
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData4,
              },
            )

            if (response.ok || response2.ok || response3.ok || response4.ok) {
              const data = await response.json()
              const data2 = await response2.json()
              const data3 = await response3.json()
              const data4 = await response4.json()

              if (
                data.type == 'success' ||
                data2.type == 'success' ||
                data3.type == 'success' ||
                data4.type == 'success'
              ) {
                addToast(exampleToast('Eklendi'))
                window.location.href = `#/products`
              } else {
                addToast(exampleToast(data.error))
              }
            } else {
              addToast(exampleToast('Bir sorun meydana geldi!'))
            }
            window.location.href = `#/products`
            setLoading(false)
          }
        })
      } else {
        addToast(exampleToast('İsim, fiyat, kategori ve görsel boş geçilemez!'))
        setLoading(false)
      }
    } catch (e) {
      console.log('hata')
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Kategori</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Adı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Fiyatı</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Kampanya</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableRow v-for="item in tableItems">
          <CTableDataCell className="text-center">
            <CFormSelect
              className="me-sm-2"
              size="sm"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option value="0" disabled>
                Kategori Seç
              </option>
              {categories?.map((_item, _index) => {
                return <option value={_item?.productCategoriesId}>{_item?.name}</option>
              })}
            </CFormSelect>
          </CTableDataCell>
          <CTableDataCell className="text-center">
            <CFormInput
              className="me-sm-2"
              placeholder="Ürün Adı"
              size="sm"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </CTableDataCell>
          <CTableDataCell className="text-center">
            <CFormInput
              className="me-sm-2"
              placeholder="Ürün Fiyatı"
              size="sm"
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            />
          </CTableDataCell>
          <CTableDataCell className="text-center">
            <CFormInput
              className="me-sm-2"
              placeholder="Kampanya Yüzdeliği"
              size="sm"
              onChange={(e) => {
                setDiscount(e.target.value)
              }}
            />
          </CTableDataCell>
        </CTableRow>
      </CTable>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Renkler</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Bedenler</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Açıklama</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableRow v-for="item in tableItems">
          <CTableDataCell className="text-center">
            <CFormInput
              className="me-sm-2"
              disabled={true}
              defaultValue={selectedCategories}
              size="sm"
            />
            {colors?.map((_item, _index) => (
              <CFormCheck
                key={_index}
                type="checkbox"
                label={_item}
                id={`categoryCheckbox-${_index}`}
                checked={
                  selectedCategories.length > 0 ? selectedCategories?.includes(_index) : false
                }
                onChange={() => handleCheckboxChange(_index)}
              />
            ))}
          </CTableDataCell>

          <CTableDataCell className="text-center">
            <CFormInput
              className="me-sm-2"
              disabled={true}
              defaultValue={selectedSizes}
              size="sm"
            />
            {sizes?.map((_item, _index) => (
              <CFormCheck
                key={_index}
                type="checkbox"
                label={_item}
                id={`categoryCheckbox-${_index}`}
                checked={selectedSizes.length > 0 ? selectedSizes?.includes(_index) : false}
                onChange={() => handleCheckboxSizes(_index)}
              />
            ))}
          </CTableDataCell>
          <CTableDataCell>
            <CFormTextarea
              rows={13}
              className="me-sm-2"
              placeholder="Ürün Açıklamaları"
              size="sm"
              onChange={(e) => {
                setDesc(e.target.value)
              }}
            />
          </CTableDataCell>
        </CTableRow>
      </CTable>

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Ürün Görselleri</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableRow v-for="item in tableItems">
          <CTableDataCell className="text-center">
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
                <CFormInput
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  onClick={() => {
                    setButtonNumber(1)
                  }}
                />
              </CTableDataCell>
            </div>
          </CTableDataCell>
          <CTableDataCell className="text-center">
            <div
              style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={selectedImage2 ? selectedImage2 : image}
                alt="image"
                style={{ width: '300px', height: '300px' }}
              />
              <CTableDataCell className="text-center">
                <CFormInput
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  onClick={() => {
                    setButtonNumber(2)
                  }}
                />
              </CTableDataCell>
            </div>
          </CTableDataCell>
          <CTableDataCell className="text-center">
            <div
              style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={selectedImage3 ? selectedImage3 : image}
                alt="image"
                style={{ width: '300px', height: '300px' }}
              />
              <CTableDataCell className="text-center">
                <CFormInput
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  onClick={() => {
                    setButtonNumber(3)
                  }}
                />
              </CTableDataCell>
            </div>
          </CTableDataCell>
          <CTableDataCell className="text-center">
            <div
              style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={selectedImage4 ? selectedImage4 : image}
                alt="image"
                style={{ width: '300px', height: '300px' }}
              />
              <CTableDataCell className="text-center">
                <CFormInput
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  onClick={() => {
                    setButtonNumber(4)
                  }}
                />
              </CTableDataCell>
            </div>
          </CTableDataCell>
        </CTableRow>
      </CTable>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Önerilen Ürünler</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableRow v-for="item in tableItems">
          <CTableDataCell className="text-center">
            <CFormInput
              className="me-sm-2"
              disabled={true}
              defaultValue={selectedProducts}
              size="sm"
            />
            {products?.map((_item, _index) => (
              <CFormCheck
                key={_index}
                type="checkbox"
                id={`categoryCheckbox-${_index}`}
                checked={
                  selectedProducts.length > 0 ? selectedProducts?.includes(_item.productId) : false
                }
                onChange={() => handleCheckboxProducts(_item.productId)}
                style={{ display: 'flex', alignItems: 'center' }}
                label={
                  <div>
                    <img
                      src={_item?.images ? JSON.parse(_item?.images)[0] : ''}
                      alt={_item.name}
                      style={{ marginRight: '8px', width: '40px', height: '40px' }}
                    />
                    {_item.name}
                  </div>
                }
              />
            ))}
          </CTableDataCell>
        </CTableRow>
      </CTable>

      <CButton
        onClick={() => {
          setLoading(true)
          postProduct(
            name,
            price,
            discount,
            categorie,
            selectedCategories,
            selectedSizes,
            desc,
            selectedProducts,
          )
        }}
      >
        {loading ? (
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
    </>
  )
}

export default Sekans
