/* eslint-disable */
import React from 'react'
import {
    CButton,
    CForm,
    CFormInput,
    CTableDataCell,
    CFormLabel,
    CFormTextarea,
    CToast,
    CToastHeader,
    CToastBody,
    CToaster,

} from '@coreui/react'
import { post } from 'src/networking/Server'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import Quill from 'quill';
import Emoji from 'quill-emoji';
import ClipLoader from "react-spinners/ClipLoader";


Quill.register('modules/emoji', Emoji);


const HoroscopeEdit = () => {
    const { horoscopeId } = useParams()
    const [horoscope, setHoroscope] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [features, setFeatures] = React.useState();
    const [manDesc, setManDesc] = React.useState();
    const [womanDesc, setWomanDesc] = React.useState();
    const [description, setDescription] = React.useState();
    const [name, setName] = React.useState();
    const [buttonNumber, setButtonNumber] = React.useState();
    const [selectedRImage, setSelectedRImage] = React.useState(null);
    const [imageRObject, setImageRObject] = React.useState(null);
    const [selectedOImage, setSelectedOImage] = React.useState(null);
    const [imageOObject, setImageOObject] = React.useState(null);
    const [selectedWImage, setSelectedWImage] = React.useState(null);
    const [imageWObject, setImageWObject] = React.useState(null);
    const [selectedDImage, setSelectedDImage] = React.useState(null);
    const [imageDObject, setImageDObject] = React.useState(null);
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
                if (buttonNumber == 1) {
                    setSelectedRImage(URL.createObjectURL(file));
                    setImageRObject(file);
                } else if (buttonNumber == 2) {
                    setSelectedWImage(URL.createObjectURL(file));
                    setImageWObject(file);
                } else if (buttonNumber == 3) {
                    setSelectedOImage(URL.createObjectURL(file));
                    setImageOObject(file);
                } else if (buttonNumber == 4) {
                    setSelectedDImage(URL.createObjectURL(file));
                    setImageDObject(file);
                }

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

    //FOR PAGE START INFO
    React.useEffect(() => {
        getUser(horoscopeId)
    }, [horoscopeId])
    //FOR GET HOROSCOPE INFO
    const getUser = (horoscopeId) => {
        try {
            post('/api/admin/horoscope-get', { horoscopeId }).then((res) => {
                if (res.result) {
                    setHoroscope(res.horoscope)
                    setFeatures(res.horoscope.features)
                    setManDesc(res.horoscope.manDescription)
                    setWomanDesc(res.horoscope.womanDescription)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }
    //FOR UPDATE HOROSCOPE INFO
    const updateHoroscope = (
        name,
        features,
        manDesc,
        womanDesc,
        description
    ) => {
        try {
            post('/api/admin/horoscope-update', {
                horoscopeId,
                name,
                features,
                manDesc,
                womanDesc,
                description
            }).then(async (res) => {
                if (res.result) {
                    addToast(exampleToast("Resim yükleniyor..."))

                    const formData = new FormData();
                    formData.append('image', imageRObject);
                    formData.append('fileName', `RedHoroscope/${horoscopeId}`);

                    const formData2 = new FormData();
                    formData2.append('image', imageWObject);
                    formData2.append('fileName', `WhiteHoroscape/${horoscopeId}`);

                    const formData3 = new FormData();
                    formData3.append('image', imageOObject);
                    formData3.append('fileName', `OrangeHoroscape/${horoscopeId}`);

                    const formData4 = new FormData();
                    formData4.append('image', imageDObject);
                    formData4.append('fileName', `DifferentHoroscape/${horoscopeId}`);

                    const response = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
                        method: 'POST',
                        headers: {
                            'x-access-token': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData,
                    });

                    const response2 = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
                        method: 'POST',
                        headers: {
                            'x-access-token': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData2,
                    });

                    const response3 = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
                        method: 'POST',
                        headers: {
                            'x-access-token': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData3,
                    });

                    const response4 = await fetch(`https://together-marmot-wealthy.ngrok-free.app/api/functions/upload`, {
                        method: 'POST',
                        headers: {
                            'x-access-token': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData4,
                    });

                    if (response.ok && response2.ok && response3.ok && response4.ok) {
                        const data = await response.json();
                        const data2 = await response2.json();
                        const data3 = await response3.json();
                        const data4 = await response4.json();

                        if (data.type == "success" && data2.type == "success" && data3.type == "success" && data4.type == "success") {
                            addToast(exampleToast("Eklendi"))
                            window.location.href = "../#/horoscopes"
                        } else {
                            addToast(exampleToast(data.error))
                        }
                    } else {
                        addToast(exampleToast("Bir sorun meydana geldi!"))
                    }
                    setLoading(false)
                }
            })
        } catch (e) {
            console.log('hata')
        }
    }

    return (
        <CForm style={{ backgroundColor: "white", padding: "50px" }}>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <div style={{
                alignSelf: "center",
                width: '70%',
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
            }} >
                <div style={{
                    width: '300px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <img src={selectedDImage ? selectedDImage : horoscope?.DifferentImage} alt="image" style={{ width: '200px', height: '200px' }} />
                    <CTableDataCell className="text-center">
                        <CFormInput
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            onClick={() => { setButtonNumber(4) }}
                        />
                    </CTableDataCell>
                </div>
                <div style={{
                    width: '300px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <img src={selectedRImage ? selectedRImage : horoscope?.RedImage} alt="image" style={{ width: '100px', height: '100px' }} />
                    <CTableDataCell className="text-center">
                        <CFormInput
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            onClick={() => { setButtonNumber(1) }}
                        />
                    </CTableDataCell>
                </div>
                <div style={{
                    width: '300px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <img src={selectedWImage ? selectedWImage : horoscope?.WhiteImage} alt="image" style={{ width: '100px', height: '100px' }} />
                    <CTableDataCell className="text-center">
                        <CFormInput
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            onClick={() => { setButtonNumber(2) }}
                        />
                    </CTableDataCell>
                </div>
                <div style={{
                    width: '300px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <img src={selectedOImage ? selectedOImage : horoscope?.OrangeImage} alt="image" style={{ width: '100px', height: '100px' }} />
                    <CTableDataCell className="text-center">
                        <CFormInput
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            onClick={() => { setButtonNumber(3) }}
                        />
                    </CTableDataCell>
                </div>
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
                    Burç Adı
                    <CFormInput
                        className="me-sm-2"
                        defaultValue={horoscope?.name}
                        size="sm"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </CForm>
            </div>

            <div style={{ marginTop: '20px' }}>
                Burç Özellikleri
                <ReactQuill
                    theme="snow"
                    value={features}
                    onChange={setFeatures}
                    modules={modules}
                    formats={formats}
                    style={{ width: '80%', height: '300px', marginTop: '10px' }}
                />
            </div>
            <br />
            <br />
            <br />
            <CForm style={{ width: "80%" }}>
                <CFormLabel htmlFor="exampleFormControlTextarea1">{horoscope?.name} Erkeği</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" defaultValue={horoscope?.manDescription} rows={3} onChange={(e) => {
                    setManDesc(e.target.value)
                }}></CFormTextarea>
                <br />
                <CFormLabel htmlFor="exampleFormControlTextarea1">{horoscope?.name} Kadını</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" defaultValue={horoscope?.womanDescription} rows={3}
                    onChange={(e) => {
                        setWomanDesc(e.target.value)
                    }}></CFormTextarea>
                <br />
                <CFormLabel htmlFor="exampleFormControlTextarea1">{horoscope?.name} Burcu Genel Özellikleri</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" defaultValue={horoscope?.description} rows={3}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}></CFormTextarea>
            </CForm>
            <CTableDataCell className="text-center">
                <CButton style={{ width: "200px", marginTop: "50px" }} onClick={() => {
                    updateHoroscope(
                        name ? name : horoscope.name,
                        features ? features : horoscope.features,
                        manDesc,
                        womanDesc,
                        description
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
        </CForm>
    )
}

export default HoroscopeEdit
