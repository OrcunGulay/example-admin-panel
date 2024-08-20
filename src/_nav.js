/* eslint-disable */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilCursor,
  cilDrop,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilWindowRestore,
  cilInfinity,
  cilColumns,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
const adm = localStorage.getItem('user')
const admin = JSON.parse(adm)
let _nav
if (admin?.degree == 1) {
  _nav = [
    {
      component: CNavItem,
      name: 'Ana Sayfa',
      to: '/dashboard',
      icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      component: CNavItem,
      name: 'Kullanıcılar',
      to: '/users',
      icon: <CIcon icon={cilInfinity} customClassName="nav-icon" />,
    },
     {
      component: CNavGroup,
      name: 'Bayii İşlemleri',
      icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Kategoriler',
          to: '/categories',
        },
        {
          component: CNavItem,
          name: 'Bayi İstatistik',
          to: '/statistics',
        },
        {
          component: CNavItem,
          name: 'Başvurular',
          to: '/dealerforms',
        },
        {
          component: CNavItem,
          name: 'Bayii/Doktor Oluştur',
          to: '/dealercreate',
        },
      ],
    },
    // {
    //   component: CNavItem,
    //   name: 'Bayiiler',
    //   to: '/categories',
    //   icon: <CIcon icon={cilInfinity} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Bayii/Doktor Oluştur',
    //   to: '/dealercreate',
    //   icon: <CIcon icon={cilInfinity} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Bayi İstatistik',
    //   to: '/statistics',
    //   icon: <CIcon icon={cilInfinity} customClassName="nav-icon" />,
    // },
    {
      component: CNavItem,
      name: 'Tüm Siparişler',
      to: '/allorders',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Abonelikler',
      to: '/subscriptions',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Aboneler',
      to: '/subscriptionsusers',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    // {
    //   component: CNavGroup,
    //   name: 'Tavsiyeler',
    //   icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Makaleler',
    //       to: '/affirmations',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Ürün Ekle',
    //       to: '/addproducts',
    //     },
    //   ],
    // },
    {
      component: CNavItem,
      name: 'Tavsiyeler',
      to: '/affirmations',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Ürünler',
      to: '/products',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Hakkımızda',
      to: '/aboutus',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Sözleşmeler',
      to: '/contracts',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
  ]
} else if (admin?.degree == 2) {
  _nav = [
    {
      component: CNavItem,
      name: 'Ana Sayfa',
      to: `/#/dealerhome/${admin?.dealerId}`,
      icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      component: CNavItem,
      name: 'Bayim',
      to: '/horoscopes',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Takvim',
      to: '/dealer/calendar',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Randevular',
      to: '/dealer/randevu',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Ürünlerim',
      to: '/dealer/myproducts',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Siparişlerim',
      to: '/dealer/myorders',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Teslim Edilenler',
      to: '/dealer/mycompletedorders',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
  ]
} else {
  _nav = [
    {
      component: CNavItem,
      name: 'Ana Sayfa',
      to: `/#/dealerhome/${admin?.dealerId}`,
      icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      component: CNavItem,
      name: 'Bayim',
      to: '/horoscopes',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Takvim',
      to: '/dealer/calendar',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Randevular',
      to: '/dealer/randevu',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
  ]
}
export default _nav
