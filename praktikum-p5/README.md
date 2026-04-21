# 📱 Praktikum P5: React Native Form & Navigation Stabilization

A professional React Native (Expo) application focusing on advanced form validation, multi-step registration wizards, and secure authentication flows. Optimized for **Expo SDK 55** and the **React Native New Architecture**.

---

## 🚀 Key Features

- **🛡️ Secure Auth Flow**: Conditional navigation that strictly hides administrative features (Hamburger/Drawer) until a valid login.
- **⚡ Advanced Validation**: Real-time form validation with custom error messaging for Login, Registration, and Surveys.
- **🪄 Registration Wizard**: A multi-step form experience (Wizard) for complex data entry.
- **⚓ Navigation v7**: Utilizing the latest `@react-navigation` suite for seamless native transitions and React 19 compatibility.
- **💎 Premium UI**: Modern aesthetics using consistent color palettes, high-quality assets, and optimized layouts for various screen sizes.

---

## 🛠️ Tech Stack & Environment

| Component           | Version / Technology |
|---------------------|----------------------|
| **Core Framework**  | Expo SDK 55 (Latest) |
| **Engine**          | React Native 0.83.4 |
| **UI Library**      | React 19.2.0        |
| **Architecture**    | New Architecture (Fabric) |
| **Navigation**      | React Navigation v7 |
| **Animations**      | Reanimated 4.2.1    |
| **Worklets**        | NativeWorklets 0.7.2|

---

## 📥 Getting Started

### 1. Prerequisites
Ensure you have Node.js and the Expo Go app installed on your device/emulator.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/anwarrohmadi2006/React-Native-Anwar.git

# Navigate to the project
cd praktikum-p5

# Install dependencies
npm install
```

### 3. Running the App
```bash
# Start the Expo server (Clear cache recommended)
npx expo start --clear

# Run on Android
Press 'a' in the terminal
```

---

## 🔑 Dummy Accounts (Testing)

Use the following credentials to bypass the Auth Stack and access the Main Application:

| Email              | Password   | Role  |
|--------------------|------------|-------|
| `admin@test.com`   | `Admin123` | Admin |
| `user@test.com`    | `User1234` | User  |

---

## 📂 Project Structure

- `screens/`: Contains all UI screens (Login, Home, Wizard, etc.)
- `navigation/`: Centralized navigation logic and Auth Flow management.
- `assets/`: Optimized PNG assets for icons and splash screens.
- `app.json`: Core configuration for Expo and the New Architecture.

---

## 🧑‍💻 Author
**Anwar Rohmadi**  
*Pemrograman Perangkat Bergerak - Praktikum Mobile Programming*

---

> [!NOTE]
> This project has been stabilized to resolve historical `installTurboModule` and `NativeWorklets` conflicts found in earlier SDK versions. It is fully ready for deployment.
