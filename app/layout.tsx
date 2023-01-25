import "../public/css/bootstrap.min.css";
import "../public/css/solarized.css"
import "../public/css/bootstrap-responsive.css";
import "../public/css/main.css";
import Script from 'next/script'

export function NavBar() {
  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
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
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <NavBar />
        {children}
        <Script dangerouslySetInnerHTML={{
          __html: `
      var _gaq=[['_setAccount','UA-33186180-1'],['_trackPageview']];
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
          `}} />
      </body>
    </html >);
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
