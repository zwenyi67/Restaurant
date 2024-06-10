import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import NotFound from './pages/ErrorPage/NotFound'
import GuestLayout from './layouts/GuestLayout'
import AdminLayout from './layouts/AdminLayout'
import PolicyPage from './pages/Policy/PolicyPage'
import Admin from './pages/admin/Admin'
import Waiter from './pages/waiter/Waiter'
import WaiterLayout from './layouts/WaiterLayout'
import Suppliers from './pages/admin/suppliers/Suppliers'
import SupplierCreate from './pages/admin/suppliers/SupplierCreate'
import Employees from './pages/admin/employees/Employees'
import EmployeeAdd from './pages/admin/employees/EmployeeAdd'
import SupplierEdit from './pages/admin/suppliers/SupplierEdit'
import Menus from './pages/admin/menus/Menus'
import MenuCreate from './pages/admin/menus/MenuCreate'
import MenuEdit from './pages/admin/menus/MenuEdit'
import WaiterMenus from './pages/waiter/WaiterMenus'
import { OrderProvider } from './contexts/OrderProvider'
import Order from './pages/waiter/Order'
import MenuTypes from './pages/admin/menu_types/MenuTypes'
import Tables from './pages/admin/tables/Tables'

function Router() {

    return (
        <>
            <BrowserRouter>
            <OrderProvider>
                <Routes>
                    <Route element={<GuestLayout/>}>
                        <Route path='/' element={<PolicyPage/>} />
                        <Route path='/login' element={<Login />} />
                    </Route>

                    {/* Admin Layout Section */}
                    <Route element={<AdminLayout/>}>
                        <Route path='/admin' element={<Admin />} />

                        {/* Route for Employees */}
                        <Route path='/admin/employees' element={<Employees/>} />
                        <Route path='/admin/employees/add' element={<EmployeeAdd/>} />

                        {/* Route for Suppliers */}
                        <Route path='/admin/suppliers' element={<Suppliers/>} />
                        <Route path='/admin/suppliers/create' element={<SupplierCreate/>} />
                        <Route path='/admin/suppliers/:id/edit' element={<SupplierEdit/>} />

                        {/* Route for Menu Types */}
                        <Route path='/admin/menu_types' element={<MenuTypes/>} />
                        <Route path='/admin/menus/create' element={<MenuCreate/>} />
                        <Route path='/admin/menus/:id/edit' element={<MenuEdit/>} />

                        {/* Route for Menus */}
                        <Route path='/admin/menus' element={<Menus/>} />
                        <Route path='/admin/menus/create' element={<MenuCreate/>} />
                        <Route path='/admin/menus/:id/edit' element={<MenuEdit/>} />
                        
                        {/* Route for Tables */}
                        <Route path='/admin/tables' element={<Tables/>} />
                        <Route path='/admin/menus/create' element={<MenuCreate/>} />
                        <Route path='/admin/menus/:id/edit' element={<MenuEdit/>} />
                    </Route>

                    {/* Waiter Layout Section */}
                    <Route element={<WaiterLayout/>}>
                        <Route path='/waiter' element={<Waiter/>} />
                        <Route path='/waiter/tables/:id/order' element={<Order/>}/>

                    </Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
                </OrderProvider>
            </BrowserRouter>
        </>
    )

}

export default Router;