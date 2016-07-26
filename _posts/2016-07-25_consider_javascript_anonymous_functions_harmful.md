# Consider Javascript Anonymous Callbacks An Anti Pattern

Just consider it for a moment.

2012 - async code in Javascript is hard, Promises are the solution!
2015 - async code in Javascript is hard, Generators and yeild are the solution!
2017 - async code in Javascript is hard, ES7 Async/Await coroutines are the solution!

Stop. please. Lets use our energy elsewhere. If you haven't read this already please do http://callbackhell.com/ I've touched on this topic previously as well but didn't articulate it as cleary as i'd liked [ link to callback ]

The real culptirt. Inline anonymous callback functions.

Stop using them. Tell your linter to alert you to their presence.


```
setTimeout(function(){
  throw "lol broke";
}, 0);
```


```
setTimeout(CoolThing function(){
  throw "lol broke";
});
```


```
CoolThing function(){
  throw "lol broke";
}

setTimeout(CoolThing);

```
   export function translationStatus(smartlingConfig) {
   return files => files.reduce((promise, file) =>
   promise.then((responses) => {
   logger.debug('Making translation status request:');
   logger.debug('\tlocale:', file.fileConfig.locale);
   logger.debug('\tfileUri:', file.smartlingUri);

   return axios.get(smartlingConfig.url('file/status'), {
   params: {
   apiKey: smartlingConfig.apiKey,
   projectId: smartlingConfig.projectId,
   locale: file.fileConfig.locale,
   fileUri: file.smartlingUri,
   },
   })
   .then((response) => responses.concat(response));
   }), Promise.resolve([]))

   .then(responses => responses.reduce((complete, response) => {
   const data = response.data.response.data;
   logger.debug('Got status of:', data.fileUri);
   logger.debug('\tstringCount:', data.stringCount);
   logger.debug('\tcompletedStringCount', data.completedStringCount);
   return complete && data.stringCount === data.completedStringCount;
   }, true))
   .then((complete) => (complete ? completeStatus : incompleteStatus));
   }
