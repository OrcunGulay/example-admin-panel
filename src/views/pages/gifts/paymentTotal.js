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
import ClipLoader from "react-spinners/ClipLoader";




const Gifts = () => {
    const [paymentTotal, setPaymentTotal] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [toast, addToast] = React.useState(0)
    const toaster = React.useRef()
    const exampleToast = (
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
            <CToastBody>Ücret Alma sınırı güncellendi.</CToastBody>
        </CToast>
    )


    const handleReload = () => {
        setTimeout(() => {
            window.location.reload()
        }, 2000) // 2000 milisaniye (2 saniye) bekleyecek
    }

    React.useEffect(() => {
        getGifts()
    }, [])
    const getGifts = () => {
        try {
            post('/api/admin/gifts').then((res) => {
                if (res.result) {
                    setPaymentTotal(res.paymentTotal)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    const updateGift = (paymentTotal) => {
        try {
            post('/api/admin/gift-payment-update', {
                paymentTotal,
            }).then((res) => {
                if (res.result) {
                    setLoading(false)
                    addToast(exampleToast)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    return (
        <>
            <CCol xs={6}>
                <CForm style={{ width: "100%" }}>
                    Hediye Ödeme Alma Sınırı
                    <CFormInput
                        className="me-sm-2"
                        style={{ marginTop: "20px" }}
                        defaultValue={paymentTotal}
                        size="sm"
                        onChange={(e) => {
                            setPaymentTotal(e.target.value)
                        }}
                    />
                    <CToaster ref={toaster} push={toast} placement="top-end" />
                    <CTableDataCell className="text-center">
                        <CButton style={{ width: "200px", marginTop: "10px", marginBottom: "30px" }} onClick={() => {
                            updateGift(paymentTotal)
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
                </CForm>
            </CCol>
        </>
    )
}

export default Gifts
