---
layout: post
title: React Data Fetching With Relay
category: Programming
tags:
  - JavaScript
  - Node.js
  - React
---

# React Data Fetching With Relay
React is ushering in a new era of Front end web development. Published by Facebook. It has rapidly become a popular technology used in production by [many technology companies](https://github.com/facebook/react/wiki/Sites-Using-React). In this article. We're going to be discussing a new complimentary React framework called Relay.

## The Problem With Data Fetching In React
As React has grown in popularity. The scale and complexity of projects built with React has grown with it. This has caused some teams to hit unknown territory. Or limitations while building their projects. Facebook has been proactive in offering support during these growing pains. 

###Flux
One of these early growing pains for developers was event handling. Facebook responded by publishing Flux. An abstract pattern for handling unidirectional data flow from events in React.

We won't be discussing the details of Flux in this article. We'll assume some familiarity. Flux has taken the React ecosystem to a new level. As developers started getting more familiar with Flux. Some new pain points began to emerge. Flux has been great for managing data as application state. But, yet getting that initial state into an application has been a source of friction.

Do we have stores call the server and populate themselves? Do we use rehydrate methods from the Dispatcher? Do we call a bunch of Actions on the server to populate the stores? How do we do this asyncronusly and isomorphically?

## What Is Relay?
Relay is a new React Data fetching framework published by Facebook. Relay aims to provide a better experience around the data fetching problems.

### Relay Vs Flux
Flux is an abstract pattern or best practice. Relay is a framework. Relay is built on the concepts of Flux. It has the same concepts of: Dispatcher, Actions, and Stores. but,yet they are represented a little differently. Relay has a new concept called 'Higher Order Components' or HOCs. 

#Higher Order Components
HOCs are defined like regular react components. HOCs wrap child UI components. The HOC will execute its queries and then render the child UI component passing the query data in as props. The Flux flow is now managed by the HOC. The HOC will act as a dispatcher. It has methods like `setQueryParams` that can be considered a Flux Action. Calling `setQueryParams` triggers to Flux flow. The queries defined in HOC are updated, new data is fetched and persisted in the HOC. The HOC is acting as a Flux Store by persisting this data.

Below is a simplified example of a ProfilePicture component and a complimentary HOC. Imagine we have ProfilePicture defined to render user avatars throughout our project. We need to fetch the data to display the user avatar. We then create a Relay HOC to query the user profile pictures from a database. The HOC passes this query data to the child ProfilePicture component.

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
The above example may look strange. Much of the magic behind Relay is a powered by GraphQL. GraphQL is a query language that specializes in traversing graph data structures. GraphQL might be considered A caveat of using Relay. An existing project most likely is not setup to work with GraphQL out of the box.

## Current State Of Relay
Facebook recently released an [open source 'Technical Preview' of Relay](https://github.com/facebook/react). They have some great examples in the repository that demonstrate working with Relay. In addition to the repository there is a very thorough documentation site.

## Relay Without GraphQL
With the extra overhead of setting up GraphQL. Facebook's Relay might not be the right tool for our project. Luckily there is anoter 'Relay inspired' frame work out there that may be a better fit. [react-transmit](https://github.com/RickWong/react-transmit) is an open source project that aims to be 'Relay without GraphQL'. 

## Future of Relay
