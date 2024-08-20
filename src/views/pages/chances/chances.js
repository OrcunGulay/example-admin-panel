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
    CToast,
    CToastHeader,
    CToastBody,
    CToaster,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import closeImage from "../../../assets/images/close.png";
import ClipLoader from "react-spinners/ClipLoader";

//

const JetonsPackages = () => {
    const [jetons, setJetons] = React.useState()
    const [select, setSelect] = React.useState()
    const [waiting, setWaiting] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
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
                <CToastBody>Paket {info}.</CToastBody>
            </CToast>
        );
    };


    const handleReload = () => {
        setWaiting(true)
        setTimeout(() => {
            window.location.reload()
        }, 2000) // 2000 milisaniye (2 saniye) bekleyecek
    }

    React.useEffect(() => {
        getPackages()
    }, [])
    const getPackages = () => {
        try {
            post('/api/admin/chances').then((res) => {
                if (res.result) {
                    setJetons(res.chances)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    const updateJeton = (price) => {
        // console.log(select.chancePackageId)
        try {
            post('/api/admin/chance-update', {
                packageId: select.chancePackageId,
                price,
            }).then((res) => {
                if (res.result) {
                    setLoading(false)
                    setEdit(false)
                    getPackages()
                    addToast(exampleToast("Güncellendi"))
                }
            })
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
                        <CTableHeaderCell className="text-center">Paket Detayı</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Paket Fiyatı</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {jetons?.map((item, index) => {
                        return (
                            <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell>
                                    <div style={{ whiteSpace: 'pre-line' }}>{item?.package_detail}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>₺{item?.total_price}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CButton onClick={() => { setSelect(item); setEdit(true) }}>Düzenle</CButton>
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

                            <CForm style={{ width: "50%" }}>
                                Paket Detayı
                                <div style={{ whiteSpace: 'pre-line' }}>{select?.package_detail}</div>
                                Paket Fiyatı
                                <CFormInput
                                    className="me-sm-2"
                                    placeholder={select?.total_price}
                                    size="sm"
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                            </CForm>

                        </div>
                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                                updateJeton(
                                    price ? price : select.total_price,
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
        </>
    )
}

export default JetonsPackages
