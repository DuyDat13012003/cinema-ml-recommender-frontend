# 🎬 Cinema ML Recommender Frontend

Dự án **Cinema ML Recommender** là ứng dụng web giúp người dùng **tìm kiếm và gợi ý vé xem phim rẻ nhất** trong thành phố, được phát triển bằng **React + Vite + TypeScript + MUI (Material UI)**.  
Frontend này kết nối với hệ thống Backend (Spring Boot + Machine Learning API) để xử lý dữ liệu và hiển thị kết quả gợi ý.

---

| Vai trò                 | Họ và tên              |
| ----------------------- | ---------------------- |
| 🎓 Sinh viên thực hiện  | Nguyễn Nhật Thùy Trinh |
| 🎓 Sinh viên thực hiện  | Nguyễn Hữu Duy Đạt     |
| 🧑‍🏫 Giảng viên hướng dẫn | ThS. Mai Xuân Hùng     |

---

## 🚀 Công nghệ sử dụng

- ⚛️ **React 19** – Framework chính cho giao diện người dùng
- ⚙️ **Vite** – Công cụ build và dev server siêu nhanh
- 💬 **TypeScript** – Giúp code an toàn, dễ bảo trì
- 🎨 **MUI (Material UI)** – Thư viện giao diện hiện đại
- 🌐 **Axios** – Gọi API từ backend
- 🔄 **React Router DOM** – Điều hướng trang
- 🧠 **React Query** – Quản lý state và caching dữ liệu từ server

---

## 📁 Cấu trúc thư mục

cinema-ml-recommender-frontend/
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
├─ public/
└─ src/
├─ api/ # Gọi API đến backend (Spring Boot/ML)
├─ components/ # Các component tái sử dụng
├─ pages/ # Các trang chính (Home, Detail, Search, ...)
├─ hooks/ # Custom hooks (gọi API, logic)
├─ theme.ts # Cấu hình giao diện MUI
├─ App.tsx # Component gốc của ứng dụng
├─ main.tsx # Entry point của React
└─ index.css # CSS global

Ứng dụng này kết nối đến backend qua API (mặc định chạy tại http://localhost:8080).
Cấu hình baseURL tại file src/api/axiosClient.ts

---

## Hướng dẫn sử dụng các lệnh npm

### `npm run dev`

Lệnh này dùng để **chạy ứng dụng ở môi trường phát triển (Development Mode)**.  
Sau khi chạy, Vite sẽ khởi động server local giúp bạn xem và chỉnh sửa code trực tiếp.  
Mỗi khi bạn lưu file, trình duyệt sẽ tự động reload để hiển thị thay đổi.

---

### `npm run build`

Lệnh này dùng để đóng gói ứng dụng cho môi trường production (deploy thật).
Vite sẽ biên dịch TypeScript, tối ưu code, nén file và đưa kết quả vào thư mục dist/
Thư mục này chứa toàn bộ file tĩnh (.html, .js, .css) có thể deploy lên server thật hoặc tích hợp vào backend Spring Boot.
Khi chạy xong, bạn sẽ thấy thư mục:
cinema-ml-recommender-frontend/dist/

---

### `npm run preview`

Lệnh này dùng để chạy thử bản build production ngay trên máy local.
Sử dụng khi bạn muốn kiểm tra ứng dụng sau khi build nhưng trước khi deploy.
