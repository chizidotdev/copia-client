export type User = {
    id: string;
    email: string;
};

export type Order = {
    id: string;
    created_at: string;
    updated_at: string;

    status: OrderStatus;
    shipping_details: string;
    estimated_delivery_date: string;
    order_date: string;
    total_amount: number;
    payment_status: string;
    payment_method: string;
    billing_address: string;
    shipping_address: string;
    notes: string;

    order_items: OrderItem[];
    customer_id: string;
    user_email: string;
};

export type OrderStatus = 'pending' | 'delivered' | 'shipped' | 'canceled';

export type OrderItem = {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    sub_total: number;
};

export type Inventory = {
    total_items: number;
    low_stock_items: number;
    recent_sales: number;
    pending_orders: number;
    sales_performance: number;
    price_sold_by_date: {
        date: string;
        total_sale_price: number;
    }[];
    price_sold_by_week: {
        date: string;
        total_sale_price: number;
    }[];
};
