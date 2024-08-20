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
  const [about, setAbout] = React.useState()
  const [newAbout, setNewAbout] = React.useState()
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
  console.log(about)
  React.useEffect(() => {
    getAbout()
  }, [])

  const getAbout = () => {
    try {
      post('/api/admins/get-aboutus').then((res) => {
        if (res.result) {
          setAbout(res.aboutus)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  const postAbout = () => {
    try {
      post('/api/admins/post-aboutus', { newAbout: newAbout ?? about.content }).then((res) => {
        if (res.result) {
          addToast(exampleToast('Hakkımızda yazısı güncellendi. Yönlendiriliyorsunuz.'))
          setLoading(false)
          setTimeout(() => {
            window.location.href = `#/dashboard`
          },1000)
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
        {about ? (
          <ReactQuill
            theme="snow"
            defaultValue={about?.content}
            onChange={setNewAbout}
            modules={modules}
            formats={formats}
            style={{ width: '100%', height: '300px', marginTop: '10px' }}
          />
        ) : (
          <ClipLoader
            color={'blue'}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </CForm>

      <CTableDataCell className="text-center">
        <CButton
          style={{ width: '200px', marginTop: '100px', marginBottom: '30px' }}
          onClick={() => {
            postAbout()
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
      </CTableDataCell>
    </>
  )
}

export default Sekans
