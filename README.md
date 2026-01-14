🎬 Cinema ML Recommender — Frontend

Ứng dụng web hỗ trợ đặt vé xem phim, gợi ý phim rẻ nhất, quản lý tài khoản, OTP quên mật khẩu, phân quyền ADMIN/USER, phát triển bằng React + Vite + TypeScript + Material UI.

👥 Nhóm thực hiện
Vai trò	Họ và tên
🎓 Sinh viên thực hiện	Nguyễn Nhật Thùy Trinh
🎓 Sinh viên thực hiện	Nguyễn Hữu Duy Đạt
🧑‍🏫 Giảng viên hướng dẫn	ThS. Mai Xuân Hùng
🚀 Công nghệ sử dụng

⚛️ React 19 (SPA)

⚡ Vite

💙 TypeScript

🎨 Material UI (MUI v6)

🌐 Axios

🔄 React Router DOM

🧠 React Query

🔐 LocalStorage Authentication (Mock)

📁 Cấu trúc thư mục
cinema-ml-recommender-frontend/
│
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── package-lock.json
│
└─ src/ ├─ api/ # Gọi API đến backend (Spring Boot/ML) 
        ├─ components/ # Các component tái sử dụng 
        ├─ context/ # Toàn bộ context chính (Auth, Watched, Community, ...)
        ├─ pages/ # Các trang chính (Home, Detail, Search, ...) 
        ├─ hooks/ # Custom hooks (gọi API, logic) ├─ theme.ts # Cấu hình giao diện MUI 
        ├── router/
        ├─ App.test.tsx
        ├─ App.tsx # Component gốc của ứng dụng ├─ main.tsx # Entry point của React 
        ├─ index.tsx 
        ├─ setupTests.ts 
        └─ index.css # CSS global

🔐 Hệ thống Authentication Mock (LocalStorage)

Toàn bộ hệ thống tài khoản hoạt động offline bằng localStorage.

✔ Auto-create Admin

Tự tạo tài khoản admin khi chạy lần đầu:

email: admin@gmail.com

password: 123456

role: ADMIN

✔ Đăng ký (Register)

Lưu user vào localStorage.users

Kiểm tra email tồn tại

Gán role mặc định: USER

✔ Đăng nhập (Login)

Kiểm tra email & password

Lưu session: email, role

Điều hướng:

ADMIN → /admin

USER → /

✔ Quên mật khẩu (OTP Flow)
1) Gửi OTP

Hàm sendResetOTP(email)

Tạo 6 số: 123456

Lưu vào localStorage.reset_otp & localStorage.reset_email

2) Xác thực OTP

Hàm verifyOTP(otp)

3) Đặt lại mật khẩu

Hàm resetPassword(newPass)

Cập nhật mật khẩu vào danh sách user

✔ Đổi mật khẩu trong phần Cài đặt (Settings)

Hàm:

updatePassword(newPass)


Chỉ hoạt động khi đã đăng nhập

Ghi đè mật khẩu user hiện tại

Không đăng xuất

🎥 Booking + Watched Movies

Khi user đặt vé → gọi addWatched(movie)

Lưu lịch sử xem phim

Hiển thị trong trang “Phim đã xem”

Lọc theo thể loại

Sắp xếp theo rating, thời gian, bảng chữ cái

🛡 System Routes
Component	Chức năng
ProtectedRoute	Chặn truy cập nếu chưa đăng nhập
AdminRoute	Chỉ cho ADMIN vào Admin Dashboard
🖥 Hướng dẫn chạy dự án
▶️ Chạy chế độ Development
npm install
npm run dev


Truy cập: http://localhost:3000

🏗 Build Production
npm run build


Kết quả nằm trong thư mục: dist/

👀 Preview bản build
npm run preview

🔌 Kết nối Backend

Frontend gọi API tại:

http://localhost:8080


Cấu hình ở:

src/api/axiosClient.ts
