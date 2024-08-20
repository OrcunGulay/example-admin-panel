/* eslint-disable */
import React from 'react'

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Password = React.lazy(() => import('./views/pages/login/Password'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DealerHome = React.lazy(() => import('./views/dashboard/Dealerhome'))
const Users = React.lazy(() => import('./views/pages/users/users'))
const UserEdit = React.lazy(() => import('./views/pages/users/userEdit'))
const UserAdd = React.lazy(() => import('./views/pages/users/userAdd'))
const UserBulk = React.lazy(() => import('./views/pages/users/userBulk'))
const Gifts = React.lazy(() => import('./views/pages/gifts/gifts'))
const PaymentTotal = React.lazy(() => import('./views/pages/gifts/paymentTotal'))
const Modes = React.lazy(() => import('./views/pages/modes/modes'))
const Rozets = React.lazy(() => import('./views/pages/rozets/rozets'))
const BootsPackages = React.lazy(() => import('./views/pages/bootsPackages/bootsPackages'))
const PremiumPackages = React.lazy(() => import('./views/pages/premiumPackages/premiumPackages'))
const SuperLikePackages = React.lazy(() => import('./views/pages/superLikePackages/superLikePackages'))
const JetonPackages = React.lazy(() => import('./views/pages/jetonsPackages/jetonPackages'))
const Bildirimler = React.lazy(() => import('./views/pages/notifications/notifications'))
const Horoscopes = React.lazy(() => import('./views/pages/dealer/horoscopes'))
const HoroscopeEdit = React.lazy(() => import('./views/pages/dealer/horoscopeEdit'))
const HoroscopeAdd = React.lazy(() => import('./views/pages/dealer/horoscopeAdd'))
const Subscriptions = React.lazy(() => import('./views/pages/sekans-affirmations/subscriptions'))
const SubscriptionsUsers = React.lazy(() => import('./views/pages/sekans-affirmations/subscriptionsusers'))
const Affirmations = React.lazy(() => import('./views/pages/sekans-affirmations/affirmations'))
const AddProducts = React.lazy(() => import('./views/pages/sekans-affirmations/addproduct'))
const Products = React.lazy(() => import('./views/pages/products/products'))
const PrdEdit = React.lazy(() => import('./views/pages/products/productsedit'))
const PrdCreate = React.lazy(() => import('./views/pages/products/productscreate'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Chances = React.lazy(() => import('./views/pages/chances/chances'))
const Dealers = React.lazy(() => import('./views/pages/dealers/dealers'))
const Statistics = React.lazy(() => import('./views/pages/dealers/statistics'))
const Categories = React.lazy(() => import('./views/pages/dealers/categories'))
const DealerCreate = React.lazy(() => import('./views/pages/dealers/dealercreate'))
const DealerForms = React.lazy(() => import('./views/pages/dealers/dealerforms'))
const Aboutus = React.lazy(() => import('./views/pages/dealers/aboutus'))
const Contracts = React.lazy(() => import('./views/pages/dealers/contracts'))
const DealerR = React.lazy(() => import('./views/pages/dealer/dealer_randevu'))
const Calendar = React.lazy(() => import('./views/pages/dealer/calendar'))
const Myproducts = React.lazy(() => import('./views/pages/dealer/myproducts'))
const AddMyProducts = React.lazy(() => import('./views/pages/dealer/addmyproduct'))
const MyOrders = React.lazy(() => import('./views/pages/dealer/myorders'))
const MyBlockedOrders = React.lazy(() => import('./views/pages/dealer/myblockedorders'))
const MyCompletedOrders = React.lazy(() => import('./views/pages/dealer/mycompletedorders'))
const PhrOrders = React.lazy(() => import('./views/pages/dealer/phrorders'))
const AllOrders = React.lazy(() => import('./views/pages/dealers/allorders'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/dealerhome/:dealerId', name: 'DealerHome', element: DealerHome },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/users', name: 'Users', element: Users, exact: true },
  { path: '/categories', name: 'Categories', element: Categories },
  { path: '/dealercreate', name: 'DealerCreate', element: DealerCreate },
  { path: '/dealerforms', name: 'Formlar', element: DealerForms },
  { path: '/allorders', name: 'Tüm Siparişler', element: AllOrders },
  { path: '/aboutus', name: 'Aboutus', element: Aboutus },
  { path: '/contracts', name: 'Contracts', element: Contracts },
  { path: '/statistics', name: 'İstatistik', element: Statistics },
  { path: '/categories/dealers/:categoriId', name: 'Dealers', element: Dealers },
  { path: '/user/edit/:userId', name: 'UserEdit', element: UserEdit },
  { path: '/user/add', name: 'UserAdd', element: UserAdd },
  { path: '/user/bulkuser', name: 'UserBulk', element: UserBulk },
  { path: '/gifts', name: 'Gifts', element: Gifts },
  { path: '/paymentTotal', name: 'PaymentTotal', element: PaymentTotal },
  { path: '/login', name: 'login', element: Login },
  { path: '/password', name: 'password', element: Password },
  { path: '/rozets', name: 'Rozets', element: Rozets },
  { path: '/modes', name: 'Modes', element: Modes },
  { path: '/boots', name: 'BootsPackages', element: BootsPackages },
  { path: '/premium', name: 'PremiumPackages', element: PremiumPackages },
  { path: '/chances', name: 'Chances', element: Chances },
  { path: '/super-like', name: 'SuperLikePackages', element: SuperLikePackages },
  { path: '/jetons', name: 'JetonPackages', element: JetonPackages },
  { path: '/bildirimler', name: 'Bildirimler', element: Bildirimler },
  { path: '/horoscopes', name: 'Horoscopes', element: Horoscopes },
  { path: '/dealer/randevu', name: 'DealerR', element: DealerR },
  { path: '/dealer/calendar', name: 'Takvimi', element: Calendar },
  { path: '/dealer/myproducts', name: 'Ürünlerim', element: Myproducts },
  { path: '/dealer/addmyproducts', name: 'Ürün Ekle', element: AddMyProducts },
  { path: '/dealer/myorders', name: 'Siparişlerim', element: MyOrders },
  { path: '/dealer/phrorders', name: 'Reçete Siparişleri', element: PhrOrders },
  { path: '/dealer/myblockedorders', name: 'İptal, İade, Red', element: MyBlockedOrders },
  { path: '/dealer/mycompletedorders', name: 'Teslim Edilenler', element: MyCompletedOrders },
  { path: '/horoscope/edit/:horoscopeId', name: 'HoroscopeEdit', element: HoroscopeEdit },
  { path: '/horoscope/add', name: 'HoroscopeAdd', element: HoroscopeAdd },
  { path: '/subscriptions', name: 'Abonelikler', element: Subscriptions },
  { path: '/subscriptionsusers', name: 'Abonelikler', element: SubscriptionsUsers },
  { path: '/affirmations', name: 'Tavsiyeler', element: Affirmations },
  { path: '/addproducts/:id', name: 'AddProducts', element: AddProducts },
  { path: '/products', name: 'Ürünler', element: Products },
  { path: '/products/edit/:item', name: 'Ürün-Düzenle', element: PrdEdit },
  { path: '/products/create', name: 'Ürün-Oluştur', element: PrdCreate },
]

export default routes
