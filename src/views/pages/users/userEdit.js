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
import { useParams } from 'react-router-dom'

const UserEdit = () => {
  const { userId } = useParams()
  // console.log(props.route.params)
  const [user, setUser] = React.useState()
  const [horoscopes, setHoroscopes] = React.useState()
  const [select, setSelect] = React.useState()
  const [fullName, setFullName] = React.useState()
  const [gender, setGender] = React.useState()
  const [mail, setMail] = React.useState()
  const [birthday, setBirthday] = React.useState()
  const [latitude, setLatitude] = React.useState()
  const [longitude, setLongitude] = React.useState()
  const [city, setCity] = React.useState()

  React.useEffect(() => {
    getUser(userId)
  }, [userId])
  const getUser = (userId) => {
    try {
      post('/api/admin/user-get', { userId }).then((res) => {
        if (res.result) {
          setUser(res.user)
          setHoroscopes(res.horoscopes)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const updateUser = (
    userId,
    fullName,
    gender,
    mail,
    birthday,
    select,
    latitude,
    longitude,
    city,
  ) => {
    try {
      post('/api/admin/user-update', {
        userId,
        fullName,
        gender,
        mail,
        birthday,
        select,
        latitude,
        longitude,
        city,
      }).then((res) => {
        if (res.result) {
          console.log('oki')
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
      <CForm>
        İsim soyisim
        <CFormInput
          className="me-sm-2"
          placeholder={user?.fullName}
          size="sm"
          onChange={(e) => {
            setFullName(e.target.value)
          }}
        />
        E-mail
        <CFormInput
          className="me-sm-2"
          placeholder={user?.email}
          size="sm"
          onChange={(e) => {
            setMail(e.target.value)
          }}
        />
        Cinsiyet
        <CFormInput
          className="me-sm-2"
          placeholder={user?.gender + '    (Kadın, Erkek, LGBT, Belirtmek istemiyorum)'}
          size="sm"
          onChange={(e) => {
            setGender(e.target.value)
          }}
        />
        Doğum günü
        <CFormInput
          className="me-sm-2"
          placeholder={user?.birthday}
          size="sm"
          onChange={(e) => {
            setBirthday(e.target.value)
          }}
        />
        Burç
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={select ? select : user?.horoscopeId}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Burçlar</CDropdownHeader>

            {horoscopes?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setSelect(item?.horoscopeId)}>
                    <CAvatar size="md" src={item?.DifferentImage} />
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.horoscopeId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        Enlem
        <CFormInput
          className="me-sm-2"
          placeholder={user?.latitude}
          size="sm"
          onChange={(e) => {
            setLatitude(e.target.value)
          }}
        />
        Boylam
        <CFormInput
          className="me-sm-2"
          placeholder={user?.longitude}
          size="sm"
          onChange={(e) => {
            setLongitude(e.target.value)
          }}
        />
        Şehir
        <CFormInput
          className="me-sm-2"
          placeholder={user?.city}
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
            updateUser(
              userId,
              fullName ? fullName : user.fullName,
              gender ? gender : user.gender,
              mail ? mail : user.email,
              birthday ? birthday : user.birthday,
              select ? select : user.horoscopeId,
              latitude ? latitude : user.latitude,
              longitude ? longitude : user.longitude,
              city ? city : user.city,
            )
            getUser(userId)
          }}
          color="primary"
          className="px-4"
        >
          Güncelle
        </CButton>
      </CCol>
    </>
  )
}

export default UserEdit
