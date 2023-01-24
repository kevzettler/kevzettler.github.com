import "../public/css/bootstrap.min.css";
import "../public/css/solarized.css"
import "../public/css/bootstrap-responsive.css";
import "../public/css/main.css";

export function NavBar() {
  return (
    <div className="navbar-inner">
      <div className="container">
        <button type="button"
          className="btn btn-navbar"
          data-toggle="collapse"
          data-target=".nav-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="brand" href="/">Kev Zettler</a>
        <div className="nav-collapse collapse">
          <ul className="nav">
            <li className="">
              <a href="/">Blog</a>
            </li>
            <li className="">
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <NavBar />
          {children}
        </div>
      </body>
    </html>);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Shell>
      <div className="container">
        {children}
      </div>
    </Shell>
  )
}
