/* eslint-disable */
import React, { Component } from 'react'
import {
  CAvatar,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCol,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CFormInput,
} from '@coreui/react'
import { post } from 'src/networking/Server'
import { cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import 'react-quill/dist/quill.snow.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Horoscopes = () => {
  const admin = JSON.parse(localStorage.getItem('user'))
  const [meetH, setMeetH] = React.useState()
  const [waiting, setWaiting] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [date, setDate] = React.useState(new Date())
  const [trh, setTrh] = React.useState()
  const [foundItem, setFoundItem] = React.useState()
  const [hours, setHours] = React.useState([])
  const yearX = date.getFullYear()
  const monthX = String(date.getMonth() + 1).padStart(2, '0') // Ayın başında sıfır ekleme
  const dayX = String(date.getDate()).padStart(2, '0') // Günün başında sıfır ekleme
  const dateX = `${yearX}-${monthX}-${dayX}`
  const handleDateChange = (newDate) => {
    const year = newDate.getFullYear()
    const month = String(newDate.getMonth() + 1).padStart(2, '0') // Ayın başında sıfır ekleme
    const day = String(newDate.getDate()).padStart(2, '0') // Günün başında sıfır ekleme
    const formattedDate = `${year}-${month}-${day}`
    setDate(newDate)
    setTrh(formattedDate)
    if (meetH.find((item) => item.date === formattedDate)) {
      setHours(meetH.find((item) => item.date === formattedDate)?.values)
    } else {
      setHours([])
    }
  }

  const handleReload = () => {
    setWaiting(true)
    setTimeout(() => {
      window.location.reload()
    }, 500) // 2000 milisaniye (2 saniye) bekleyecek
  }

  React.useEffect(() => {
    getInfo()
  }, [])
  const getInfo = () => {
    try {
      post('/api/admins/get-dealer', { dealerId: admin?.dealerId }).then((res) => {
        if (res.result) {
          setMeetH(res.dealer.meetHours ? JSON.parse(res.dealer.meetHours) : [])
          if (JSON.parse(res.dealer.meetHours).find((item) => item.date === dateX)) {
            setHours(JSON.parse(res.dealer.meetHours).find((item) => item.date === dateX)?.values)
          } else {
            setHours([])
          }
          setTrh(dateX)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }

  const postHour = (bool, hour) => {
    try {
      post('/api/admins/post-hour', { dealerId: admin?.dealerId, trh, bool, hour }).then((res) => {
        handleReload()
        if (res.result) {
          setLoading(false)
          setWaiting(false)
        }
      })
    } catch (e) {
      console.log('hata')
    }
  }
  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column-reverse' }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: 20,
            margin: '10px',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          Randevu Saatleri
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <div>
              <p>Seçilen Tarih: {date.toLocaleDateString()}</p>
              <Calendar onChange={handleDateChange} value={date} />
            </div>
            {admin?.degree === 3 ? (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  maxWidth: '50%',
                  justifyContent: 'flex-start',
                  marginTop: '50px',
                }}
              >
                {/* HOUR 1 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[0] == 2
                          ? 'yellow'
                          : hours[0] == 1
                          ? '#4DE5B9'
                          : hours[0] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    08.00
                  </div>
                </div>
                {/* HOUR 2 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[1] == 2
                          ? 'yellow'
                          : hours[1] == 1
                          ? '#4DE5B9'
                          : hours[1] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    08.30
                  </div>
                </div>
                {/* HOUR 3 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[2] == 2
                          ? 'yellow'
                          : hours[2] == 1
                          ? '#4DE5B9'
                          : hours[2] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    09.00
                  </div>
                </div>
                {/* HOUR 4 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[3] == 2
                          ? 'yellow'
                          : hours[3] == 1
                          ? '#4DE5B9'
                          : hours[3] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    09.30
                  </div>
                </div>
                {/* H0UR 5 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[4] == 2
                          ? 'yellow'
                          : hours[4] == 1
                          ? '#4DE5B9'
                          : hours[4] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    10.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[5] == 2
                          ? 'yellow'
                          : hours[5] == 1
                          ? '#4DE5B9'
                          : hours[5] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    10.30
                  </div>
                </div>

                {/* HOUR 1 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[6] == 2
                          ? 'yellow'
                          : hours[6] == 1
                          ? '#4DE5B9'
                          : hours[6] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    11.00
                  </div>
                </div>
                {/* HOUR 2 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[7] == 2
                          ? 'yellow'
                          : hours[7] == 1
                          ? '#4DE5B9'
                          : hours[7] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    11.30
                  </div>
                </div>
                {/* HOUR 3 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[8] == 2
                          ? 'yellow'
                          : hours[8] == 1
                          ? '#4DE5B9'
                          : hours[8] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    12.00
                  </div>
                </div>
                {/* HOUR 4 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[9] == 2
                          ? 'yellow'
                          : hours[9] == 1
                          ? '#4DE5B9'
                          : hours[9] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    12.30
                  </div>
                </div>
                {/* H0UR 5 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[10] == 2
                          ? 'yellow'
                          : hours[10] == 1
                          ? '#4DE5B9'
                          : hours[10] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    13.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[11] == 2
                          ? 'yellow'
                          : hours[11] == 1
                          ? '#4DE5B9'
                          : hours[11] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    13.30
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[12] == 2
                          ? 'yellow'
                          : hours[12] == 1
                          ? '#4DE5B9'
                          : hours[12] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    14.00
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[13] == 2
                          ? 'yellow'
                          : hours[13] == 1
                          ? '#4DE5B9'
                          : hours[13] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    14.30
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[14] == 2
                          ? 'yellow'
                          : hours[14] == 1
                          ? '#4DE5B9'
                          : hours[14] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    15.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[15] == 2
                          ? 'yellow'
                          : hours[15] == 1
                          ? '#4DE5B9'
                          : hours[15] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    15.30
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[16] == 2
                          ? 'yellow'
                          : hours[16] == 1
                          ? '#4DE5B9'
                          : hours[16] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    16.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[17] == 2
                          ? 'yellow'
                          : hours[17] == 1
                          ? '#4DE5B9'
                          : hours[17] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    16.30
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[18] == 2
                          ? 'yellow'
                          : hours[18] == 1
                          ? '#4DE5B9'
                          : hours[18] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    17.00
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[19] == 2
                          ? 'yellow'
                          : hours[19] == 1
                          ? '#4DE5B9'
                          : hours[19] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    17.30
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[20] == 2
                          ? 'yellow'
                          : hours[20] == 1
                          ? '#4DE5B9'
                          : hours[20] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    18.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[21] == 2
                          ? 'yellow'
                          : hours[21] == 1
                          ? '#4DE5B9'
                          : hours[21] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    18.30
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[22] == 2
                          ? 'yellow'
                          : hours[22] == 1
                          ? '#4DE5B9'
                          : hours[22] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    19.00
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[23] == 2
                          ? 'yellow'
                          : hours[23] == 1
                          ? '#4DE5B9'
                          : hours[23] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    19.30
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[24] == 2
                          ? 'yellow'
                          : hours[24] == 1
                          ? '#4DE5B9'
                          : hours[24] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    20.00
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[25] == 2
                          ? 'yellow'
                          : hours[25] == 1
                          ? '#4DE5B9'
                          : hours[25] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    20.30
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[26] == 2
                          ? 'yellow'
                          : hours[26] == 1
                          ? '#4DE5B9'
                          : hours[26] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    21.00
                  </div>
                </div>

                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[27] == 2
                          ? 'yellow'
                          : hours[27] == 1
                          ? '#4DE5B9'
                          : hours[27] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    21.30
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  maxWidth: '50%',
                  justifyContent: 'flex-start',
                  marginTop: '50px',
                }}
              >
                {/* HOUR 1 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[0] == 2
                          ? 'yellow'
                          : hours[0] == 1
                          ? '#4DE5B9'
                          : hours[0] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    10.00
                  </div>
                </div>
                {/* HOUR 2 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[1] == 2
                          ? 'yellow'
                          : hours[1] == 1
                          ? '#4DE5B9'
                          : hours[1] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    10.30
                  </div>
                </div>
                {/* HOUR 3 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[2] == 2
                          ? 'yellow'
                          : hours[2] == 1
                          ? '#4DE5B9'
                          : hours[2] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    11.00
                  </div>
                </div>
                {/* HOUR 4 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[3] == 2
                          ? 'yellow'
                          : hours[3] == 1
                          ? '#4DE5B9'
                          : hours[3] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    11.30
                  </div>
                </div>
                {/* H0UR 5 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[4] == 2
                          ? 'yellow'
                          : hours[4] == 1
                          ? '#4DE5B9'
                          : hours[4] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    12.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[5] == 2
                          ? 'yellow'
                          : hours[5] == 1
                          ? '#4DE5B9'
                          : hours[5] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    12.30
                  </div>
                </div>

                {/* HOUR 1 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[6] == 2
                          ? 'yellow'
                          : hours[6] == 1
                          ? '#4DE5B9'
                          : hours[6] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    13.00
                  </div>
                </div>
                {/* HOUR 2 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[7] == 2
                          ? 'yellow'
                          : hours[7] == 1
                          ? '#4DE5B9'
                          : hours[7] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    13.30
                  </div>
                </div>
                {/* HOUR 3 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[8] == 2
                          ? 'yellow'
                          : hours[8] == 1
                          ? '#4DE5B9'
                          : hours[8] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    14.00
                  </div>
                </div>
                {/* HOUR 4 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[9] == 2
                          ? 'yellow'
                          : hours[9] == 1
                          ? '#4DE5B9'
                          : hours[9] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    14.30
                  </div>
                </div>
                {/* H0UR 5 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[10] == 2
                          ? 'yellow'
                          : hours[10] == 1
                          ? '#4DE5B9'
                          : hours[10] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    15.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[11] == 2
                          ? 'yellow'
                          : hours[11] == 1
                          ? '#4DE5B9'
                          : hours[11] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    15.30
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[12] == 2
                          ? 'yellow'
                          : hours[12] == 1
                          ? '#4DE5B9'
                          : hours[12] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    16.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[13] == 2
                          ? 'yellow'
                          : hours[13] == 1
                          ? '#4DE5B9'
                          : hours[13] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    16.30
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[14] == 2
                          ? 'yellow'
                          : hours[14] == 1
                          ? '#4DE5B9'
                          : hours[14] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    17.00
                  </div>
                </div>
                {/* HOUR 6 */}
                <div style={{ margin: '10px' }}>
                  <div
                    style={{
                      color: 'black',
                      width: '60px',
                      height: '50px',
                      backgroundColor: hours
                        ? hours[15] == 2
                          ? 'yellow'
                          : hours[15] == 1
                          ? '#4DE5B9'
                          : hours[15] == 0
                          ? 'gray'
                          : '#4DE5B9'
                        : '#4DE5B9',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    17.30
                  </div>
                </div>
              </div>
            )}
          </div>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              Yanda gösterilen saatler açık, kapalı ve randevu durumunuzu sadece görüntülemektedir.
              <br />
              <br />
              <p style={{ color: '#ffdf00' }}> "Sarı renk randevu alındığını ifade eder." </p>
              <p style={{ color: '#4DE5B9' }}> "Yeşil renk açık saati ifade eder."</p>
              <p style={{ color: 'gray' }}> "Gri renk kapalı saati ifade eder."</p>
              <div style={{ fontFamily: 'bold', color: 'red', fontSize: 18 }}>
                {' '}
                !! Takvimde seçili güne ait randevu saatlerinizi aşağıdaki butonlardan açıp
                kapatabilirsiniz.
              </div>
              <CTableRow>
                <CTableHeaderCell className="text-center">Tarih</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Saat</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {admin?.degree === 3 ? (
              <>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">08.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[0] == 0 || hours[0] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 0)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 0)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">08.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[1] == 0 || hours[1] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 1)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 1)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">09.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[2] == 0 || hours[2] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 2)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 2)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">09.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[3] == 0 || hours[3] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 3)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 3)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">10.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[4] == 0 || hours[4] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 4)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 4)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">10.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[5] == 0 || hours[5] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 5)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 5)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">11.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[6] == 0 || hours[6] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 6)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 6)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">11.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[7] == 0 || hours[7] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 7)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 7)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">12.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[8] == 0 || hours[8] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 8)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 8)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">12.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[9] == 0 || hours[9] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 9)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 9)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">13.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[10] == 0 || hours[10] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 10)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 10)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">13.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[11] == 0 || hours[11] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 11)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 11)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>

                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">14.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[12] == 0 || hours[12] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 12)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 12)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">14.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[13] == 0 || hours[13] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 13)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 13)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">15.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[14] == 0 || hours[14] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 14)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 14)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">15.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[15] == 0 || hours[15] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 15)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 15)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">16.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[16] == 0 || hours[16] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 16)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 16)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">16.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[17] == 0 || hours[17] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 17)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 17)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">17.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[18] == 0 || hours[18] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 18)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 18)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">17.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[19] == 0 || hours[19] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 19)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 19)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">18.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[20] == 0 || hours[20] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 20)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 20)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">18.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[21] == 0 || hours[21] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 21)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 21)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">19.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[22] == 0 || hours[22] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 22)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 22)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">19.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[23] == 0 || hours[23] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 23)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 23)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>

                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">20.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[24] == 0 || hours[24] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 24)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 24)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">20.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[25] == 0 || hours[25] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 25)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 25)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">21.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[26] == 0 || hours[26] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 26)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 26)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">21.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[27] == 0 || hours[27] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 27)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 27)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </>
            ) : (
              <>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">10.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[0] == 0 || hours[0] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 0)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 0)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">10.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[1] == 0 || hours[1] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 1)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 1)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">11.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[2] == 0 || hours[2] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 2)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 2)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">11.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[3] == 0 || hours[3] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 3)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 3)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">12.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[4] == 0 || hours[4] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 4)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 4)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">12.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[5] == 0 || hours[5] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 5)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 5)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">13.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[6] == 0 || hours[6] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 6)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 6)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">13.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[7] == 0 || hours[7] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 7)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 7)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">14.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[8] == 0 || hours[8] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 8)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 8)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">14.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[9] == 0 || hours[9] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 9)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 9)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">15.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[10] == 0 || hours[10] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 10)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 10)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">15.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[11] == 0 || hours[11] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 11)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 11)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>

                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">16.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[12] == 0 || hours[12] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 12)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 12)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">16.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[13] == 0 || hours[13] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 13)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 13)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>

                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">17.00</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[14] == 0 || hours[14] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 14)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 14)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center">
                      {date ? date.toLocaleDateString() : ''}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">17.30</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {hours[15] == 0 || hours[15] == 2 ? (
                        <CButton disabled={waiting} color="success" onClick={() => postHour(1, 15)}>
                          Aç
                        </CButton>
                      ) : (
                        <CButton
                          disabled={waiting}
                          color="secondary"
                          onClick={() => postHour(0, 15)}
                        >
                          Kapat
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </>
            )}
          </CTable>
        </div>
      </div>
    </>
  )
}
export default Horoscopes
