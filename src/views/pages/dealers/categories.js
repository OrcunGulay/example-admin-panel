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
    CToast,
    CToastHeader,
    CToastBody,
    CToaster,
    CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { post } from 'src/networking/Server'
import { cilPeople } from '@coreui/icons'
import closeImage from "../../../assets/images/close.png";
import ClipLoader from "react-spinners/ClipLoader";
<script src="src\components\script.html"></script>


const Users = () => {
    const [dealers, setDealers] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [subCategories, setSubCategories] = React.useState([])
    const [agree, setAgree] = React.useState([])
    const [toast, addToast] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [name, setName] = React.useState()
    const [subName, setSubName] = React.useState()
    const [newCate, setNewCate] = React.useState()
    const [cate, setCate] = React.useState()
    const toaster = React.useRef()

    const agress = (params) => {
        if (agree.includes(params)) {
            let b = agree;
            let yer = agree.indexOf(params);
            b.splice(yer, 1);
            setAgree(b);
            addToast(exampleToast("bir."))
        } else {
            let a = agree;
            a.push(params);
            setAgree(a);
            addToast(exampleToast("iki."))
        }
        return agree;
    };
    console.log(agree)
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
                    <div className="fw-bold me-auto"></div>
                </CToastHeader>
                <CToastBody>{info}</CToastBody>
            </CToast>
        );
    };
    React.useEffect(() => {
        getDealers()
    }, [])
    const getDealers = () => {
        try {
            post('/api/admins/dealers-categories').then((res) => {
                if (res.result) {
                    setCategories(res.categories)
                    setSubCategories(res.subCategories)
                }
                else {
                    addToast(exampleToast("Bir şeyler Ters Gitti."))
                }
            })

        } catch (e) {
            console.log('hata')
        }

    }

    const postDealer = (id, name, agree, newCate) => {
        try {
            post('/api/admins/update-categorie', { id, name, agree, newCate }).then((res) => {
                if (res.result) {
                    setLoading(false)
                    setEdit(false)
                    getDealers()
                    setNewCate()
                    setAgree([])
                    setName()
                }
                else {
                    addToast(exampleToast("Bir şeyler Ters Gitti."))
                }
            })

        } catch (e) {
            console.log('hata')
        }

    }
    const postSubC = (id, subName) => {
        try {
            post('/api/admins/update-subc', { id, subName }).then((res) => {
                if (res.result) {
                    if (subName) {
                        addToast(exampleToast("Alt Kategori Güncellendi."))
                    }
                    else {
                        addToast(exampleToast("Alt Kategori Silindi."))
                    }
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }
                else {
                    addToast(exampleToast("Bir şeyler Ters Gitti."))
                }
            })

        } catch (e) {
            console.log('hata')
        }

    }


    return (
        <>
            <CToaster ref={toaster} push={toast} placement="top-end" />

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {categories?.map((item, index) => (
                    <div style={{ margin: '10px', width: '100%', display: "flex", flexDirection: "column", alignItems: "center", }}
                    >
                        <div
                            style={{ cursor: "pointer", border: '1px solid #ccc', padding: '10px', borderRadius: 20, width: '100%', backgroundColor: index % 2 == 0 ? "#85B9DE" : "#4DE5B9" }}
                            onClick={() => window.location.href = `../#/categories/dealers/${item.id}`} // Öğe tıklandığında handleCategoryClick fonksiyonunu çağır
                        >
                            <h3 style={{ color: "white" }}>{item?.name}</h3>
                            <h6>({item?.dealerCount} Bayii)</h6>
                            {subCategories?.map(itemsub => (
                                itemsub?.meetingId == item.id ?
                                    <p style={{ color: "white" }}> - {itemsub?.name}</p>
                                    : <></>
                            ))
                            }
                        </div>
                        <CButton onClick={() => {
                            setAgree([])
                            setCate(item);
                            setEdit(true);
                        }} style={{ marginTop: "10px" }}>
                            Düzenle
                        </CButton>

                    </div>
                ))}
            </div>
            <h3 style={{ color: "black" }}>Tüm Alt Kategoriler</h3>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell className="text-center">Alt Kategori</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Düzenle</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Sil</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {subCategories?.map((item, index) => {
                        return (
                            <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                    <CFormInput
                                        className="me-sm-2"
                                        defaultValue={item?.name}
                                        size="sm"
                                        onChange={(e) => {
                                            setSubName(e.target.value)
                                        }}
                                    />
                                </CTableDataCell>

                                <CTableDataCell className="text-center">
                                    <CButton onClick={() => {
                                        postSubC(item.id, subName ? subName : item.name)
                                    }}  >Düzenle
                                    </CButton>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CButton
                                        color="danger"
                                        onClick={() => {
                                            postSubC(item?.id)
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

                        <CForm style={{ width: "80%" }}>
                            Kategori Adı
                            <CFormInput
                                className="me-sm-2"
                                defaultValue={cate?.name}
                                size="sm"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                            Alt Kategorileri
                            <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "100%", justifyContent: "flex-start" }}>
                                {subCategories?.map((itemsub) => (
                                    itemsub?.meetingId == cate.id ?
                                        <div
                                            onClick={() => {
                                                agress(itemsub?.id);
                                            }}
                                            style={{ cursor: "pointer", color: "black", flexBasis: "calc(25% - 20px)", margin: "10px", padding: "10px 0px", backgroundColor: agree.includes(itemsub.id) == true ? "white" : "#77EBCA", border: '1px solid #ccc', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            {itemsub?.name}
                                        </div>
                                        :
                                        <div
                                            onClick={() => {
                                                agress(itemsub?.id);
                                            }}
                                            style={{ cursor: "pointer", color: "black", flexBasis: "calc(25% - 20px)", margin: "10px", padding: "10px 0px", backgroundColor: agree.includes(itemsub.id) == true ? "red" : "white", border: '1px solid #ccc', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            {itemsub?.name}
                                        </div>
                                )
                                )
                                }

                                <CFormInput
                                    style={{ color: "black", flexBasis: "calc(25% - 20px)", margin: "10px", padding: "10px 0px", backgroundColor: "white", border: '1px solid #ccc', textAlign: "center" }}
                                    className="me-sm-2"
                                    defaultValue={"Yeni Kategori Adı"}
                                    size="sm"
                                    onChange={(e) => {
                                        setNewCate(e.target.value)
                                    }}
                                />
                            </div>


                        </CForm>

                        <CTableDataCell className="text-center">
                            <CButton style={{ width: "200px", marginTop: "100px", marginBottom: "30px" }} onClick={() => {
                                postDealer(cate?.id, name ? name : cate.name, agree, newCate)
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
                    </div >
                    :
                    <></>
            }
        </>
    )
}
export default Users

