import { Routes } from "@angular/router";
import { AddProductPageComponent } from "@pages/add-product-page/add-product-page.component";
import { AdminPageComponent } from "@pages/admin-page/admin-page.component";
import { CartPageComponent } from "@pages/cart-page/cart-page.component";
import { EditProductPageComponent } from "@pages/edit-product-page/edit-product-page.component";
import { HomePageComponent } from "@pages/home-page/home-page.component";
import { OrdersComponent } from "@pages/orders/orders.component";

export default [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'admin/addProduct',
    component: AddProductPageComponent,
  },
  {
    path: 'admin/editProduct/:id',
    component: EditProductPageComponent
  },
  {
    path: 'admin/orders',
    component: OrdersComponent
  }

] as Routes;