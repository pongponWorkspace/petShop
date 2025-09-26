import { ApiBooking, ApiBookingStatus, ApiCoupon, ApiCouponStatus, ApiHotel, ApiPet, ApiRoomType, ApiService, ApiServiceStatus } from "@/src/services";


// Mock Services Data (Thai Language)
export const mockApiServices: ApiService[] = [
  {
    id: '1',
    title: 'การตัดแต่งขนมืออาชีพ',
    description: 'บริการตัดแต่งขนครบวงจรสำหรับสัตว์เลี้ยงขนาดเล็ก',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    purchaseDate: '2024-09-20',
    expiryDate: '2024-12-20',
    status: ApiServiceStatus.READY_TO_USE,
    category: 'grooming'
  },
  {
    id: '2',
    title: 'บริการฝากเลี้ยงสัตว์',
    description: 'บริการดูแลสัตว์เลี้ยงขณะที่คุณเดินทาง',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    purchaseDate: '2024-09-18',
    expiryDate: '2024-12-18',
    status: ApiServiceStatus.READY_TO_USE,
    category: 'boarding'
  },
  {
    id: '3',
    title: 'แพ็กเกจตรวจสุขภาพ',
    description: 'การตรวจสุขภาพครบถ้วนสำหรับสัตว์เลี้ยง',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
    purchaseDate: '2024-08-15',
    expiryDate: '2024-11-15',
    status: ApiServiceStatus.USED,
    category: 'medical'
  }
];

// Mock Coupons Data (Thai Language)
export const mockApiCoupons: ApiCoupon[] = [
  {
    id: '1',
    title: 'ตัดแต่งขนฟรี',
    description: 'บริการตัดแต่งขนครบถ้วนสำหรับสัตว์เลี้ยงขนาดเล็ก',
    expiryDate: '2024-12-15',
    status: ApiCouponStatus.AVAILABLE,
    icon: 'star.fill',
    color: 'warning',
    discountType: 'PERCENTAGE',
    discountValue: 100
  },
  {
    id: '2',
    title: 'ชุดของเล่นพรีเมียม',
    description: 'รวมของเล่นคุณภาพสูงสำหรับสัตว์เลี้ยงของคุณ',
    expiryDate: '2024-10-05',
    status: ApiCouponStatus.AVAILABLE,
    icon: 'bag.fill',
    color: 'secondary',
    discountType: 'FIXED',
    discountValue: 500
  },
  {
    id: '3',
    title: 'ส่วนลด 20% ตรวจสุขภาพ',
    description: 'ส่วนลดการตรวจสุขภาพครบถ้วน',
    expiryDate: '2024-11-30',
    status: ApiCouponStatus.AVAILABLE,
    icon: 'heart.fill',
    color: 'error',
    discountType: 'PERCENTAGE',
    discountValue: 20
  }
];

// Mock Bookings Data (Thai Language)
export const mockApiBookings: ApiBooking[] = [
  {
    id: '1',
    bookingId: '#HB001',
    type: 'HOSPITAL',
    specialist: 'สัตวแพทย์ผู้เชี่ยวชาญ',
    petName: 'แม็กซ์',
    petBreed: 'โกลเดน รีทรีฟเวอร์',
    date: '2024-09-26',
    time: '10:00',
    status: ApiBookingStatus.CONFIRMED,
    price: 1200,
    notes: 'ตรวจสุขภาพประจำปี'
  },
  {
    id: '2',
    bookingId: '#HB002',
    type: 'HOSPITAL',
    specialist: 'แพทย์โรคภายใน',
    petName: 'ลูน่า',
    petBreed: 'เปอร์เซีย',
    date: '2024-10-25',
    time: '14:00',
    status: ApiBookingStatus.CONFIRMED,
    price: 1500,
    notes: 'ตรวจติดตามหลังการรักษา'
  },
  {
    id: '3',
    bookingId: '#GB001',
    type: 'GROOMING',
    service: 'การตัดแต่งขนพรีเมียม',
    petName: 'บัดดี้',
    petBreed: 'ลาบราดอร์',
    date: '2024-10-30',
    time: '11:00',
    status: ApiBookingStatus.PENDING,
    price: 800,
    notes: 'ขอตัดขนสั้น'
  }
];

// Mock Pets Data (Thai Language)
export const mockApiPets: ApiPet[] = [
  {
    id: '1',
    name: 'แม็กซ์',
    type: 'DOG',
    breed: 'โกลเดน รีทรีฟเวอร์',
    age: 3,
    weight: 28,
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop',
    vaccinated: true,
    medicalNotes: 'มีประวัติแพ้อาหารไก่'
  },
  {
    id: '2',
    name: 'ลูน่า',
    type: 'CAT',
    breed: 'เปอร์เซีย',
    age: 2,
    weight: 4,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
    vaccinated: true,
    medicalNotes: 'ขี้อายกับคนแปลกหน้า'
  },
  {
    id: '3',
    name: 'บัดดี้',
    type: 'DOG',
    breed: 'ลาบราดอร์',
    age: 5,
    weight: 32,
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
    vaccinated: true,
    medicalNotes: 'ข้อเท้าเคยบาดเจ็บ ควรระวังการออกกำลังกาย'
  },
  {
    id: '4',
    name: 'วิสเกอร์ส',
    type: 'CAT',
    breed: 'เมนคูน',
    age: 4,
    weight: 6,
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300&h=300&fit=crop',
    vaccinated: true,
    medicalNotes: 'ชอบเล่นน้ำ'
  }
];

