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
    CDropdownItem,
    CDropdown,
    CBadge,
    CDropdownToggle,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownMenu,
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import Quill from 'quill';
import Emoji from 'quill-emoji';


Quill.register('modules/emoji', Emoji);




const Sekans = () => {
    const [packages, setPackages] = React.useState()
    const [pack, setPack] = React.useState()
    const [name, setName] = React.useState()
    const [description, setDescription] = React.useState()
    const [time, setTime] = React.useState()
    const [price, setPrice] = React.useState()
    const [detail, setDetail] = React.useState()
    const [toast, addToast] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [create, setCreate] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)
    const [sekansDesc, setSekansDesc] = React.useState()
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
        );
    };

    React.useEffect(() => {
        getSekanses()
    }, [])


    const getSekanses = () => {
        try {
            post('/api/admins/get-subscriptions').then((res) => {
                if (res.result) {
                    setPackages(res.subscriptions)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }

    const postUpdate = (name, description, time, price, detail) => {
        try {
            post('/api/admins/update-subscription', { id: pack.id, name, description, time, price, detail }).then((res) => {
                if (res.result) {
                    getSekanses()
                    setLoading(false)
                    setEdit(false)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }

    const postCreate = (name, description, time, price, detail) => {
        try {
            post('/api/admins/create-subscription', { name, description, time, price, detail }).then((res) => {
                if (res.result) {
                    getSekanses()
                    setLoading(false)
                    setCreate(false)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }

    const postDelete = () => {
        try {
            post('/api/admins/delete-subscription', { id: pack.id }).then((res) => {
                if (res.result) {
                    getSekanses()
                    setLoading(false)
                    setDeleteModal(false)
                }
            })
        } catch (e) {
            console.log('hata')
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
            ['emoji']
        ],
    };
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
        'emoji'
    ];
    //--------FOR EDITOR END------

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
                    Abonelik Paketi Oluştur
                </CButton>
            </CCol>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell className="text-center">Abonelik Adı</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Başlık</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Açıklama</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Süre(hafta)</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Fiyat(tl)</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Abone Sayısı</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {packages?.map((item, index) => {
                        return (
                            <CTableRow v-for="item in tableItems" key={index}>
                                {/* <CTableDataCell className="text-center">
                                    <img src={item?.image} alt='ikon' style={{ width: "50px", height: "50px" }} />
                                </CTableDataCell> */}
                                <CTableDataCell className="text-center">
                                    <div>{item?.name}</div>
                                </CTableDataCell>

                                <CTableDataCell style={{maxWidth:"300px"}} className="text-center">
                                    <div>{item?.description}</div>
                                </CTableDataCell>
                                <CTableDataCell style={{maxWidth:"600px"}} className="text-center">
                                    <div>{item?.detail}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item?.time} h</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item?.price} ₺</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item?.count}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CButton onClick={() => { setPack(item); setEdit(true) }}>Düzenle</CButton>
                                    <CButton
                                        style={{ marginTop: "10px" }}
                                        color="danger"
                                        onClick={() => {
                                            setPack(item)
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
                        minHeight: 800,
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

                        </div>

                        <CForm style={{ width: "50%" }}>
                            Abonelik Adı
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={pack?.name}
                                size="sm"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                            Başlık
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={pack?.description}
                                size="sm"
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />

                            Süre
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={pack?.time}
                                size="sm"
                                onChange={(e) => {
                                    setTime(e.target.value)
                                }}
                            />
                            Fiyat
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={pack?.price}
                                size="sm"
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                }}
                            />

                            <div style={{ marginTop: '20px' }}>
                                Açıklama
                                <ReactQuill
                                    theme="snow"
                                    defaultValue={pack?.detail}
                                    onChange={setDetail}
                                    modules={modules}
                                    formats={formats}
                                    style={{ width: '100%', height: '300px', marginTop: '10px' }}
                                />
                            </div>
                        </CForm>

                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "100px", marginBottom: "30px" }} onClick={() => {
                                postUpdate(
                                    name ? name : pack.name,
                                    description ? description : pack.description,
                                    time ? time : pack.time,
                                    price ? price : pack.price,
                                    detail ? detail : pack.detail,
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
                        minHeight: 800,
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

                        </div>

                        <CForm style={{ width: "50%" }}>
                            Abonelik Adı
                            <CFormInput
                                className="me-sm-2"
                                size="sm"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                            Başlık
                            <CFormInput
                                className="me-sm-2"
                                size="sm"
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />

                            Süre
                            <CFormInput
                                className="me-sm-2"
                                size="sm"
                                onChange={(e) => {
                                    setTime(e.target.value)
                                }}
                            />
                            Fiyat
                            <CFormInput
                                className="me-sm-2"
                                size="sm"
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                }}
                            />

                            <div style={{ marginTop: '20px' }}>
                                Açıklama
                                <ReactQuill
                                    theme="snow"
                                    onChange={setDetail}
                                    modules={modules}
                                    formats={formats}
                                    style={{ width: '100%', height: '300px', marginTop: '10px' }}
                                />
                            </div>
                        </CForm>

                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "100px", marginBottom: "30px" }} onClick={() => {
                                postCreate(
                                    name ? name : pack.name,
                                    description ? description : pack.description,
                                    time ? time : pack.time,
                                    price ? price : pack.price,
                                    detail ? detail : pack.detail,
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
                        minHeight: 800,
                        backgroundColor: "white",
                        paddingRight: "50px",
                        paddingTop: "50px",
                        borderRadius: 30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }} >


                        <CForm style={{ width: "50%" }}>
                            Abonelik Adı
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={pack?.name}
                                size="sm"
                                disabled={true}
                            />
                            Abonelik Süresi
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={pack?.time}
                                size="sm"
                                disabled={true}
                            />
                            Abonelik Fiyati
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={pack?.price}
                                size="sm"
                                disabled={true}
                            />
                        </CForm>

                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "100px", marginBottom: "30px" }} onClick={() => {
                                postDelete()
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
                    </div >
                    :
                    <></>
            }
        </>
    )
}

export default Sekans
