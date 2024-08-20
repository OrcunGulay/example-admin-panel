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



const Modes = () => {
    const [modes, setModes] = React.useState()
    const [mode, setMode] = React.useState()
    const [waiting, setWaiting] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [create, setCreate] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageObject, setImageObject] = React.useState(null);
    const [content, setContent] = React.useState()
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
                setSelectedImage(URL.createObjectURL(file));
                setImageObject(file);
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

    React.useEffect(() => {
        getModes()
    }, [])
    const getModes = () => {
        try {
            post('/api/admin/modes').then((res) => {
                if (res.result) {
                    setModes(res.modes)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    const updateMode = ( content) => {
        try {
            post('/api/admin/mode-update', {
                userModeId: mode.userModeId,
                content,
            }).then(async (res) => {
                if (res.result) {
                    addToast(exampleToast("Resim yükleniyor..."))

                    const formData = new FormData();
                    formData.append('image', imageObject);
                    formData.append('fileName', `Modes/${mode.userModeId}`);

                    const response = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
                        method: 'POST',
                        headers: {
                            'x-access-token': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();

                        if (data.type == "success") {
                            getModes()
                            addToast(exampleToast("Eklendi"))
                        } else {
                            addToast(exampleToast(data.error))
                        }
                    } else {
                        addToast(exampleToast("Bir sorun meydana geldi!"))
                    }
                    setLoading(false)
                    setEdit(false)
                    handleReload()
                    addToast(exampleToast("Güncellendi"))

                }
            })
        } catch (e) {
            console.log('hata')
        }
    }

    const addMode = ( content) => {
        try {
            post('/api/admin/mode-add', {
                content,
            }).then(async (res) => {
                if (res.result) {

                    addToast(exampleToast("Resim yükleniyor..."))

                    const formData = new FormData();
                    formData.append('image', imageObject);
                    formData.append('fileName', `Modes/${res.id}`);

                    const response = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
                        method: 'POST',
                        headers: {
                            'x-access-token': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();

                        if (data.type == "success") {
                            getModes()
                            addToast(exampleToast("Eklendi"))
                        } else {
                            addToast(exampleToast(data.error))
                        }
                    } else {
                        addToast(exampleToast("Bir sorun meydana geldi!"))
                    }

                    setLoading(false)
                    setCreate(false)
                    handleReload()
                    addToast(exampleToast("Eklendi"))

                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    const setBlock = (userModeId) => {
        try {
            post('/api/admin/mode-delete', { userModeId }).then((res) => {
                setLoading(false)
                setDeleteModal(false)
                getModes()
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
                    Mod Oluştur
                </CButton>
            </CCol>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell className="text-center">Görseli</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Açıklaması</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {modes?.map((item, index) => {
                        return (
                            <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                    <CAvatar size="md" src={item?.icon} />
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item?.content}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CButton onClick={() => { setMode(item); setEdit(true) }}>Düzenle</CButton>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CButton
                                        disabled={waiting}
                                        color="danger"
                                        onClick={() => {
                                            setMode(item)
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
                            <div style={{
                                width: '300px',
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <img src={selectedImage ? selectedImage : mode?.icon} alt="image" style={{ width: '300px', height: '300px' }} />
                                <CTableDataCell className="text-center">
                                    <CFormInput
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                </CTableDataCell>
                            </div>

                            <CForm style={{ width: "50%" }}>
                                Mod Açıklaması
                                <CFormInput
                                    className="me-sm-2"
                                    placeholder={mode?.content}
                                    size="sm"
                                    onChange={(e) => {
                                        setContent(e.target.value)
                                    }}
                                />
                            </CForm>

                        </div>
                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                                updateMode(
                                    content ? content : mode.content,
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
                            <div style={{
                                width: '300px',
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <img src={selectedImage ? selectedImage : image} alt="image" style={{ width: '300px', height: '300px' }} />
                                <CTableDataCell className="text-center">
                                    {/* <CButton onClick={() => { }}>Ekle</CButton> */}
                                    <CFormInput
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                </CTableDataCell>
                            </div>

                            <CForm style={{ width: "50%" }}>
                                Mod Açıklaması
                                <CFormInput
                                    className="me-sm-2"
                                    size="sm"
                                    onChange={(e) => {
                                        setContent(e.target.value)
                                    }}
                                />
                            </CForm>

                        </div>
                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                                addMode(content)
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
                            <div style={{
                                width: '300px',
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <img src={mode?.icon} alt="image" style={{ width: '300px', height: '300px' }} />

                            </div>

                            <CForm style={{ width: "50%" }}>
                                Mod Açıklaması
                                <CFormInput
                                    className="me-sm-2"
                                    placeholder={mode?.content}
                                    size="sm"
                                    disabled
                                />
                            </CForm>

                        </div>
                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "30px" }} onClick={() => {
                                setBlock(mode?.userModeId)
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

export default Modes
