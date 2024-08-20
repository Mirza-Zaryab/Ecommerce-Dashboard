// ALL THE ROUTES USED IN THE APP

export const routes = {
    login: '/auth/login',
    updateProfile : '/admin/update_admin',
    changePassword : '/auth/change_password',
    adminDashboard : '/admin/dasboard',

    addNewCategory : '/category/add_prod_cat',
    categoryListing : '/category/category_listing',
    updateCategory : '/category/update_category/:id',
    deleteCategory : '/category/delete_categ/:id',

    productListing : '/product/product_list_admin',
    addNewProduct : '/product/add_product',
    updateProduct : '/product/update_product/:id',
    deleteProduct : '/product/delete_product/:id',

    customerListing : '/customer/customer_listing',

    orderListing : '/order/order_listing',
    
}