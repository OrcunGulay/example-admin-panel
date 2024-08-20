/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { post } from 'src/networking/Server'
import { myStore } from 'src'
import { useNavigate } from 'react-router-dom'

const Control = () => {
  const navigation = useNavigate()
  React.useEffect(() => {
    control()
  }, [])
  const control = () => {
    try {
      post('admin/token-control', { token: myStore.token }).then((res) => {
        // console.log('Token: ' + myStore.token)
        // console.log(res)
        if (res.result) {
          navigation('/home')
        } else {
          navigation('/login')
        }
      })
    } catch (e) {
      navigation('/login')
    }
  }

  return <a>Yükleniyor... Lütfen bekleyiniz.</a>
}
export default Control