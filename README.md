Đây là README.md version ngắn gọn, chỉ tập trung vào cách chạy dự án:[1][2][3]

```markdown
# Todo List CRUD - ExpressJS + Prisma + MySQL

Dự án học tập về xây dựng ứng dụng Todo List với Node.js, Express.js, Prisma ORM và MySQL.

## 🚀 Cách chạy dự án

### 1. Clone và cài đặt

```
git clone https://github.com/azoom-ho-xuan-tuan-hung/Learn-ExpressJS-JS.git
cd Learn-ExpressJS-JS
npm install
```

### 2. Cấu hình Database

Tạo file `.env`:

```
DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

### 3. Setup Prisma

```
npm run prisma:generate
npm run prisma:migrate
```

### 4. Chạy server

```
npm run dev
```

Truy cập: `http://localhost:3000`

## 📝 Scripts

```
npm run dev              # Chạy server với nodemon
npm run prisma:migrate   # Chạy migrations
npm run prisma:studio    # Mở Prisma Studio
```

## 🛠️ Tech Stack

- Node.js + Express.js v5
- Prisma ORM v6.16
- MySQL / PostgreSQL
- JWT Authentication
- Tailwind CSS

## 👤 Author

**Ho Xuan Tuan Hung** - [@azoom-ho-xuan-tuan-hung](https://github.com/azoom-ho-xuan-tuan-hung)
```

***

## File README.md siêu ngắn gọn (minimal version)

Nếu muốn **CỰC KỲ NGẮN GỌN**, đây là version tối giản nhất:[2][3]

```markdown
# Todo List - ExpressJS + Prisma + MySQL

## Cách chạy

```
# Clone và cài đặt
git clone https://github.com/azoom-ho-xuan-tuan-hung/Learn-ExpressJS-JS.git
cd Learn-ExpressJS-JS
npm install

# Tạo file .env
DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
JWT_SECRET="your-secret-key"
PORT=3000

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Chạy server
npm run dev
```

Truy cập: http://localhost:3000
```

***

## Quick Start (1 section duy nhất)

Hoặc thêm phần **Quick Start** vào README chính:[5][1]

```markdown
## ⚡ Quick Start

```
git clone https://github.com/azoom-ho-xuan-tuan-hung/Learn-ExpressJS-JS.git
cd Learn-ExpressJS-JS
npm install

# Tạo .env với DATABASE_URL và JWT_SECRET
npm run prisma:generate && npm run prisma:migrate
npm run dev
```

Mở `http://localhost:3000` để sử dụng app.
```