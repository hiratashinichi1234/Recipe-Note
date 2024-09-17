/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
      // 必要に応じて experimental 設定を追加
  },
  // グローバルCSSの設定が正しく動作するように確認
  cssModules: true, // CSSモジュールが必要な場合
};

export default nextConfig;
