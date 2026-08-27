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
| **Backend** | Node.js, Express.js **(TypeScript)**, Crypto Verification, express-rate-limit, CORS |
| **Database** | MySQL 8 (`mysql2` connection pool) |
| **Tools** | Git/GitHub, Visual Studio Code |

---

## 🚀 Tính Năng & Kiến Trúc Nổi Bật (Technical Highlights)

### 1. Kiến Trúc Full-Stack (Full-Stack Architecture)
* Xây dựng hệ thống web đọc truyện đáp ứng tải cao, kết hợp **ReactJS 18** cho Frontend, **Node.js/Express.js** cho Backend và hệ quản trị cơ sở dữ liệu **MySQL 8**.

### 2. Mô Hình Bảo Mật API Đa Tầng (Multi-layered API Security)
* **Xác thực Request với WebAssembly (.wasm):** Tích hợp module C++ (`PicoSHA2`) biên dịch sang WebAssembly vào ReactJS để sinh token `x-key` động. Thực hiện băm kết hợp chuỗi bí mật & mốc thời gian thực (**Request Timestamp**) qua thuật toán tiêu chuẩn **SHA-256**, sau đó trộn chuỗi băm với dữ liệu thời gian đã mã hóa nhằm chống Replay Attack và ngăn chặn truy vấn API trái phép từ bên ngoài.
* **Kiểm soát Truy cập (CORS):** Cấu hình Cross-Origin Resource Sharing ở Backend Express.js để giới hạn tên miền truy cập (`http://localhost:3000`), chặn đứng các yêu cầu từ các domain không xác định.
* **Chống tấn công DoS & Brute-Force (Rate Limiting):** Áp dụng middleware `express-rate-limit` để giới hạn số lượng request (tối đa 10.000 requests / 15 phút / IP), bảo vệ hạ tầng máy chủ khỏi nguy cơ quá tải và spam API.

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
├── client/                     # Frontend App (ReactJS 18 & TypeScript)
│   ├── public/                 # Tài nguyên tĩnh công khai (HTML template, favicon, icons, manifest)
│   ├── src/                    # Mã nguồn chính của ứng dụng Frontend
│   │   ├── assets/             # Tài nguyên tài liệu/file tĩnh (WebAssembly binaries, helper JS)
│   │   │   └── wasm/           # Cụm file C++ WebAssembly biên dịch (SecretKey.wasm & SecretKey.js)
│   │   ├── features/           # Các tính năng & giao diện chính của ứng dụng
│   │   │   ├── App/            # Container ứng dụng chính (AppUI, appLogic, app.scss)
│   │   │   └── layouts/        # Bố cục giao diện chung (Main Layout)
│   │   │       └── main-layout/# Bố cục chính gồm các component:
│   │   │           ├── Aside/  # Thanh bên (AsideUI, asideLogic, aside.scss)
│   │   │           ├── Footer/ # Chân trang (FooterUI, footerLogic, footer.scss & hình ảnh bản quyền)
│   │   │           ├── Header/ # Đầu trang (HeaderUI, headerLogic, header.scss & logo)
│   │   │           ├── Main/   # Vùng nội dung trung tâm (MainUI, mainLogic, main.scss)
│   │   │           └── shared/ # Logic & UI dùng chung cho Layout
│   │   └── react-app-env.d.ts  # Khai báo kiểu TypeScript cho Create React App
│   ├── .eslintignore           # Cấu hình bỏ qua các file không kiểm tra linter
│   ├── package.json            # Quản lý dependencies & npm scripts phía Frontend
│   └── tsconfig.json           # Cấu hình trình biên dịch TypeScript phía Frontend
│
├── database/                   # Thư mục cơ sở dữ liệu
│   └── doc_truyen_online.sql   # File SQL khởi tạo Database & Data
│
├── rootWasm/                   # Mã nguồn C++ cho WebAssembly
│   ├── picosha2.h              # Header C++ thuật toán SHA-256
│   └── SecretKey.cpp           # Source C++ biên dịch WebAssembly
│
├── server/                     # Backend App (Node.js & Express.js với TypeScript)
│   ├── dist/                   # Mã JavaScript đầu ra sau khi tsc biên dịch từ TypeScript
│   ├── env/                    # Cấu hình biến môi trường
│   │   ├── .env.development
│   │   └── .env.production
│   ├── images/                 # Tài nguyên hình ảnh tĩnh phục vụ API
│   ├── src/                    # Mã nguồn TypeScript phía Backend
│   │   ├── config/             # Cấu hình hệ thống (Database connection pool, env loader)
│   │   ├── modules/            # Các tính năng/chức năng ứng dụng (Feature-based Modules)
│   │   │   └── home-page/      # Module trang chủ (Controller, Routes, Service/Logic)
│   │   ├── shared/             # Middlewares & Utilities dùng chung
│   │   │   └── middlewares/    # Custom Middleware (Xác thực Request Signature,...)
│   │   ├── app.ts              # Cấu hình Express App (CORS, Rate Limit, Middlewares)
│   │   └── server.ts           # Entry Point khởi chạy Backend Server
│   ├── package.json            # Quản lý dependencies & npm scripts phía Backend
│   └── tsconfig.json           # Cấu hình trình biên dịch TypeScript (tsc)
│
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## ⚙️ Hướng Dẫn Cài Đặt & Chạy Dự Án (Getting Started)

### Yêu cầu hệ thống (Prerequisites)
* Node.js (v16.x trở lên)
* MySQL Server (v8.0 trở lên)

### Các bước khởi chạy

1. **Mở terminal và clone repository về máy local:**

   ```bash
   git clone https://github.com/DuongPham960309/DocTruyenOnlineFullStack.git
   ```

2. **Khởi Tạo Cơ Sở Dữ Liệu (MySQL)**

* Cấu hình cho MySQL Server để khớp thông tin với backend. Tham khảo file .env có đường dẫn: server/env/.env.development.
   ```text
   host = localhost
   port = 3306
   user = root
   password = 123456
   database = doc_truyen_online
   ```
* Trong MySQL Server, import file .sql có đường dẫn: database/doc_truyen_online.sql.

3. **Khởi Chạy Ứng Dụng**

   Mở 2 cửa sổ Terminal song song trong IDE (VS Code) và thực thi lần lượt các lệnh:
* Bước 3.1: Chạy Backend (Server).
   ```cmd
   cd ./server
   npm install   # Cài đặt dependencies (nếu không có thư mục node_modules)
   npm run dev   # Khởi chạy server ở chế độ Development
   ```
* Bước 3.2: Chạy Frontend (Client) *(Sau khi Server đã khởi động thành công)*.
   ```cmd
   cd ./client
   npm install   # Cài đặt dependencies (nếu không có thư mục node_modules)
   npm start     # Khởi chạy ứng dụng ReactJS
   ```