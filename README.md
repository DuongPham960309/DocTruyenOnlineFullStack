# 📚 Đọc Truyện Online - Full-Stack Web Application

![ReactJS](https://img.shields.io/badge/Frontend-ReactJS_18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js/Express.js-339933?style=for-the-badge&logo=nodedotjs)
![MySQL](https://img.shields.io/badge/Database-MySQL_8.0-4479A1?style=for-the-badge&logo=mysql)
![WebAssembly](https://img.shields.io/badge/Security-WebAssembly_(C++)-654FF0?style=for-the-badge&logo=webassembly)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Dự án web đọc truyện trực tuyến kiến trúc Full-Stack đáp ứng tải cao, tập trung tối ưu hóa hiệu năng render phía Client, tiết kiệm tài nguyên hệ thống phía Server và triển khai mô hình bảo mật API đa tầng tiên tiến.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Phân tầng | Công nghệ / Thư viện |
| :--- | :--- |
| **Frontend** | ReactJS 18, React Hooks, WebAssembly (C++ / PicoSHA2), SCSS/CSS3, Bootstrap 5 Grid System, AJAX/Fetch API |
| **Backend** | Node.js, Express.js, Crypto Verification, express-rate-limit, CORS |
| **Database** | MySQL 8 (`mysql2` connection pool) |
| **Tools** | Git/GitHub, Visual Studio Code |

---

## 🚀 Tính Năng & Kiến Trúc Nổi Bật (Technical Highlights)

### 1. Kiến Trúc Full-Stack (Full-Stack Architecture)
* Xây dựng hệ thống web đọc truyện đáp ứng tải cao, kết hợp **ReactJS 18** cho Frontend, **Node.js/Express.js** cho Backend và hệ quản trị cơ sở dữ liệu **MySQL 8**.

### 2. Mô Hình Bảo Mật API Đa Tầng (Multi-layered API Security)
* **Xác thực Request với WebAssembly (.wasm):** Tích hợp module C++ (`PicoSHA2`) biên dịch sang WebAssembly vào ReactJS để sinh token `x-key` động. Thực hiện băm kết hợp chuỗi bí mật & mốc thời gian thực (**Request Timestamp**) qua thuật toán tiêu chuẩn **SHA-256**, sau đó trộn chuỗi băm với dữ liệu thời gian đã mã hóa nhằm chống Replay Attack và ngăn chặn truy vấn API trái phép từ bên ngoài.
* **Kiểm soát Truy cập (CORS):** Cấu hình Cross-Origin Resource Sharing ở Backend Express.js để giới hạn tên miền truy cập (`http://localhost:3000`), chặn đứng các yêu cầu từ các domain không xác định.
* **Chống tấn công DoS & Brute-Force (Rate Limiting):** Áp dụng middleware `express-rate-limit` để giới hạn số lượng request (tối đa 500 requests / 15 phút / IP), bảo vệ hạ tầng máy chủ khỏi nguy cơ quá tải và spam API.

### 3. Tối Ưu Băng Thông & Hiệu Năng Render (Selective Dynamic Polling)
* **Cơ chế Polling 2 chiều:** Thiết lập cơ chế Polling định kỳ 5 giây kết hợp so sánh mốc thời gian cập nhật dữ liệu 2 chiều (**Data Updated Time** giữa Frontend và MySQL).
* **Tối ưu Backend:** Áp dụng `Promise.allSettled` để **xử lý bất đồng bộ song song** (thay vì chạy tuần tự), kết hợp kiểm tra **Data Updated Time** để chỉ thực thi truy vấn SQL (`pool.query`) cho các Section có dữ liệu mới, giúp rút ngắn tối đa thời gian phản hồi API và giảm tải cho Database.
* **Tối ưu Frontend (Granular Re-render):** Cập nhật State cục bộ chính xác đến từng Sub-component chứa dữ liệu động, giữ nguyên trạng thái tĩnh tuyệt đối cho các Component không thay đổi ở cả cấp độ trang (`Header`, `TypeNovelsList`,...) lẫn bên trong Section (`TitleSection`, `More`,...), triệt tiêu hoàn toàn hiện tượng re-render thừa trên toàn bộ ứng dụng.

### 4. Giao Diện Tương Thích Đa Thiết Bị (Responsive UI)
* Tối ưu hóa giao diện hiển thị chuẩn Responsive cho các màn hình Mobile / Tablet / Desktop bằng SCSS tùy chỉnh kết hợp với hệ thống lưới **Bootstrap 5 Grid System**.

---

## 📂 Cấu Trúc Thư Mục Dự Án (Project Structure)

```text
DOCTRUYENONLINEFULLSTACK/
│
├── client/                     # Frontend App (ReactJS 18)
│   ├── public/
│   └── src/
│       ├── Components/         # Các Reusable Sub-components
│       ├── DataNotUpdate/      # Quản lý dữ liệu tĩnh
│       ├── images/             # Tài nguyên hình ảnh
│       ├── wasm/               # Module WebAssembly (.wasm / .js) tích hợp vào ReactJS
│       ├── App.js / App.scss   # Main Component & Stylesheet
│       ├── index.js            # Entry Point phía Frontend
│       └── updatedData.js      # Xử lý cập nhật State & Data Logic
│
├── database/                   # Thư mục cơ sở dữ liệu
│   └── doc_truyen_online.sql   # File SQL khởi tạo Database & Data
│
├── rootWasm/                   # Mã nguồn C++ cho WebAssembly
│   ├── picosha2.h              # Header C++ thuật toán SHA-256
│   └── SecretKey.cpp           # Source C++ biên dịch WebAssembly
│
├── server/                     # Backend App (Node.js & Express.js với TypeScript)
│   ├── compiled-js/            # Mã JavaScript đã biên dịch từ TypeScript (kèm .map & .d.ts)
│   ├── env/                    # Cấu hình môi trường
│   │   ├── .env.development
│   │   └── .env.production
│   ├── ts/                     # Mã nguồn TypeScript phía Backend
│   │   ├── server.ts           # Express Server & API Routes chính
│   │   └── types.ts            # Định nghĩa các TypeScript Interfaces & Types
│   └── note.txt                # Ghi chú phát triển Backend
│
├── package.json / lock.json    # Quản lý dependencies & scripts của dự án
├── tsconfig.json               # Cấu hình trình biên dịch TypeScript (tsc)
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## ⚙️ Hướng Dẫn Cài Đặt & Chạy Dự Án (Getting Started)

### Yêu cầu hệ thống (Prerequisites)
* Node.js (v16.x trở lên)
* MySQL Server (v8.0 trở lên)

### Các bước khởi chạy

1. **Clone repository về máy local:**
   ```bash
   git clone [https://github.com/DuongPham960309/DocTruyenOnlineFullStack.git](https://github.com/DuongPham960309/DocTruyenOnlineFullStack.git)
   cd DocTruyenOnlineFullStack
   ```