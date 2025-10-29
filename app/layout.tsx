import "./globals.css";
import MainLayout from "../components/layouts/MainLayout";
import Wrapper from "../components/common/Wrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          <Wrapper>{children}</Wrapper>
        </MainLayout>
      </body>
    </html>
  );
}
