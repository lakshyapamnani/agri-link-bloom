🌾 AgriLink

AgriLink is a web-based platform that connects local farmers directly with consumers, enabling the delivery of fresh, affordable, and chemical-free produce from farm to doorstep.

🚀 Why AgriLink?

The gap between farmers and end consumers is filled with middlemen, driving up prices for consumers while reducing profit margins for farmers. AgriLink empowers both parties:

👨‍🌾 Farmers get fair pricing and visibility.

🏡 Consumers get fresh farm produce straight to their homes.



---

🌐 Features

👨‍🌾 Farmer Dashboard

Add, update, and manage products.

Track orders and delivery requests.

View feedback and consumer interest.


🛒 Consumer Panel

Browse nearby farms and their products.

Add items to cart and place orders.

Track order status and delivery timeline.


🔁 Real-Time Sync

Products added by farmers appear live on the consumer side.

Instant updates for availability, pricing, and order fulfillment.


🔒 Secure & Scalable

Built using modern web technologies with secure authentication and real-time database syncing.



---

🧰 Tech Stack

Frontend	Backend	Database	Realtime

React.js	Node.js / Express.js	MySQL / Firebase	WebSockets / Firebase Realtime DB



---

📦 Installation

```bash
git clone https://github.com/yourusername/agrilink.git
cd agrilink
npm install
```

## Environment Configuration

Create a `.env` file in the project root with the following variables:

```bash
# Gemini AI API Configuration
GOOGLE_API_KEY=your_gemini_api_key_here
# or GEMINI_API_KEY=your_gemini_api_key_here

# Default Gemini Model (optional)
GEMINI_MODEL=gemini-1.5-flash-latest

# Frontend API Base URL (optional)
VITE_API_BASE_URL=http://localhost:3001

# Database Configuration (if using MySQL)
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
```

## Running the Application

1. Start the backend server:
```bash
npm run dev:server
```

2. In a separate terminal, start the frontend:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Available AI Models

The AI Assistant supports multiple Gemini models:
- **Gemini 1.5 Flash (Fast)** - Quick responses, good for general queries
- **Gemini 1.5 Pro (Advanced)** - More capable, better for complex tasks
- **Gemini 1.0 Pro (Legacy)** - Stable older version
- **Gemini Pro (Stable)** - Reliable production model


---

🤝 Contributing

AgriLink is open for contributions from developers, designers, and anyone passionate about agri-tech. Open an issue or submit a pull request!


---

📄 License

This project is licensed under the MIT License.


---

💡 Future Plans

📱 Launch mobile app version (React Native / Flutter)

🔍 Add location-based smart recommendations

🧠 AI-based demand forecasting for farmers

💬 In-app chat between farmers and consumers

📦 Integrate local delivery services



---

🧑‍💻 Made with ❤️ by College Innovators
