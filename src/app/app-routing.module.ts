import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuard } from './security/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      //{ path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./developer/home/home.module').then(m => m.HomeModule) },
      { path: 'company', loadChildren: () => import('./developer/configuration/company/company.module').then(m => m.CompanyModule) },
      { path: 'sucursal', loadChildren: () => import('./developer/configuration/sucursal/sucursal.module').then(m => m.SucursalModule) },
      { path: 'staff', loadChildren: () => import('./developer/configuration/staff/staff.module').then(m => m.StaffModule) },
      { path: 'workstation', loadChildren: () => import('./developer/configuration/workstation/workstation.module').then(m => m.WorkstationModule) },
      { path: 'client', loadChildren: () => import('./developer/client/client.module').then(m => m.ClientModule) },
      { path: 'methods', loadChildren: () => import('./developer/catalogue/methods/methods.module').then(m => m.MethodsModule) },
      { path: 'quotes', loadChildren: () => import('./developer/sales_quotes/quotes/quotes.module').then(m => m.QuotesModule) },
      { path: 'sales', loadChildren: () => import('./developer/sales_quotes/sales/sales.module').then(m => m.SalesModule) },
      { path: 'listsales', loadChildren: () => import('./developer/sales_quotes/listsales/listsales.module').then(m => m.ListsalesModule) },
      { path: 'rproducts', loadChildren: () => import('./developer/sales_quotes/rproducts/rproducts.module').then(m => m.RproductsModule) },
      { path: 'listporders', loadChildren: () => import('./developer/purchases/listporders/listporders.module').then(m => m.ListpordersModule) },
      { path: 'supplier', loadChildren: () => import('./developer/catalogue/supplier/supplier.module').then(m => m.SupplierModule) },
      { path: 'classification', loadChildren: () => import('./developer/catalogue/classification/classification.module').then(m => m.ClassificationModule) },
      { path: 'expenses', loadChildren: () => import('./developer/expenses/expenses.module').then(m => m.ExpensesModule) },
      { path: 'trademark', loadChildren: () => import('./developer/catalogue/trademark/trademark.module').then(m => m.TrademarkModule) },
      { path: 'services', loadChildren: () => import('./developer/service_product/services/services.module').then(m => m.ServicesModule) },
      { path: 'products', loadChildren: () => import('./developer/service_product/products/products.module').then(m => m.ProductsModule) },
      { path: 'wharehouse', loadChildren: () => import('./developer/wharehouse/wharehouse/wharehouse.module').then(m => m.WharehouseModule) },
      { path: 'wharehousemov', loadChildren: () => import('./developer/wharehouse/wharehousemov/wharehousemov.module').then(m => m.WharehousemovModule) },
      { path: 'wharehousedec', loadChildren: () => import('./developer/wharehouse/wharehousedec/wharehousedec.module').then(m => m.WharehousedecModule) },
      { path: 'wharehouselist', loadChildren: () => import('./developer/wharehouse/wharehouselist/wharehouselist.module').then(m => m.WharehouselistModule) },
      { path: 'porders', loadChildren: () => import('./developer/purchases/porders/porders.module').then(m => m.PordersModule) },
      { path: 'inventory', loadChildren: () => import('./developer/reports/inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'inventorym', loadChildren: () => import('./developer/reports/inventorym/inventorym.module').then(m => m.InventorymModule) },
      { path: 'greport', loadChildren: () => import('./developer/reports/greport/greport.module').then(m => m.GreportModule) },
      { path: 'users', loadChildren: () => import('./security/users/users.module').then(m => m.UsersModule) },
      { path: 'profile', loadChildren: () => import('./security/profile/profile.module').then(m => m.ProfileModule) },
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', loadChildren: () => import('./security/login/login.module').then(m => m.LoginModule) },
      { path: 'offline', loadChildren: () => import('./security/offline/offline.module').then(m => m.OfflineModule) },
    ]
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
