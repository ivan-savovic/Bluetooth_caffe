# Bluetooth_caffe - Work in progress


App Name & Slug:

Name: "Bluetooth Phone Connector"

Slug: "bluetooth-phone-connector" — used in URLs and package naming.

Version & Orientation:

Version: "1.0.0" — initial release version.

Orientation: "portrait" — fixed portrait mode only.

Icons & Splash Screens:

App icon: "./assets/images/icon.png"

Splash screen: image at "./assets/images/splash-icon.png", resize mode "contain", white background.

Platform-specific settings:

iOS: supports tablets, bundle ID is "app.rork.bluetooth-phone-connector"

Android: adaptive icon configured with foreground and white background, package name matches iOS bundle ID.

Web: favicon specified.

Scheme: "myapp" — used for deep linking and universal links.

User Interface Style: automatic, which follows system light/dark mode.

New Architecture Enabled: "newArchEnabled": true — opting in for the latest Expo/React Native architecture.

Plugins:

expo-router configured with an origin URL https://rork.app/.

Experiments:

Typed routes enabled for improved type safety in routing.

Suggestions & Best Practices
Scheme:

Consider using a more app-specific scheme than "myapp" for clarity and to avoid conflicts (e.g., "bluetoothphoneconnector" or "bpc").

Versioning:

Keep version consistent with semantic versioning. If you also use android.versionCode and ios.buildNumber, those should be specified separately for proper app store handling.

Icon and Splash Image Sizes:

Verify your icon and splash images meet the recommended sizes for each platform (e.g., 512x512 for icon, 1242x2436 for splash on iOS).

Adaptive Icon Background:

You use white background, which is fine. Make sure the foreground image has transparent background to allow proper display.

Deep Linking:

Since you define scheme and use expo-router, double-check your routing and linking configuration to ensure seamless navigation from external links.

