// data_sdk.js
(function() {
  const CART_KEY = "mycart";
  let _handler = null;
  
  /**
   * อ่านข้อมูลตะกร้าสินค้าจาก localStorage
   * @returns {Array} ข้อมูลตะกร้าสินค้า
   */
  function _readCart() {
    try { 
      // ตรวจสอบและคืนค่าเป็น Array เปล่าหากเกิดข้อผิดพลาด
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); 
    }
    catch (e) { 
      console.error("Error reading cart from localStorage:", e);
      return []; 
    }
  }
  
  /**
   * บันทึกข้อมูลตะกร้าสินค้าลงใน localStorage และแจ้งเตือน UI
   * @param {Array} cart - ข้อมูลตะกร้าสินค้าใหม่
   */
  function _saveCart(cart) {
    // 1. บันทึกข้อมูล
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    
    // 2. เรียก onDataChanged เพื่อแจ้งเตือน UI ให้ทำการอัปเดต
    if (_handler && typeof _handler.onDataChanged === "function") {
      _handler.onDataChanged(cart);
    }
  }
  
  /**
   * สร้าง ID ที่ไม่ซ้ำกันสำหรับรายการสินค้าในตะกร้า 
   * โดยใช้ Product ID, Size, และ Color เพื่อระบุสินค้าที่ "เหมือนกัน"
   * @param {Object} item - รายการสินค้า
   * @returns {string} __backendId
   */
  function genBackendId(item) {
    // ใช้ product_id, size, และ color ในการสร้าง ID
    return `${item.id}_${item.size || 'N/A'}_${item.color || 'N/A'}`;
  }
  
  // ============================================
  // PUBLIC DATA SDK API
  // ============================================

  const DATA_SDK_MOCK = {
    
    /**
     * เริ่มต้น SDK และตั้งค่าตัวจัดการข้อมูล (Data Handler)
     * @param {Object} handler - Object ที่มีฟังก์ชัน onDataChanged(data)
     * @returns {Promise<Object>} { isOk: boolean }
     */
    async init(handler) {
      _handler = handler;
      console.log("🛒 Data SDK Mock Initialized.");
      
      // โหลดข้อมูลเริ่มต้นและแจ้งเตือน Handler ทันที เพื่ออัปเดต UI (เช่น Cart Badge)
      const initialCart = _readCart();
      if (_handler && typeof _handler.onDataChanged === "function") {
        _handler.onDataChanged(initialCart);
      }
      
      return { isOk: true };
    },

    /**
     * เพิ่ม/อัปเดตรายการสินค้าในตะกร้า
     * @param {Object} item - รายการสินค้าที่จะเพิ่ม (ต้องมี id, name, price, quantity)
     * @returns {Promise<Object>} { isOk: boolean, error?: string }
     */
    async add(item) {
      if (!item.id || !item.quantity || item.quantity < 1) {
        return { isOk: false, error: 'Missing product ID or invalid quantity' };
      }
      
      let cart = _readCart();
      const backendId = genBackendId(item);
      
      let existingItem = cart.find(x => x.__backendId === backendId);
      const priceValue = parseFloat(item.price);
      const quantityToAdd = parseInt(item.quantity);

      if (isNaN(priceValue) || priceValue < 0 || isNaN(quantityToAdd) || quantityToAdd < 1) {
         return { isOk: false, error: 'Invalid price or quantity' };
      }
      
      if (existingItem) {
        // อัปเดตปริมาณสินค้าที่มีอยู่
        existingItem.quantity += quantityToAdd;
        // อัปเดตราคาและชื่อ (เผื่อมีการเปลี่ยนแปลงข้อมูลสินค้า)
        existingItem.price = priceValue;
        existingItem.name = item.name;
      } else {
        // เพิ่มรายการสินค้าใหม่ พร้อมกำหนด __backendId
        cart.push({ 
          ...item, 
          price: priceValue,
          quantity: quantityToAdd, 
          __backendId: backendId // ใช้ backendId ที่คำนวณไว้แล้ว
        });
      }
      
      _saveCart(cart);
      return { isOk: true };
    },
    
    /**
     * อัปเดตรายการสินค้าที่มีอยู่
     * @param {Object} item - รายการสินค้าที่ถูกอัปเดต (ต้องมี __backendId และ quantity)
     * @returns {Promise<Object>} { isOk: boolean, error?: string }
     */
    async update(item) {
      if (!item.__backendId || typeof item.quantity === 'undefined') {
         return { isOk: false, error: 'Missing __backendId or quantity for update' };
      }
        
      let cart = _readCart();
      
      // ค้นหาด้วย __backendId เพื่อให้แน่ใจว่าอัปเดตรายการที่ถูกต้อง
      let idx = cart.findIndex(x => x.__backendId === item.__backendId);

      if (idx > -1) {
        // แทนที่รายการเดิมด้วยรายการที่ถูกอัปเดต โดยรักษาสินทรัพย์อื่น ๆ ไว้
        cart[idx] = { ...cart[idx], ...item };
        
        // ตรวจสอบความถูกต้องของ Quantity
        if (cart[idx].quantity < 1) {
            return DATA_SDK_MOCK.delete(item); // ลบทิ้งถ้า quantity เป็น 0 หรือติดลบ
        }
        
        _saveCart(cart);
        return { isOk: true };
      }
      return { isOk: false, error: 'Item not found for update' };
    },
    
    /**
     * ลบรายการสินค้าออกจากตะกร้า
     * @param {Object} item - รายการสินค้าที่ต้องการลบ (ต้องมี __backendId)
     * @returns {Promise<Object>} { isOk: boolean, error?: string }
     */
    async delete(item) {
      if (!item.__backendId) {
         return { isOk: false, error: 'Missing __backendId for delete' };
      }
      
      let cart = _readCart();
      const initialLength = cart.length;
      
      // กรองรายการสินค้าที่ไม่ตรงกับ __backendId ออกไป
      cart = cart.filter(x => x.__backendId !== item.__backendId);
      
      if (cart.length < initialLength) {
         _saveCart(cart);
         return { isOk: true };
      }
      return { isOk: false, error: 'Item not found for delete' };
    },
    
    /**
     * ล้างตะกร้าสินค้าทั้งหมด
     * @returns {Promise<Object>} { isOk: boolean }
     */
    async clear() {
         _saveCart([]);
         return { isOk: true };
    },

    // --- Utility Methods ---
    
    /**
     * รับจำนวนสินค้าทั้งหมดในตะกร้า (รวมปริมาณ)
     * @returns {number} จำนวนชิ้นของสินค้าทั้งหมด
     */
    getCartCount() {
        const cart = _readCart();
        return cart.reduce((total, item) => total + (item.quantity || 0), 0);
    },
    
    /**
     * รับยอดรวมราคาทั้งหมดในตะกร้า
     * @returns {number} ยอดรวมราคา
     */
    getCartTotal() {
        const cart = _readCart();
        return cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
    },

    /**
     * รับรายการสินค้าทั้งหมดในตะกร้า
     * @returns {Array} รายการสินค้า
     */
    getCartItems() {
        return _readCart();
    }
  };

  // กำหนดให้เป็น Global Object
  window.dataSdk = DATA_SDK_MOCK;
})();
