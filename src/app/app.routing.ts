import { Routes } from "@angular/router";
import { AppComponent } from "@app/app.component";
import { CartPageComponent } from "@pages/cart-page/cart-page.component";
import { HomePageComponent } from "@pages/home-page/home-page.component";
import { OrdersPageComponent } from "@pages/orders-page/orders-page.component";

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
    path: 'orders',
    component: OrdersPageComponent,
  }

] as Routes;