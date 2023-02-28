// _app.js
import "../public/css/bootstrap.min.css";
import "../public/js/vendor/highlight/styles/solarized_light.min.css";
import "../public/css/bootstrap-responsive.css";
import "../public/css/main.css";
import Body from "../components/Body"
import Script from 'next/script'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      var _gaq=[['_setAccount','UA-33186180-1'],['_trackPageview']];
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
        `}} />
      <Body>
        <Component {...pageProps} />
      </Body>
    </>
  )
}
export default App
