# AGENTS.md

## Project
Marketplace Mini — React Native Expo SDK 55

## Stack
- Expo SDK 55
- React Native
- TypeScript
- Expo Router or React Navigation (choose the simplest Expo-compatible structure)
- Context API for global cart state

## Setup
Project is expected to be created with:

npx create-expo-app@latest --template default@sdk-55

Do not downgrade the project structure unless explicitly requested.

## Agent goals
Build a mini marketplace mobile app for a Programming Mobile practicum using FlatList, loading states, navigation, and Context API, while keeping the UI polished like a real e-commerce app.

## Required features
- Home screen with horizontal promo FlatList
- Horizontal category chip FlatList
- 2-column product FlatList
- Loading state for 2 seconds before data appears
- ActivityIndicator loading UI
- Skeleton shimmer loading
- Product cards with placeholder image, title, price, rating, badge
- Tap product opens Product Detail screen
- Detail screen has “Tambah ke Keranjang” Alert confirmation
- Cart screen in separate tab
- Cart list with total price
- Infinite scroll via onEndReached
- Global cart state using Context API

## UI direction
- Inspired by JD.ID, Tokopedia, and modern Asian e-commerce apps
- White surface base
- Orange-red promotional accents
- Light blue / soft gray support colors
- Rounded cards, soft shadows, readable density
- Premium but still practical for student codebase
- Do not use dark cyberpunk or SaaS dashboard aesthetics

## Code rules
- Prefer small reusable components
- Use stable unique IDs for keyExtractor
- Avoid using array index as key
- Keep dummy data realistic and consistent
- Use clear file naming
- Avoid overengineering
- Stay fully compatible with Expo managed workflow

## File structure preference
- app/ or screens/
- components/
- context/
- data/
- utils/
- constants/

## Implementation notes
- Simulate initial loading with setTimeout(2000)
- Use ActivityIndicator for mandatory loading state
- Add skeleton shimmer as bonus challenge
- Use Alert.alert for add-to-cart confirmation
- Use FlatList optimization-minded props where reasonable
- Ensure currency formatting is Indonesian Rupiah

## Documentation output
When generating the project, also provide:
1. Feature checklist mapping to practicum requirements
2. Short explanation of virtualization, keyExtractor, SectionList, and loading state UX
3. Brief run instructions

## Expo-specific behavior
If using AI coding support or skills, prioritize Expo-compatible patterns and avoid unsupported native packages unless they are confirmed to work in Expo managed workflow.