import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <meta name="description" content="San Francisco bay area fullstack software engineer and product development" />
        <meta name="keywords" content="Oakland, Bay Area,  Freelance, software engineer, React, WebGl, Tech Writer" />
      </Head>
      <div className="container" id="body-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="row">
            <div className="span12">
              <h1>About Kev Zettler</h1>
            </div>
          </div>
          <div className="row">
            <div className="span3">
              <img src="/img/kev.jpeg" style={{ padding: "10px 0" }} />
            </div>
            <div className="span3" style={{ padding: "30px 0" }}>
              <p>Kev is a San Francisco bay area fullstack engineer and entrepreneur.</p>

              <p>Currently available to hire for remote contract work</p>

              <p>You can find Kev on:</p>
              <ul>
                <li><a href="https://github.com/kevzettler">Github</a></li>
                <li><a href="https://www.linkedin.com/in/kev-zettler/">Linkedin</a></li>
                <li><a href="https://www.twitter.com/kevzettler">Twitter</a></li>
                <li><a href="https://www.upwork.com/o/profiles/users/_~01728af9ddb3ece22a/">Upwork</a></li>
                <li><a href="https://kevzettler.itch.io/">Itch.io</a></li>
              </ul>

              <p>External technical writing appearances:</p>
              <ul>
                <li><a href="https://www.google.com/search?q=atlassian.com%3A+kevzettler&sxsrf=AJOqlzWBIZVy7lJQcrY_q5w5ljwmsGO6jA%3A1674577643303&source=hp&ei=6wbQY7G4EKf7kPIPxea_4Ak&iflsig=AK50M_UAAAAAY9AU-3jp2JxJrQuWyJ4u3q2im7dyRVZ2&ved=0ahUKEwjx2c3sz-D8AhWnPUQIHUXzD5wQ4dUDCAo&uact=5&oq=atlassian.com%3A+kevzettler&gs_lcp=Cgdnd3Mtd2l6EAMyBQghEKABMgUIIRCgATIFCCEQoAEyBQghEKABOgQIIxAnOhEILhCABBCxAxCDARDHARDRAzoLCAAQgAQQsQMQgwE6CAguELEDEIMBOggILhCxAxCABDoOCC4QgAQQsQMQxwEQ0QM6BQgAEIAEOgsILhCABBCxAxCDAToOCC4QgwEQ1AIQsQMQgAQ6DgguEIAEELEDEIMBENQCOg4ILhCxAxCDARDHARCvAToICAAQsQMQgwE6FAguEIAEELEDEIMBEMcBEK8BENQCOgsIABCABBCxAxDJAzoLCC4QgAQQxwEQrwE6EwguEIAEELEDEIMBEMcBENEDEAo6DQgAEIAEELEDEIMBEAo6CwgAEBYQHhAPEPEEOgUIABCGAzoICCEQFhAeEB1QAFigJGCVJWgAcAB4AIABmgGIAdgQkgEEMTcuN5gBAKABAQ&sclient=gws-wiz">Atlassian</a></li>
                <li><a href="https://www.sitepoint.com/author/kzettler/">Sitepoint.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
