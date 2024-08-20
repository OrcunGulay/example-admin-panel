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

const UserAdd = () => {
  const [tables, setTables] = React.useState([])
  const [horoscope, setHoroscope] = React.useState()
  const [alchol, setAlchol] = React.useState()
  const [body, setBody] = React.useState()
  const [child, setChild] = React.useState()
  const [diet, setDiet] = React.useState()
  const [cgr, setCgr] = React.useState()
  const [edu, setEdu] = React.useState()
  const [eth, setEth] = React.useState()
  const [lng, setLng] = React.useState()
  const [mar, setMar] = React.useState()
  const [pet, setPet] = React.useState()
  const [pol, setPol] = React.useState()
  const [rel, setRel] = React.useState()
  const [work, setWork] = React.useState()
  const [fullName, setFullName] = React.useState()
  const [gender, setGender] = React.useState()
  const [mail, setMail] = React.useState()
  const [birthday, setBirthday] = React.useState()
  const [latitude, setLatitude] = React.useState()
  const [longitude, setLongitude] = React.useState()
  const [city, setCity] = React.useState()

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
  const addUser = (
    horoscope,
    alchol,
    body,
    child,
    diet,
    cgr,
    edu,
    eth,
    lng,
    mar,
    pet,
    pol,
    rel,
    work,
    fullName,
    gender,
    mail,
    birthday,
    latitude,
    longitude,
    city,
  ) => {
    try {
      post('/api/admin/user-add', {
        horoscope,
        alchol,
        body,
        child,
        diet,
        cgr,
        edu,
        eth,
        lng,
        mar,
        pet,
        pol,
        rel,
        work,
        fullName,
        gender,
        mail,
        birthday,
        latitude,
        longitude,
        city,
      }).then((res) => {
        if (res.result) {
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
      <CForm>
        <CFormInput
          className="me-sm-2"
          placeholder="İsim Soyisim"
          size="sm"
          onChange={(e) => {
            setFullName(e.target.value)
          }}
        />
        <CFormInput
          className="me-sm-2"
          placeholder="E-mail"
          size="sm"
          onChange={(e) => {
            setMail(e.target.value)
          }}
        />
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
          placeholder="Doğum günü"
          size="sm"
          onChange={(e) => {
            setBirthday(e.target.value)
          }}
        />
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={horoscope ? horoscope : 'Burç'}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Burç</CDropdownHeader>

            {tables[0]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setHoroscope(item?.horoscopeId)}>
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
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={alchol ? alchol : 'Alkol içme durumu'}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">
              Alkol içme durumu
            </CDropdownHeader>

            {tables[1]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setAlchol(item?.alcoholicStatuId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.alcoholicStatuId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput className="me-sm-2" placeholder={body ? body : 'Vücut tipi'} size="sm" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Vücut Tipi</CDropdownHeader>

            {tables[2]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setBody(item?.bodyTypeId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.bodyTypeId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={child ? child : 'Çocuk durumu'}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Çocuk durumu</CDropdownHeader>

            {tables[3]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setChild(item?.childStatuId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.childStatuId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={diet ? diet : 'Beslenme şekli'}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Beslenme Şekli</CDropdownHeader>

            {tables[4]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setDiet(item?.dietStatuId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.dietStatuId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={cgr ? cgr : 'Sigara içme durumu'}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">
              Sigara içme durumu
            </CDropdownHeader>

            {tables[5]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setCgr(item?.cigaretteStatuId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.cigaretteStatuId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput className="me-sm-2" placeholder={edu ? edu : 'Eğitim durumu'} size="sm" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Eğitim durumu</CDropdownHeader>

            {tables[6]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setEdu(item?.educationId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.educationId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput className="me-sm-2" placeholder={eth ? eth : 'Etnik Köken'} size="sm" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Etnik köken</CDropdownHeader>

            {tables[7]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setEth(item?.ethnicityId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.ethnicityId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
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
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput className="me-sm-2" placeholder={mar ? mar : 'Marijuana'} size="sm" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Marijuana</CDropdownHeader>

            {tables[9]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setMar(item?.marijuanaStatuId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.marijuanaStatuId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={pet ? pet : 'Evcil Hayvan durumu'}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">
              Evcil Hayvan durumu
            </CDropdownHeader>

            {tables[10]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setPet(item?.petHaveStatuId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.petHaveStatuId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput className="me-sm-2" placeholder={pol ? pol : 'Politik görüş'} size="sm" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Politik Görüş</CDropdownHeader>

            {tables[11]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setPol(item?.politicId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.politicId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput className="me-sm-2" placeholder={rel ? rel : 'Dini inanç'} size="sm" />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Dini inanç</CDropdownHeader>

            {tables[12]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setRel(item?.religionId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.religionId}
                    </CBadge>
                  </CDropdownItem>
                </>
              )
            })}

            <CDropdownDivider />
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
            <CFormInput
              className="me-sm-2"
              placeholder={work ? work : 'Çalışma durumu'}
              size="sm"
            />
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-light fw-semibold py-2">Çalışma Durumu</CDropdownHeader>

            {tables[13]?.map((item, index) => {
              return (
                <>
                  <CDropdownItem key={index} onClick={() => setWork(item?.workingStatuId)}>
                    {item?.name}
                    <CBadge color="info" className="ms-2">
                      {item?.workingStatuId}
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
            addUser(
              horoscope,
              alchol,
              body,
              child,
              diet,
              cgr,
              edu,
              eth,
              lng,
              mar,
              pet,
              pol,
              rel,
              work,
              fullName,
              gender,
              mail,
              birthday,
              latitude,
              longitude,
              city,
            )
          }}
          href="#/users"
          color="success"
          className="px-4"
        >
          Ekle
        </CButton>
      </CCol>
    </>
  )
}

export default UserAdd
