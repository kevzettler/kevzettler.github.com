import "../public/css/bootstrap.min.css";
import "../public/css/solarized.css"
import "../public/css/bootstrap-responsive.css";
import "../public/css/main.css";
import Body from "../components/Body"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <Body>
        <div className="container" id="body-content">
          {children}
        </div>
      </Body>
    </html>
  )
}
