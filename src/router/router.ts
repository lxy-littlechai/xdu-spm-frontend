import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

import Login from "@/components/Login.vue"
import Patron from "@/components/Patron/Patron.vue"
import BorrowedBook from "@/components/Patron/BorrowedBook.vue"
import BookSearch from "@/components/Patron/Book-search.vue"
import HistoricalBook from "@/components/Patron/HistoricalBook.vue"
import ShopLists from "@/components/Patron/ShopLists.vue"

import Staff from "@/components/Staff/Staff.vue"
import PatronInfo from "@/components/Staff/PatronOp.vue"
import AddBook from "@/components/Staff/AddBook.vue"
import DeleteBook from "@/components/Staff/DeleteBook.vue"
import UpdateBook from "@/components/Staff/UpdateBook.vue"
import BorrowBook from "@/components/Staff/BorrowBook.vue"

import Administrator from "@/components/Administrator/Administrator.vue"
import Permission from "@/components/Administrator/Permission.vue"
import CreateAccount from "@/components/Administrator/CreateAccount.vue"

import Superuser from "@/components/Superuser/Superuser.vue"
import Log from "@/components/Superuser/Log.vue"
import Statistics from "@/components/Superuser/Statistics.vue"

import ScanQR from "@/components/Public/scanQR.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/Patron',
    component: Patron,
    redirect: '/Patron/BookSearch',
    children: [
      {
        path: '/Patron/BookSearch',
        component: BookSearch
      },
      {
        path: '/Patron/BorrowedBook',
        component: BorrowedBook
      },
      {
        path: '/Patron/HistoricalBook',
        component: HistoricalBook
      },
      {
        path: '/Patron/ShopLists',
        component: ShopLists
      }
    ]
  },
  {
    path: '/Staff',
    component: Staff,
    redirect: '/Staff/PatronInfo',
    children: [
      {
        path: '/Staff/PatronInfo',
        component: PatronInfo,
      },
      {
        path: '/Staff/AddBook',
        component: AddBook,
      },
      {
        path: '/Staff/DeleteBook',
        component: DeleteBook,
      },
      {
        path: '/Staff/UpdateBook',
        component: UpdateBook,
      },
      {
        path: '/Staff/BorrowBook',
        component: BorrowBook,
      },
    ]
  },
  {
    path: '/Administrator',
    component: Administrator,
    children: [
      {
        path: '/Administrator/Permission',
        component: Permission,
      },
      {
        path: '/Administrator/CreateAccount',
        component: CreateAccount,
      }
    ]
  },
  {
    path: '/Superuser',
    component: Superuser,
    redirect: '/Superuser/Statistics',
    children: [
      {
        path: '/Superuser/Statistics',
        component: Statistics
      },
      {
        path: '/Superuser/Log',
        component: Log
      }
    ]
  },
  {
    path: '/Public/ScanQR',
    component: ScanQR
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;