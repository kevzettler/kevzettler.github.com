---
layout: post
title: React Data Fetching With Relay
category: Programming
tags:
  - JavaScript
  - Node.js
  - React
---

# Introduction To React Data Fetching With Relay
React is ushering in a new era of front end web development. Published by Facebook, it has rapidly become a popular technology used in production by [many technology companies](https://github.com/facebook/react/wiki/Sites-Using-React). In this article, we're going to be discussing a new complementary React framework called Relay.

## The Problem With Data Fetching In React
As React has grown in popularity, the scale and complexity of the projects that are built with React have grown along with it. React is primarily a view layer technology. This has caused some teams to hit unknown territory or limitations while building projects that require more infrastructure. Facebook has been proactive in offering support and guidance during these growing pains.

###Flux
One of the early growing pains for developers using React was event handling. Facebook responded to this problem by publishing Flux, which is an abstract pattern that encouraged unidirectional data flow for handling events in React.

We'll assume some familiarity with Flux, so we won't be discussing the details of it in this article. Flux has taken the React ecosystem to a next level. As developers started to get more familiar with Flux, some new pain points began to emerge from it. Flux has been great for managing data as application state, but populating the initial state into an application has been a source of friction.

There are a number of challenges surrounding Flux data initialization. Do stores call the server and populate themselves? Do we use rehydrate methods from the Dispatcher? Do we call a bunch of Actions on the server to populate the stores? How do we do this asyncronously and load all of our data on the server in an isomorphic app before returning a response?

## What Is Relay?
Relay is a new React Data fetching framework published by Facebook. Relay aims to provide a clear solution to all of these data-fetching problems.

Relay has a few main selling points : 

* #####Declarative
This is also a main feature of React. Relay leverages a declarative code style defintion for data dependencies, which is very similar to how view components are defined. This is a rereshing change from traditional impaerative data-fetching APIs.

* #####Colocation
Data dependency definitions live along side companion component definitions which makes it much easier to reason about what data a UI component requires to render. This makes troubleshooting a project's code base a lot easier. Looking at a file that contains a React component definition, it's immediately obvious what data it needs to function.

* #####Mutations
Mutations enable an experince of seamless modifcation to data that a React view is subscribed to and also populates those modifications to the data persistence layer. 

### Relay Vs Flux
Flux is an abstract idea whereas Relay is an implementation inspired by that idea. Relay is built on the concepts of Flux and has the same concepts of Dispatcher, Actions, and Stores, but they are represented a bit differently. Relay has a new concept called 'Higher Order Components' and we'll expand on these more below. It's still unclear if Relay will replace or coincide with exsiting Flux implmentations. For example, [Redux](https://github.com/rackt/redux), a pouplar Flux implmentation, also leverages 'Higher Order Components' to plugin to a React project. Trying to use both Redux and Relay will cause a conflict over which framework is bound to a UI component. There is currently an [on going discussion](https://github.com/rackt/redux/issues/464)regarding Redux's relationship with Relay.

##Higher Order Components
Higher Order components or HOCs are defined the same way as regular react components. HOCs wrap child UI components. The HOC will execute its queries and then render the child UI component, passing the query data in as props. The Flux flow is now managed by the HOC. The HOC will act as a dispatcher. It has methods like `setQueryParams` that can be considered a Flux Action. Calling `setQueryParams` triggers the Flux flow. The queries defined in the HOC are updated, new data is fetched and the data is persisted in the HOC. The HOC is acting as a Flux Store by persisting this data.

Below is a simplified example of a `ProfilePicture` component and a complimentary HOC. Imagine that we have ProfilePicture defined to render user avatars throughout our project. We need to fetch the data to display the user avatar. We then create a Relay HOC to query the user profile pictures from a database. The HOC passes this query data to the child ProfilePicture component.


```javascript
class ProfilePicture extends React.Component { // A standard Profile Picture component }

// This is our Higher Order Component. It fetches the data to pass
// as props to Profile Picture
module.exports = Relay.createContainer(ProfilePicture, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        profilePicture(size: $size) {
          uri,
        },
      }
    `,
  },
});
```

Our `ProfilePicture` component will then get some new local functions passed in as props This essentially is how Relay triggers the Flux flow. The component calls these Relay prop functions, Which is equevilent to a Flux action call. This causes Relay to fetch the latest data requested. Once done it populates its internal Store and passes that down to the HOC's child view component as props.

#GraphQL
The above example may look a bit strange, particularily this part:

```javascript
Relay.QL`
      fragment on User {
        profilePicture(size: $size) {
          uri,
        },
      }
    `,
```

Much of the magic behind Relay is powered by GraphQL. GraphQL is a new query language from Facebook that specializes in operating on graph data structures. We won't be discussing GraphQL in depth in this article because it is a very deep topic. Also, the Relay documentation covers it. GraphQL might be considered a caveat of using Relay. An existing project will not be setup to work with GraphQL right out of the box. The first recommended steps to [getting started with Relay](https://facebook.github.io/relay/docs/getting-started.html#content) are:

1. Create a GraphQL Schema
2. Create a GraphQL Server

It should be noted that it may take a considerable amount of work to convert an existing project to a GraphQL Schema and setup or modify and existing server to be GraphQL friendly. When starting a project from scratch, it might make more sense to use Relay immediately. Facebook provides a [Relay Starter Kit](https://github.com/facebook/relay-starter-kit) that looks like a great solution for getting up and running with Relay and GraphQL on a new project.

## Relay Without GraphQL
With all of the extra overhead required to set up GraphQL, Facebook's Relay might not be the right tool for existing projects. Luckily, there is another 'Relay inspired' library out there that may be a better fit for these projects. [react-transmit](https://github.com/RickWong/react-transmit) is an open source project that aims to be a "Relay-inspired library based on Promises instead of GraphQL."

If we update the profile example from above to use `react-trasmit` then we have the following:

```javascript
import Transmit from "react-transmit";  // Import Transmit.

class ProfilePicture extends React.Component { // A standard Profile Picture component }

// This is our Higher Order Component. It fetches the data to pass
// as props to Profile Picture
Transmit.createContainer(ProfilePicture, {
  fragments: {
    user: (userId) => {
      return new Promise(function(resolve, reject) { 
          //Do some ajax here and resolve the promise
      });
    }
  },
});
```
The react-transmit example looks very similiar to the Relay example. However, in this instance the `user` fragment is now a function that returns a Promise instead of a GraphQL query.

## Current State Of Relay
Facebook has released an [open source 'Technical Preview' of Relay](https://facebook.github.io/react/blog/2015/08/11/relay-technical-preview.html). They have some great examples in the repository that demonstrate working with Relay. In addition to the repository, there is a very thorough [documentation site](https://facebook.github.io/relay/).

It doesn't appear that Relay is suitable for isomorphic applications at this time. There is no way to tell Relay to wait until all of the data dependencies have been loaded before rendering its child view. A work flow that is needed on the server. There is on going disscussion regarding how [Relay will work on the server](https://github.com/facebook/relay/issues/136). This is a pattern that react-transmit is more suited to at the current time.

## Future of Relay
Relay's road map aims to provide a few key features in the immediate future:

*  Adapters for other data storage types so there is no hard dependency on GraphQL. 
*  [Better isomorphic support](https://github.com/facebook/relay/issues/136) as disscussed earlier.