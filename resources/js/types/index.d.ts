import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import { Page } from '@inertiajs/core'

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Item {
    id: number
    name: string
    price: number
}

export interface SaleItemForm {
    item_id: number | '',
    qty: number
    price: number
    total_price: number
}

export interface PageProps<T = object> extends Page<T> {
    auth: {
        user: User
    },
    // items: Item[],
    // sale: Sale,
    // sales: SalePayment[],
    // payment: Payment,
    filters: T.filters,
    widgets: T.widgets,
    charts: T.charts,
    sales: T.sales,
}

export interface SaleItem {
    item_id: number
    qty: number
    price: number
    total_price: number
}

export interface Sale {
    id: number
    code: string
    sale_date: string
    status: string
    items: SaleItem[]
}

export interface SalePayment {
    id: number
    code: string
    total_amount: number
    total_paid: number
    status: string,
    sale_date: string,
}

export interface Payment {
    id: number
    code: string
    sale_id: number
    payment_date: string
    amount: number
    sale: SalePayment
}

interface Links {
    url: string
    label: string
    active: boolean
}

interface Pagination<T> {
    data: T[]
    links: Links[]
}