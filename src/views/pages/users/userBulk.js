import React from 'react'
import {
  CButton,
  CForm,
  CCol,
  CFormInput,
  CDropdownItem,
  CDropdown,
  CBadge,
  CDropdownToggle,
  CAvatar,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownMenu,
} from '@coreui/react'
import { post } from 'src/networking/Server'

const UserBulk = () => {
  const [tables, setTables] = React.useState([])
  const [lng, setLng] = React.useState()
  const [latitude, setLatitude] = React.useState()
  const [longitude, setLongitude] = React.useState()
  const [city, setCity] = React.useState()
  const [gender, setGender] = React.useState()

  React.useEffect(() => {
    getTables()
  }, [])

  const getTables = () => {
    try {
      post('/api/admin/get').then((res) => {
        if (res.result) {
          setTables(res.results)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const addUser = (gender, lng, latitude, longitude, city) => {
    try {
      post('/api/admin/user-bulk', {
        language: lng,
        latitude,
        longitude,
        city,
        gender,
      }).then((res) => {
        if (res.result) {
          window.location.href = '#/users'
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
      <CForm>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput className="me-sm-2" placeholder={lng ? lng : 'Dil'} size="sm" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Dil</CDropdownHeader>

            {tables[8]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setLng(item?.languageId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.languageId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>

        <CFormInput
          className="me-sm-2"
          placeholder="Cinsiyet  (Kadın, Erkek, LGBT, Belirtmek istemiyorum)"
          size="sm"
          onChange={(e) => {
            setGender(e.target.value)
          }}
        />

        <CFormInput
          className="me-sm-2"
          placeholder="Enlem"
          size="sm"
          onChange={(e) => {
            setLatitude(e.target.value)
          }}
        />
        <CFormInput
          className="me-sm-2"
          placeholder="Boylam"
          size="sm"
          onChange={(e) => {
            setLongitude(e.target.value)
          }}
        />
        <CFormInput
          className="me-sm-2"
          placeholder="Şehir"
          size="sm"
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
      </CForm>
      <CCol xs={6}>
        <CButton
          style={{ marginTop: 10 }}
          onClick={() => {
            addUser(gender, lng, latitude, longitude, city)
          }}
          //href="#/users"
          color="success"
          className="px-4"
        >
          Ekle
        </CButton>
      </CCol>
    </>
  )
}

export default UserBulk
