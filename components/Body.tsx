function NavBar() {
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


export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
