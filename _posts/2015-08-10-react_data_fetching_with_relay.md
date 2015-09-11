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
React is ushering in a new era of front end web development. Published by Facebook, it has rapidly become a popular technology used in production by [many technology companies](https://github.com/facebook/react/wiki/Sites-Using-React). In this article, we're going to be discussing a new complimentary React framework called Relay.

## The Problem With Data Fetching In React
As React has grown in popularity, the scale and complexity of projects built with React has grown with it. This has caused some teams to hit unknown territory or limitations while building their projects. Facebook has been proactive in offering support and guidance during these growing pains. 

###Flux
One of these early growing pains for developers was event handling. Facebook responded by publishing Flux, an abstract pattern for handling unidirectional data flow from events in React.

We'll assume some familiarity so we won't be discussing the details of Flux in this article. Flux has taken the React ecosystem to a new level. As developers started getting more familiar with Flux, some new pain points began to emerge. Flux has been great for managing data as application state but populating the initial state into an application has been a source of friction.

Some of the challenges around Flux data initialization have been. Do stores call the server and populate themselves? Do we use rehydrate methods from the Dispatcher? Do we call a bunch of Actions on the server to populate the stores? How do we do this asyncronously, load all our data on the server in an isomorphic app before returning a response?

## What Is Relay?
Relay is a new React Data fetching framework published by Facebook. Relay aims to provide a clear solution to these data fetching problems.

Relay has a few main selling points : 

* #####Declarative
Also a selling point of React. Relay leverages a declaritive style defintion of data dependencies in a similar gramatical style to how you define your view components. A rereshing change from traditional impaerative data fetching APIs

* #####Colocation
Data dependency definitions live along side companion component definition. Making it much easier to reason about what data a UI component is dependent on.

* #####Mutations
Relay lets you mutate data on the client and server using GraphQL mutations, and offers automatic data consistency, optimistic updates, and error handling.

### Relay Vs Flux
Flux is an abstract idea while Relay is an implementation inspired by that idea. Relay is built on the concepts of Flux and has the same concepts of: Dispatcher, Actions, and Stores, but they are represented a bit differently. Relay has a new concept called 'Higher Order Components' We'll expand on these below. Its still unclear if it Relay will replace or coenside with exsiting Flux implmentations. For example, [Redux](https://github.com/rackt/redux) a pouplar Flux implmentation also leverages 'Higher Order Components' to plugin to a React project. Trying to use both Redux and Relay will cause a conflict over which framework is bound to a UI component. There is currently [on going discussion](https://github.com/rackt/redux/issues/464) regarding Redux's relationship with Relay.

##Higher Order Components
Higher Order components or HOCs are defined like regular react components. HOCs wrap child UI components. The HOC will execute its queries and then render the child UI component passing the query data in as props. The Flux flow is now managed by the HOC. The HOC will act as a dispatcher. It has methods like `setQueryParams` that can be considered a Flux Action. Calling `setQueryParams` triggers the Flux flow. The queries defined in the HOC are updated, new data is fetched and persisted in the HOC. The HOC is acting as a Flux Store by persisting this data.

Below is a simplified example of a `ProfilePicture` component and a complimentary HOC. Imagine we have ProfilePicture defined to render user avatars throughout our project. We need to fetch the data to display the user avatar. We then create a Relay HOC to query the user profile pictures from a database. The HOC passes this query data to the child ProfilePicture component.


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
#GraphQL
The above example may look strange. Particularily this part:

```javascript
Relay.QL`
      fragment on User {
        profilePicture(size: $size) {
          uri,
        },
      }
    `,
```

Much of the magic behind Relay is a powered by GraphQL. GraphQL is a new query language from Facebook that specializes in operating on graph data structures. GraphQL might be considered A caveat of using Relay. An existing project will not be setup to work with GraphQL out of the box. The first steps to [getting started with Relay](https://facebook.github.io/relay/docs/getting-started.html#content) are :

* Create a GraphQL Schema
* Create a GraphQL Server

It may take a considerable amount of work to convert and existing project to a GraphQL Schema and setup or modify and existing server to be GraphQL friendly. When starting a project from scratch it might make more sense to use Relay immediatly. Facebook provides a [Relay Starter Kit](https://github.com/facebook/relay-starter-kit)

## Relay Without GraphQL
With the extra overhead of setting up GraphQL. Facebook's Relay might not be the right tool for existing projects. Luckily there is anoter 'Relay inspired' frame work out there that may be a better fit. [react-transmit](https://github.com/RickWong/react-transmit) is an open source project that aims to be a 'Relay-inspired library based on Promises instead of GraphQL'. 



## Current State Of Relay
Facebook has released an [open source 'Technical Preview' of Relay](https://facebook.github.io/react/blog/2015/08/11/relay-technical-preview.html). They have some great examples in the repository that demonstrate working with Relay. In addition to the repository there is a very thorough [documentation site](https://facebook.github.io/relay/).

## Future of Relay
Relay aims to provide adapters for other data storage types so that you don't have to use or convert your project to GraphQL
