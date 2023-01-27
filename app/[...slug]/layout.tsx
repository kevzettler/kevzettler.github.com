import Body from "../../components/Body";
import Script from 'next/script'

export default function PostLayout({
  children
}) {
  return (
    <html>
      <head />
      <Body>
        <div className="container" id="body-content">
          {children}
          <div id="disqus_thread"></div>
          <Script type="text/javascript" dangerouslySetInnerHTML={{
            __html: `
           /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
          var disqus_shortname = 'kevzettler'; // required: replace example with your forum shortname

          /* * * DON'T EDIT BELOW THIS LINE * * */
          (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
          })();
            `}} />
          <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
          <a href="https://disqus.com" className="dsq-brlink">comments powered by <span className="logo-disqus">Disqus</span></a>
        </div>
      </Body>
    </html>
  );
}
