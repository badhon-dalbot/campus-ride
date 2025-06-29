# 🎓🚗 CampusRide

**CampusRide** is a university-exclusive ride-sharing platform designed to connect students and staff for daily commutes. It ensures cost-effective, secure, and community-based transportation by allowing only verified university members to share rides.

---

## 📸 Demo

> *(To be added)*

- 🔗 [Live Demo](https:)
- 📷 Screenshots:

---

## ✨ Key Features

- 🔍 **Search Rides**: Easily find upcoming rides by time, route, or availability.
- ✍️ **Post a Ride**: Offer rides with route, date, seat count, and pricing.
- 🔄 **Real-Time Updates**: Live tracking of rides and status updates.
- 👥 **User System**: Profile, authentication, trust scores, and ratings.
- 💬 **Built-in Chat**: Communicate with drivers/passengers securely.
- 🔔 **Notifications**: Get alerts about requests, acceptances, cancellations, etc.
- 🧾 **History Log**: See your previous rides and interactions.

---


## 🛠️ Tech Stack

| Type           | Technology                    |
|----------------|-------------------------------|
| Frontend       | React                         |
| Styling        | Tailwind CSS                  |
| Backend        | Node.js + Express             |
| Database       | MySQL                         |
| Authentication | JWT                           |
| Real-Time      | Socket.IO                     |

---


## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js ≥ 16
- npm or yarn
- MySQL (local or cloud)
- Git

### Installation
1. **Clone the repo**

```
git clone https://github.com/badhon-dalbot/campus-ride.git
```
```
cd campus-ride
```
2. **Install dependencies**
``` 
npm install
```
3. **Run the Application**
#### Backend

```
npm start
```
#### Frontend (in a new terminal)
```
npm run dev
```
Visit http://localhost:5173 to use the app.

---
## 🧪 Testing
Coming soon!

## ❓ FAQs
Q: Who can use CampusRide?
A: Currently, only verified students from registered universities.

Q: Is CampusRide free?
A: Yes, but ride providers may request a small fee for fuel.

Q: Can I cancel a ride request?
A: Yes. Requests can be canceled until accepted.

Q: How is trust handled?
A: Users can rate each other and report issues. Moderation tools are in progress.

## 🐞 Known Issues
- 🚫 Ride map is currently static (in progress).

- 📵 No SMS or email notifications yet.

- 🐛 Some mobile layouts need polish.

- 🔐 No admin/moderator panel yet.

## 🔮 Future Plans
- ✅ Admin dashboard for managing users and complaints

- 🔄 Automated ride suggestions based on history

- 📲 Publish as native Android/iOS app

- 🧠 ML for optimizing ride matches

- 🌍 Community carpool expansion

## 🤝 Contributing
Contributions are welcome!
#### Fork the repo
#### Create a feature branch
```bash
git checkout -b feature-xyz
```
#### Make changes and commit
```bash
git commit -m "Add feature xyz"
```
#### Push to GitHub and open PR
```bash
git push origin feature-xyz
```

## Check CONTRIBUTING.md (to be added) for full guidelines.

## 📄 License
This project is licensed under the MIT License. See [LICENSE](https://github.com/badhon-dalbot/campus-ride/tree/main?tab=MIT-1-ov-file) for more info.



### ⭐ Show your support
If you like the project, consider giving it a ⭐ on GitHub!

## Features

### Driver Features
- **Driver Dashboard**: View earnings, ratings, upcoming rides, and vehicle information
- **Offer Rides**: Create new rides with a 3-step process:
  1. Basic ride details (from/to, date, time, seats, price)
  2. Map selection for pickup and dropoff points using Google Maps
  3. Review and confirmation
- **Ride Management**: View and manage ride requests from riders
- **Earnings Tracking**: Monitor daily and weekly earnings

### Rider Features
- **Find Rides**: Browse available rides with filters
- **Book Rides**: Request rides from drivers
- **Chat**: Communicate with drivers during rides
- **Payment**: Manage payment methods and view payment history

## API Endpoints

### Ride Management
- `POST /api/rides` - Create a new ride (drivers only)
- `GET /api/rides` - Get all rides
- `GET /api/rides/available` - Get available rides for booking
- `GET /api/rides/:id` - Get specific ride details
- `POST /api/rides/requests` - Create ride request (riders)
- `GET /api/rides/requests/:id` - Get ride request details

### Driver Dashboard
- `GET /api/driver/:id/dashboard` - Get driver dashboard data
- `GET /api/driver/:id/ride-requests` - Get pending ride requests
- `GET /api/driver/:id/accepted-rides` - Get accepted rides
- `PATCH /api/ride-request/:id` - Update ride request status

## Database Schema

The application uses the following main tables:
- `users` - User accounts (drivers and riders)
- `rides` - Ride offerings from drivers
- `ride_requests` - Booking requests from riders
- `ride_fares` - Calculated fares for rides
- `vehicles` - Driver vehicle information
- `ratings` - User ratings and reviews
