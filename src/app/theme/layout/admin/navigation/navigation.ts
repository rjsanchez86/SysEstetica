import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navegación',
    type: 'group',
    icon: 'feather icon-at-sign',
    children: [
      {
        id: 'home',
        title: 'Inicio',
        type: 'item',
        url: '/home',
        classes: 'nav-item',
        icon: 'feather icon-home'
      },
      {
        id: 'sales-quotes',
        title: 'Ventas Y Citas',
        type: 'collapse',
        icon: 'fas fa-store',
        children: [
          {
            id: 'sales',
            title: 'Ventas',
            type: 'item',
            url: '/sales'
          },
          {
            id: 'quotes',
            title: 'Agenda',
            type: 'item',
            url: '/quotes'
          },
          {
            id: 'list-sales',
            title: 'Reporte de Ventas',
            type: 'item',
            url: '/listsales'
          },
          {
            id: 'return-products',
            title: 'Devolución Producto',
            type: 'item',
            url: '/rproducts'
          },
        ],
      },
      {
        id: 'client',
        title: 'Cliente',
        type: 'collapse',
        icon: 'fas fa-users',
        children: [
          {
            id: 'client',
            title: 'Clientes',
            type: 'item',
            url: '/client'
          }
        ],
      },
      {
        id: 'purchase',
        title: 'Compras',
        type: 'collapse',
        icon: 'feather icon-package',
        children: [
          {
            id: 'purchase-orders',
            title: 'Ordenes de Compra',
            type: 'item',
            url: '/porders'
          },
          {
            id: 'list-orders',
            title: 'Lista de Ordenes de Compra',
            type: 'item',
            url: '/listporders'
          },
        ],
      },
      {
        id: 'warehouse',
        title: 'Almacen',
        type: 'collapse',
        icon: 'fas fa-warehouse',
        children: [
          {
            id: 'wharehouse',
            title: 'Registro de Almacenes',
            type: 'item',
            url: '/wharehouse'
          },

          {
            id: 'wharehouse-movements',
            title: 'Entradas al Almacén',
            type: 'item',
            url: '/wharehousemov'
          },
          {
            id: 'wharehouse-decrease',
            title: 'Transpasos de Almacen General a Almacen Consumo',
            type: 'item',
            url: '/wharehousedec'
          },
          /*{
            id: 'inventoryadjustment',
            title: 'Ajuste Inventario',
            type: 'item',
            url: '/iadjustment'
          },*/
          {
            id: 'wharehous-list',
            title: 'Kardex',
            type: 'item',
            url: '/wharehouselist'
          },
          {
            id: 'inventory-list',
            title: 'Inventario',
            type: 'item',
            url: '/inventory'
          },
          {
            id: 'inventorym',
            title: 'Inventario Productos Merma',
            type: 'item',
            url: '/inventorym'
          },
        ],
      },
      {
        id: 'articles_service',
        title: 'Productos y Servicios',
        type: 'collapse',
        icon: 'fas fa-barcode',
        children: [
          {
            id: 'product',
            title: 'Productos',
            type: 'item',
            url: '/products'
          },
          {
            id: 'services',
            title: 'Servicios',
            type: 'item',
            url: '/services'
          }
        ],
      },
      {
        id: 'expenses',
        title: 'Gastos',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'new-expenses',
            title: 'Registro de Gastos',
            type: 'item',
            url: '/expenses'
          }
        ],
      },
      {
        id: 'catalogs',
        title: 'Catalogos',
        type: 'collapse',
        icon: 'fas fa-book-open',
        children: [
          {
            id: 'supplier',
            title: 'Proveedor',
            type: 'item',
            url: '/supplier'
          },
          {
            id: 'trademark',
            title: 'Marca',
            type: 'item',
            url: '/trademark'
          },
          {
            id: 'payment-methods',
            title: 'Metodos de Pago',
            type: 'item',
            url: '/methods'
          },
          {
            id: 'classification-servcises',
            title: 'Clasificación de Servicios',
            type: 'item',
            url: '/classification'
          }
        ],
      },
      {
        id: 'reports',
        title: 'Reportes',
        type: 'collapse',
        icon: 'feather icon-book',
        children: [
          {
            id: 'greport',
            title: 'Reporte General',
            type: 'item',
            url: '/greport'
          }
        ]
      }
    ],
  },
  {
    id: 'setting',
    title: 'Configuración',
    type: 'group',
    icon: 'feather icon-at-sign',
    children: [
      {
        id: 'company',
        title: 'Empresa',
        type: 'collapse',
        icon: 'fas fa-store-alt',
        children: [
          {
            id: 'company',
            title: 'Empresa',
            type: 'item',
            url: '/company'
          },
          {
            id: 'sucursal',
            title: 'Sucursal',
            type: 'item',
            url: '/sucursal'
          },
          {
            id: 'staff',
            title: 'Personal',
            type: 'item',
            url: '/staff'
          },
          {
            id: 'workstation',
            title: 'Puestos',
            type: 'item',
            url: '/workstation'
          },
        ],
      },
      {
        id: 'security',
        title: 'Seguridad',
        type: 'collapse',
        icon: 'fas fa-id-card',
        children: [
          {
            id: 'users',
            title: 'Usuarios',
            type: 'item',
            url: '/users'
          },
          {
            id: 'profile',
            title: 'Perfiles',
            type: 'item',
            url: '/profile'
          }
        ],
      },
    ],
  },
];

@Injectable()
export class NavigationItem {

  get() {
    return NavigationItems;
  }
}
