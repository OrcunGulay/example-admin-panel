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
    CFormTextarea,
    CFormInput,
    CDropdownItem,
    CDropdown,
    CBadge,
    CDropdownToggle,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownMenu,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import styles from 'src/assets/styles/homeStyles.css'
import closeImage from "../../../assets/images/close.png";
import ClipLoader from "react-spinners/ClipLoader";
import image from "../../../assets/images/image.png"



const Notifications = () => {
    const [horoscopes, setHoroscopes] = React.useState()
    const [horoscope, setHoroscope] = React.useState()
    const [waiting, setWaiting] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [type, setType] = React.useState(0)
    const [content, setContent] = React.useState()
    const [title, setTitle] = React.useState()

    React.useEffect(() => {
        getHoroscopes()
    }, [])
    const getHoroscopes = () => {
        try {
            post('/api/admin/horoscopes').then((res) => {
                if (res.result) {
                    setHoroscopes(res.horoscopes)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    const sendNotification = (content, title, horoscope = null) => {
        post("/api/notifications/set-all", {
            title: title,
            body: content,
            horoscope
        }).then((res) => {
            setLoading(false);
            setTitle("");
            setContent("");
            console.log(res);
        })
    }

    return (
        <>
            <CCol>
                <CButton
                    onClick={() => {
                        setType(0)
                        // sendNotification();
                    }}
                    style={{ marginTop: 10, marginBottom: 20, width: "100%" }}
                    color="success"
                    className="px-4"
                >
                    Genel Bildirim Oluştur
                </CButton>
                <CButton
                    onClick={() => {
                        setType(1)
                    }}
                    style={{ marginTop: 10, marginBottom: 20, width: "100%" }}
                    color="info"
                    className="px-4"
                >
                    Burç Bildirimi Oluştur
                </CButton>

                {type == 0 ?
                    <div style={{
                        width: '100%',
                        backgroundColor: "white",
                        borderRadius: 30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: 50
                    }} >
                        GENEL BİLDİRİM
                        <CForm style={{ width: "70%", marginTop: 20 }}>
                            Bildirim Başlığı
                            <CFormInput
                                className="me-sm-2"
                                placeholder='Bildirimde başlık olarak görünecektir.'
                                size="sm"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                            Bildirim İçeriği
                            <CFormTextarea id="exampleFormControlTextarea1" placeholder='Tüm kişilere gönderebileceğin motivasyon bildirimi olabilir.' rows={3}
                                onChange={(e) => {
                                    setContent(e.target.value)
                                }}></CFormTextarea>
                        </CForm>

                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "40px", marginBottom: "30px" }} onClick={() => {
                                // addAffirmation(title, repeatNumber, description)
                                sendNotification(content, title)
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
                                    "Bildirimi Gönder"
                                }
                            </CButton>
                        </CTableDataCell>
                    </div >
                    :
                    <div style={{
                        width: '100%',
                        backgroundColor: "white",
                        borderRadius: 30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: 50
                    }} >
                        BURÇ BİLDİRİMİ
                        <CForm style={{ width: "70%", marginTop: 20 }}>

                            Özel/Genel
                            <CDropdown variant="nav-item">
                                <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                                    <CFormInput
                                        className="me-sm-2"
                                        placeholder={
                                            horoscope ? horoscope.name : "Seçiniz"
                                        }
                                        size="sm"
                                    />
                                </CDropdownToggle>
                                <CDropdownMenu className="pt-0" placement="bottom-end">
                                    <CDropdownHeader className="bg-light fw-semibold py-2">Özel/Genel</CDropdownHeader>
                                    {horoscopes?.map((item, index) => {
                                        return (
                                            <CDropdownItem onClick={() => setHoroscope(item)}>
                                                {item?.name}
                                                <CBadge color="info" className="ms-2">
                                                    <img src={item.DifferentImage} alt="Profil fotografı" style={{ width: '20px', height: '20px', borderRadius: '20px' }} />
                                                </CBadge>
                                            </CDropdownItem>
                                        )
                                    })}
                                    <CDropdownDivider />
                                </CDropdownMenu>
                            </CDropdown>

                            Bildirim Başlığı
                            <CFormInput
                                className="me-sm-2"
                                placeholder='Bildirimde başlık olarak görünecektir.'
                                size="sm"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                            Bildirim İçeriği
                            <CFormTextarea id="exampleFormControlTextarea1" placeholder='Seçtiğin burca ait kişilere gönderebileceğin motivasyon bildirimi olabilir.' rows={3}
                                onChange={(e) => {
                                    setContent(e.target.value)
                                }}></CFormTextarea>
                        </CForm>

                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "40px", marginBottom: "30px" }} onClick={() => {
                                // addAffirmation(title, repeatNumber, description)
                                sendNotification(content, title, horoscope)
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
                                    "Bildirimi Gönder"
                                }
                            </CButton>
                        </CTableDataCell>
                    </div >


                }

            </CCol>


        </>
    )
}

export default Notifications
