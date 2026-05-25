import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Racun Shopee - 65+ Produk Viral & Original",
  description: "Pilihan produk viral terbaik dari Shopee. Skincare, Fashion, Sepatu, Tas, Gadget, Home, Food. Diskon up to 50%. Gratis Ongkir!",
  keywords: ["shopee", "racun shopee", "produk viral", "skincare", "fashion", "diskon shopee", "affiliate"],
  authors: [{ name: "Racun Shopee" }],
  openGraph: {
    title: "Racun Shopee - 65+ Produk Viral",
    description: "Pilihan produk viral terbaik dari Shopee. Diskon up to 50%!",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Racun Shopee",
    description: "65+ Produk Viral dari Shopee. Klik & Belanja Sekarang!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