// Mock Hotels Data (Thai Language)
export const mockApiHotels: ApiHotel[] = [
  {
    id: '1',
    name: 'โรงแรมสุนัข พาวส์ พาราไดซ์',
    description: 'ที่พักหรูหราสำหรับสุนัขที่คุณรัก พร้อมสิ่งอำนวยความสะดวกระดับพรีเมียมและการดูแล 24 ชั่วโมง',
    petType: 'DOG',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop',
    rating: 4.8,
    amenities: ['การดูแล 24/7', 'พื้นที่เล่น', 'บริการตัดแต่งขน', 'เดินเล่นทุกวัน', 'การดูแลทางการแพทย์', 'เครื่องปรับอากาศ'],
    location: 'กรุงเทพมหานคร'
  },
  {
    id: '2',
    name: 'โรงแรมแมว วิสเกอร์ส เฮเวน',
    description: 'ที่พักอักษรเงียบสงบและสะดวกสบายสำหรับแมว พร้อมสภาพแวดล้อมเงียบและการดูแลเฉพาะแมว',
    petType: 'CAT',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    rating: 4.9,
    amenities: ['สภาพแวดล้อมเงียบ', 'ต้นไผ่ปีนป่าย', 'พื้นที่ส่วนตัว', 'เวลาเล่น', 'การดูแลทางการแพทย์', 'ควบคุมอุณหภูมิ'],
    location: 'กรุงเทพมหานคร'
  }
];

// Mock Room Types Data (Thai Language)
export const mockApiRoomTypes: ApiRoomType[] = [
  // Dog Hotel Rooms
  {
    id: '1',
    hotelId: '1',
    name: 'ห้องมาตรฐาน',
    description: 'ที่พักพื้นฐานที่สะดวกสบายพร้อมสิ่งอำนวยความสะดวกที่จำเป็น',
    price: 1500,
    size: '2m x 1.5m',
    capacity: 1,
    amenities: ['เตียงสุนัขสะดวกสบาย', 'ชามอาหารและน้ำ', 'ทำความสะอาดทุกวัน', 'บริการให้อาหาร'],
    images: [
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'พักขั้นต่ำ 1 คืน',
      'เช็คอิน: 14:00 น. เช็คเอาท์: 11:00 น.',
      'ต้องมีใบรับรองการฉีดวัคซีน',
      'ไม่รับสัตว์ที่ดุร้าย',
      'ยกเลิกได้ก่อน 24 ชั่วโมง'
    ],
    available: true
  },
  {
    id: '2',
    hotelId: '1',
    name: 'ห้องดีลักซ์',
    description: 'ห้องกว้างขวางพร้อมสิ่งอำนวยความสะดวกเพิ่มเติมและพื้นที่เล่น',
    price: 2400,
    size: '3m x 2m',
    capacity: 1,
    amenities: ['เตียงพรีเมียม', 'ของเล่น', 'พื้นที่เล่นส่วนตัว', 'ชุดอุปกรณ์ตัดแต่งขน', 'ขนมพิเศษ'],
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'พักขั้นต่ำ 1 คืน',
      'เช็คอิน: 14:00 น. เช็คเอาท์: 11:00 น.',
      'ต้องมีใบรับรองการฉีดวัคซีน',
      'ต้องประเมินนิสัยก่อน',
      'ยกเลิกได้ก่อน 24 ชั่วโมง'
    ],
    available: true
  },
  // Cat Hotel Rooms
  {
    id: '5',
    hotelId: '2',
    name: 'ห้องมาตรฐาน',
    description: 'พื้นที่อบอุ่นและเงียบสงบเหมาะสำหรับแมวที่ชอบความเป็นส่วนตัว',
    price: 1350,
    size: '2m x 1.5m',
    capacity: 1,
    amenities: ['เตียงแมวสะดวกสบาย', 'เสาข่วนเล็บ', 'มุมอาหารและน้ำ', 'กล่องทราย'],
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&h=400&fit=crop'
    ],
    bookingConditions: [
      'พักขั้นต่ำ 1 คืน',
      'เช็คอิน: 15:00 น. เช็คเอาท์: 11:00 น.',
      'ต้องมีใบรับรองการฉีดวัคซีน',
      'แนะนำแมวที่ทำหมัน',
      'ยกเลิกได้ก่อน 24 ชั่วโมง'
    ],
    available: true
  }
];