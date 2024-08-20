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
import styles from 'src/assets/styles/homeStyles.css'
import closeImage from "../../../assets/images/close.png";
import ClipLoader from "react-spinners/ClipLoader";
import image from "../../../assets/images/image.png"



const BootsPackages = () => {
    const [boots, setBoots] = React.useState()
    const [boot, setBoot] = React.useState()
    const [waiting, setWaiting] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [create, setCreate] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [number, setNumber] = React.useState()
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
        getBoots()
    }, [])
    const getBoots = () => {
        try {
            post('/api/admin/boots').then((res) => {
                if (res.result) {
                    setBoots(res.boots)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    const updateBoot = (number, price) => {
        try {
            post('/api/admin/boot-update', {
                bootId: boot.bootsPackageId,
                number,
                price,
            }).then((res) => {
                if (res.result) {
                    setLoading(false)
                    setEdit(false)
                    getBoots()
                    addToast(exampleToast("Güncellendi"))
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }

    const addBoot = (number, price) => {
        try {
            post('/api/admin/boot-add', {
                number,
                price,
            }).then((res) => {
                if (res.result) {
                    setLoading(false)
                    setCreate(false)
                    getBoots()
                    addToast(exampleToast("Eklendi"))
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    const setBlock = (bootId) => {
        try {
            post('/api/admin/boot-delete', { bootId }).then((res) => {
                setLoading(false)
                setDeleteModal(false)
                getBoots()
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
                    Boot Paketi Oluştur
                </CButton>
            </CCol>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell className="text-center">Boots Sayısı</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Boots Fiyatı</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {boots?.map((item, index) => {
                        return (
                            <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                    <div>{item?.boots_number}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item?.total_price}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CButton onClick={() => { setBoot(item); setEdit(true) }}>Düzenle</CButton>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CButton
                                        disabled={waiting}
                                        color="danger"
                                        onClick={() => {
                                            setBoot(item)
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

                            <CForm style={{ width: "50%" }}>
                                Boot Sayısı
                                <CFormInput
                                    className="me-sm-2"
                                    placeholder={boot?.boots_number}
                                    size="sm"
                                    onChange={(e) => {
                                        setNumber(e.target.value)
                                    }}
                                />
                                Paket Fiyatı
                                <CFormInput
                                    className="me-sm-2"
                                    placeholder={boot?.total_price}
                                    size="sm"
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                            </CForm>

                        </div>
                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                                updateBoot(
                                    number ? number : boot.boots_number,
                                    price ? price : boot.total_price,
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
                            <CForm style={{ width: "50%" }}>
                                Boot Sayısı
                                <CFormInput
                                    className="me-sm-2"
                                    size="sm"
                                    onChange={(e) => {
                                        setNumber(e.target.value)
                                    }}
                                />
                                Paket Fiyatı
                                <CFormInput
                                    className="me-sm-2"
                                    size="sm"
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                            </CForm>

                        </div>
                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                                addBoot(number, price)
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

                            <CForm style={{ width: "50%" }}>
                                Boot Sayısı
                                <CFormInput
                                    className="me-sm-2"
                                    placeholder={boot?.boots_number}
                                    size="sm"
                                    disabled
                                />
                                Paket Fiyatı
                                <CFormInput
                                    className="me-sm-2"
                                    placeholder={boot?.total_price}
                                    size="sm"
                                    disabled
                                />
                            </CForm>

                        </div>
                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                                setBlock(boot?.bootsPackageId)
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

export default BootsPackages
