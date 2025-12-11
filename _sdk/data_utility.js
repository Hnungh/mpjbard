// data_utility.js

// Mock data utility (ใช้เป็น Mock Data source แทน API จริง)
// ประกาศเป็น global variable: MOCK_PRODUCTS_DATA
const MOCK_PRODUCTS_DATA = [
  {
    id: 'oversized-tee-black',
    name: 'Classic Black Oversized Tee',
    price: 790,
    description: 'เสื้อยืดโอเวอร์ไซส์สีดำคลาสสิก ผลิตจากผ้าคอตตอน 100% ทรงหลวมสบาย เหมาะสำหรับลุคสตรีทและใส่ได้ทุกวัน',
    image: 'https://hnungh.github.io/mcl/img/oversized-tee-black.jpg',
    category: 'OVERSIZED TEE',
    available_sizes: ['XS', 'S', 'M', 'L', 'XL'],
    available_colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/oversized-tee-black.jpg', 
        'https://hnungh.github.io/mcl/img/hoodie-grey.jpg', // Mock secondary image
        'https://hnungh.github.io/mcl/img/cargo-pants-olive.jpg', // Mock secondary image
        // สามารถเพิ่ม URL รูปภาพเพิ่มเติมได้ที่นี่
    ]
  },
  {
    id: 'cargo-pants-olive',
    name: 'Military Olive Cargo Pants',
    price: 1590,
    description: 'กางเกงคาร์โก้สีเขียวมะกอก ทรงหลวมสไตล์ทหาร ผ้าทนทาน พร้อมกระเป๋าหลายช่องเพื่อการใช้งานจริงและลุคสตรีทที่โดดเด่น',
    image: 'https://hnungh.github.io/mcl/img/cargo-pants-olive.jpg',
    category: 'CARGO PANTS',
    available_sizes: ['28', '30', '32', '34', '36'],
    available_colors: [{ name: 'Olive', hex: '#808000' }, { name: 'Black', hex: '#000000' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/cargo-pants-olive.jpg',
        'https://hnungh.github.io/mcl/img/oversized-tee-black.jpg', // Mock secondary image
    ]
  },
  {
    id: 'pullover-hoodie-grey',
    name: 'Essential Pullover Hoodie',
    price: 1290,
    description: 'เสื้อฮู้ดดี้แบบสวมหัวสีเทาอ่อน ผ้าฝ้ายผสมเนื้อนุ่ม เหมาะสำหรับสภาพอากาศเย็นและลุคสบายๆ',
    image: 'https://hnungh.github.io/mcl/img/hoodie-grey.jpg',
    category: 'PULLOVER HOODIE',
    available_sizes: ['S', 'M', 'L', 'XL'],
    available_colors: [{ name: 'Grey', hex: '#808080' }, { name: 'Navy', hex: '#000080' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/hoodie-grey.jpg',
    ]
  },
  {
    id: 'sunglasses-retro',
    name: 'Retro Square Sunglasses',
    price: 890,
    description: 'แว่นตากันแดดทรงสี่เหลี่ยมสไตล์ย้อนยุค เฟรมหนาและเลนส์คุณภาพสูง ปกป้องดวงตาจากแสงแดดได้ดี',
    image: 'https://hnungh.github.io/mcl/img/sunglasses-retro.jpg',
    category: 'SUNGLASSES',
    available_sizes: ['One Size'],
    available_colors: [{ name: 'Black', hex: '#000000' }, { name: 'Tortoise', hex: '#824510' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/sunglasses-retro.jpg',
    ]
  },
    // เพิ่มสินค้าสำหรับ Carousel (Trending Products)
  {
    id: 'product-005',
    name: 'Vintage Dad Cap',
    price: 590,
    description: 'หมวกแก๊ปทรงปีกโค้งสไตล์วินเทจ ใส่สบาย ปรับขนาดได้ เหมาะกับทุกโอกาส',
    image: 'https://hnungh.github.io/mcl/img/vintage-cap.jpg',
    category: 'HEADWEAR',
    available_sizes: ['One Size'],
    available_colors: [{ name: 'Beige', hex: '#F5F5DC' }, { name: 'Green', hex: '#008000' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/vintage-cap.jpg',
    ]
  },
  {
    id: 'product-006',
    name: 'High-Top Canvas Sneakers',
    price: 1990,
    description: 'รองเท้าผ้าใบหุ้มข้อสไตล์คลาสสิก พื้นยางทนทาน ใส่สบาย เข้าได้กับทุกชุด',
    image: 'https://hnungh.github.io/mcl/img/high-top-sneakers.jpg',
    category: 'FOOTWEAR',
    available_sizes: ['38', '39', '40', '41', '42', '43'],
    available_colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/high-top-sneakers.jpg',
    ]
  },
  {
    id: 'product-007',
    name: 'Chunky Silver Chain',
    price: 650,
    description: 'สร้อยคอโซ่เงินหนา สไตล์ Y2K เหมาะสำหรับเสริมลุคสตรีทให้ดูโดดเด่น',
    image: 'https://hnungh.github.io/mcl/img/silver-chain.jpg',
    category: 'ACCESSORIES',
    available_sizes: ['One Size'],
    available_colors: [{ name: 'Silver', hex: '#C0C0C0' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/silver-chain.jpg',
    ]
  }
];

/**
 * ฟังก์ชัน Mock เพื่อจำลองการดึงข้อมูลสินค้า (Product Fetching)
 * @param {string} productId - ID ของสินค้าที่ต้องการ
 * @returns {Object|null} ข้อมูลสินค้า หรือ null ถ้าไม่พบ
 */
function getProductById(productId) {
    return MOCK_PRODUCTS_DATA.find(product => product.id === productId) || null;
}

/**
 * ฟังก์ชัน Mock เพื่อจำลองการดึงข้อมูลสินค้าทั้งหมด
 * @returns {Array} รายการสินค้าทั้งหมด
 */
function getAllProducts() {
    return MOCK_PRODUCTS_DATA;
}


// ทำให้ฟังก์ชันเหล่านี้เข้าถึงได้จากภายนอก
window.dataUtility = {
    getProductById,
    getAllProducts,
    MOCK_PRODUCTS_DATA // ให้เข้าถึง data โดยตรงได้หากจำเป็น
};
