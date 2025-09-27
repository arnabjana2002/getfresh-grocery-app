# GetFresh API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication Endpoints

### User Authentication

#### Register User
- **Endpoint:** `POST /api/user/register`
- **Description:** Register a new user
- **Input:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
- **Success Response:**
```json
{
  "success": true,
  "user": {
    "name": "string",
    "email": "string"
  }
}
```
- **Error Response:** `401`, `400`, `500`
- **Notes:** Sets HTTP-only cookie with JWT token

#### User Login
- **Endpoint:** `POST /api/user/login` 
- **Description:** Login existing user
- **Input:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Success Response:**
```json
{
  "success": true,
  "user": {
    "name": "string", 
    "email": "string"
  }
}
```
- **Error Response:** `401`, `500`
- **Notes:** Sets HTTP-only cookie with JWT token

#### Check Auth Status
- **Endpoint:** `GET /api/user/is-auth`
- **Description:** Check if user is authenticated
- **Auth Required:** Yes
- **Success Response:**
```json
{
  "success": true,
  "user": {
    "name": "string",
    "email": "string",
    "cartItems": {}
  }
}
```
- **Error Response:** `401`, `500`

#### Logout User
- **Endpoint:** `GET /api/user/logout`
- **Description:** Logout current user
- **Auth Required:** Yes
- **Success Response:**
```json
{
  "success": true,
  "message": "Logged Out"
}
```
- **Error Response:** `500`
- **Notes:** Clears auth cookie

### Seller Authentication

#### Seller Login
- **Endpoint:** `POST /api/seller/login`
- **Description:** Login as seller/admin
- **Input:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Seller Logged In"
}
```
- **Error Response:** `401`, `500`
- **Notes:** Sets HTTP-only cookie with seller JWT token

#### Check Seller Auth
- **Endpoint:** `GET /api/seller/is-auth`
- **Description:** Check if seller is authenticated
- **Auth Required:** Yes (Seller)
- **Success Response:**
```json
{
  "success": true
}
```
- **Error Response:** `401`, `500`

#### Seller Logout
- **Endpoint:** `GET /api/seller/logout`
- **Description:** Logout seller
- **Auth Required:** Yes (Seller)
- **Success Response:**
```json
{
  "success": true,
  "message": "Seller Logged Out"
}
```
- **Error Response:** `500`
- **Notes:** Clears seller auth cookie

## Product Endpoints

#### Add Product
- **Endpoint:** `POST /api/product/add`
- **Description:** Add a new product
- **Auth Required:** Yes (Seller)
- **Input:** FormData with:
  - `productData`: JSON string containing product details
  - `images`: Array of image files
- **Product Data Format:**
```json
{
  "name": "string",
  "description": ["string"],
  "price": "number",
  "offerPrice": "number",
  "category": ["string"]
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Product Added"
}
```
- **Error Response:** `401`, `500`

#### Get Products List
- **Endpoint:** `GET /api/product/list`
- **Description:** Get all products
- **Success Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "string",
      "name": "string",
      "description": ["string"],
      "price": "number",
      "offerPrice": "number",
      "image": ["string"],
      "category": ["string"],
      "inStock": "boolean"
    }
  ]
}
```
- **Error Response:** `500`

#### Get Product by ID
- **Endpoint:** `GET /api/product/id`
- **Description:** Get single product details
- **Input:**
```json
{
  "id": "string"
}
```
- **Success Response:**
```json
{
  "success": true,
  "product": {
    "_id": "string",
    "name": "string",
    "description": ["string"],
    "price": "number",
    "offerPrice": "number",
    "image": ["string"],
    "category": ["string"],
    "inStock": "boolean"
  }
}
```
- **Error Response:** `500`

#### Update Product Stock
- **Endpoint:** `POST /api/product/stock`
- **Description:** Update product stock status
- **Auth Required:** Yes (Seller)
- **Input:**
```json
{
  "id": "string",
  "inStock": "boolean"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Stock Updated"
}
```
- **Error Response:** `401`, `500`

## Cart Endpoints

#### Update Cart
- **Endpoint:** `POST /api/cart/update`
- **Description:** Update user's cart items
- **Auth Required:** Yes
- **Input:**
```json
{
  "userId": "string",
  "cartItems": {
    "productId": "quantity"
  }
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Cart Updated"
}
```
- **Error Response:** `401`, `500`

## Address Endpoints

#### Add Address
- **Endpoint:** `POST /api/address/add`
- **Description:** Add new delivery address
- **Auth Required:** Yes
- **Input:**
```json
{
  "userId": "string",
  "address": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "zipcode": "number",
    "country": "string",
    "phone": "string"
  }
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Address Added Successfully"
}
```
- **Error Response:** `401`, `500`

#### Get Addresses
- **Endpoint:** `GET /api/address/get`
- **Description:** Get user's saved addresses
- **Auth Required:** Yes
- **Input:**
```json
{
  "userId": "string"
}
```
- **Success Response:**
```json
{
  "success": true,
  "addresses": [
    {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "street": "string",
      "city": "string",
      "state": "string",
      "zipcode": "number",
      "country": "string",
      "phone": "string"
    }
  ]
}
```
- **Error Response:** `401`, `500`

## Order Endpoints

#### Place COD Order
- **Endpoint:** `POST /api/order/cod`
- **Description:** Place a new Cash on Delivery order
- **Auth Required:** Yes
- **Input:**
```json
{
  "userId": "string",
  "items": [
    {
      "product": "string (product id)",
      "quantity": "number"
    }
  ],
  "address": "string (address id)"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Order Placed Successfully"
}
```
- **Error Response:** `401`, `500`

#### Get User Orders
- **Endpoint:** `GET /api/order/user`
- **Description:** Get orders for specific user
- **Auth Required:** Yes
- **Input:**
```json
{
  "userId": "string"
}
```
- **Success Response:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "string",
      "items": [{
        "product": {
          "_id": "string",
          "name": "string",
          "price": "number"
        },
        "quantity": "number"
      }],
      "amount": "number",
      "address": {
        "_id": "string",
        "street": "string",
        "city": "string"
      },
      "status": "string",
      "paymentType": "string",
      "isPaid": "boolean",
      "createdAt": "date"
    }
  ]
}
```
- **Error Response:** `401`, `500`

#### Get All Orders (Seller)
- **Endpoint:** `GET /api/order/seller`
- **Description:** Get all orders (admin only)
- **Auth Required:** Yes (Seller)
- **Success Response:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "string",
      "userId": "string",
      "items": [{
        "product": {
          "_id": "string",
          "name": "string",
          "price": "number"
        },
        "quantity": "number"
      }],
      "amount": "number",
      "address": {
        "_id": "string",
        "street": "string",
        "city": "string"
      },
      "status": "string",
      "paymentType": "string",
      "isPaid": "boolean",
      "createdAt": "date"
    }
  ]
}
```
- **Error Response:** `401`, `500`

## Error Responses

All endpoints can return these error responses:

```json
{
  "success": false,
  "message": "Error message"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `500`: Internal Server Error