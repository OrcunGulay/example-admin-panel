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
import closeImage from '../../../assets/images/close.png'
import ClipLoader from 'react-spinners/ClipLoader'
import image from '../../../assets/images/image.png'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'
import Quill from 'quill'
import Emoji from 'quill-emoji'

Quill.register('modules/emoji', Emoji)

const Sekans = () => {
  const [contracts, setContracts] = React.useState()
  const [content1, setContent1] = React.useState('')
  const [content2, setContent2] = React.useState('')
  const [content3, setContent3] = React.useState('')
  const [content4, setContent4] = React.useState('')
  const [loading, setLoading] = React.useState(false)
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
        <CToastBody>{info}</CToastBody>
      </CToast>
    )
  }
  React.useEffect(() => {
    getAbout()
  }, [])

  const getAbout = () => {
    try {
      post('/api/admins/get-contracts').then((res) => {
        if (res.result) {
          setContracts(res.contracts)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const postAbout = (content, id) => {
    try {
      post('/api/admins/post-contract', { content, id }).then((res) => {
        if (res.result) {
          addToast(exampleToast('Sözleşme güncellendi.'))
          setLoading(false)
        }
      })
    } catch (e) {
      console.log('hata')
      setLoading(false)
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
      ['emoji'],
    ],
  }
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
    'emoji',
  ]
  //--------FOR EDITOR END------

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CForm style={{ width: '100%' }}>
        {contracts?.map((item, index) => {
          return (
            <>
              <div style={{ marginTop: 40 }}> {item?.name}</div>
              <ReactQuill
                key={index}
                theme="snow"
                defaultValue={item?.content}
                onChange={
                  index == 0
                    ? setContent1
                    : index == 1
                    ? setContent2
                    : index == 2
                    ? setContent3
                    : index == 3
                    ? setContent4
                    : setContent1
                }
                modules={modules}
                formats={formats}
                style={{ width: '100%', height: '300px', marginTop: '10px' }}
              />
              <CButton
                style={{ width: '200px', marginTop: '100px', marginBottom: '30px' }}
                onClick={() => {
                  postAbout(
                    index == 0
                      ? content1
                      : index == 1
                      ? content2
                      : index == 2
                      ? content3
                      : index == 3
                      ? content4
                      : content1,
                    item?.id,
                  )
                  setLoading(true)
                }}
              >
                {loading == true ? (
                  <ClipLoader
                    color={'white'}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  'Güncelle'
                )}
              </CButton>
            </>
          )
        })}
      </CForm>
    </>
  )
}

export default Sekans
