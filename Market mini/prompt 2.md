You are a senior React Native + Expo engineer and mobile commerce UI architect.

Create a production-grade mobile marketplace app built with React Native and Expo SDK 55, designed for a university practical assignment but polished like a real 2026 Asian e-commerce app inspired by JD.ID, Tokopedia, and premium mass-market commerce platforms.

Project setup requirements:
- Use Expo SDK 55
- Assume the project is created with:
  npx create-expo-app@latest --template default@sdk-55
- Use Expo-friendly libraries only
- Keep the implementation compatible with a standard Expo managed workflow
- The code should be structured cleanly, readable for students, but visually premium
- Add AGENTS.md guidance for Expo SDK 55 and Expo skill usage

Goal:
Build a high-fidelity marketplace mini app that looks energetic, trustworthy, polished, conversion-focused, and realistic enough to resemble a real app used by millions, while fully satisfying the practicum requirements for FlatList and SectionList learning outcomes.

Design direction:
- Bright marketplace aesthetic with white base surfaces
- Strong orange-red promotional accents
- Soft gray and light blue secondary surfaces
- Premium rounded cards
- Layered depth with subtle shadows
- Moderate glassy highlight effects only where appropriate
- Dense but readable hierarchy
- Comfortable spacing
- Strong CTA emphasis
- Avoid generic SaaS startup appearance
- Avoid dark cyberpunk style
- Avoid excessive gradients
- Keep the interface cheerful, commercial, efficient, and premium

Language:
- Use Bahasa Indonesia for all visible UI text
- Use realistic Indonesian product names
- Use realistic Rupiah currency formatting such as Rp129.000

Core screens that must exist:
1. Home screen
2. Product detail screen
3. Cart screen as a separate tab

Mandatory practicum implementation:
1. Home screen must contain a horizontal FlatList for promo banners
2. Under the banner, show a horizontal FlatList of category filter chips
3. Under the category chips, show a 2-column FlatList grid of product cards
4. Before data appears, show loading state for 2 seconds
5. Use ActivityIndicator during loading
6. Also add animated skeleton loading using gray shimmering placeholder views
7. Every product card must show:
   - colored placeholder image
   - product title
   - price formatted in Rupiah
   - star rating
   - optional discount badge or “Terlaris” badge
   - subtle wishlist icon
8. Tapping a product must navigate to Product Detail screen
9. Product Detail screen must have:
   - large product hero placeholder image
   - product title
   - formatted Rupiah price
   - rating
   - sold count
   - stock status
   - feature tags
   - short product description
   - primary button “Tambah ke Keranjang”
   - secondary button “Beli Sekarang”
10. When “Tambah ke Keranjang” is pressed, show an Alert confirmation
11. Cart must be a separate tab
12. Cart screen must show a FlatList of added products
13. Cart screen must show subtotal, shipping, service fee, and total
14. Cart screen must have a sticky checkout button
15. Use global state with Context API for cart management
16. Implement infinite scroll using onEndReached to append more products
17. Make the app architecture clean and suitable for Expo + React Native learning

Technical implementation requirements:
- Use functional components and React hooks
- Prefer TypeScript
- Use reusable components
- Separate constants, dummy data, context, screens, and small UI components
- Keep navigation clean and Expo-compatible
- Use bottom tabs for Home and Cart
- Product detail can be pushed using stack navigation inside the tab flow
- Keep dummy data realistic and stable with unique IDs
- keyExtractor must use stable unique IDs, never array index
- Simulate async loading with setTimeout for 2 seconds before first render of data
- Infinite scroll should append new but varied product data when onEndReached fires
- Maintain good list performance mindset
- Styling should look polished enough for screenshots and documentation

Deliverables:
1. A complete React Native Expo app implementation
2. A clear folder structure
3. AGENTS.md for Expo SDK 55 project guidance
4. Short explanation of how the implementation satisfies each practicum point
5. Answers to the 4 analytical questions below in concise academic Indonesian

Analytical questions that must be answered:
1. Jelaskan konsep virtualization pada FlatList. Mengapa ini lebih efisien daripada ScrollView + map() untuk data besar?
2. Mengapa keyExtractor sebaiknya menggunakan ID unik, bukan index array? Apa masalah yang bisa muncul saat data di-filter?
3. Kapan SectionList lebih tepat dipakai dibanding FlatList? Berikan 2 contoh kasus nyata aplikasi mobile.
4. Mengapa loading state penting untuk UX? Apa dampaknya jika loading state tidak diimplementasikan?

Quality target:
- The UI should look like a realistic modern marketplace app
- The code should be implementable immediately in Expo
- The result should feel more premium than classic JD.ID styling
- The layout must be suitable for FlatList-based learning
- All required practicum features must be visibly implemented, not just mentioned