//TUTORIAL REACTJS-ORH: MAIN CONCEPTS

import React from 'react';
import ReactDOM from 'react-dom/client';


//*************************************************************************************
// INTRODUCING JSX
//*************************************************************************************

const root1 = ReactDOM.createRoot(document.getElementById('root1'));
const k = "DT"
root1.render(<h1>Hello, {k}</h1>);

//*** */

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez',
  link: "https://www.reactjs.org",
  pic: "./logo192.png"
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

const root2 = ReactDOM.createRoot(document.getElementById('root2'));
root2.render(element);//no curly braces

//*** */

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

const root3 = ReactDOM.createRoot(document.getElementById('root3'));
root3.render(getGreeting(user));//no curly braces

/*
After compilation, JSX expressions become regular JavaScript function calls and 
evaluate to JavaScript objects.

This means that you can use JSX inside of if statements and for loops, assign it 
to variables, accept it as arguments, and return it from functions:
*/

//*** */

const element2 = <a href="https://www.reactjs.org"> link with string literal</a>;
const element3 = <a href={user.link}>link with JSX expression/curly braces</a>;

const root4 = ReactDOM.createRoot(document.getElementById('root4'));
root4.render(element2);
const root5 = ReactDOM.createRoot(document.getElementById('root5'));
root5.render(element3);

/*
Don’t put quotes around curly braces when embedding a JavaScript expression in an 
attribute. You should either use quotes (for string values) or curly braces 
(for expressions), but not both in the same attribute.

Since JSX is closer to JavaScript than to HTML, React DOM uses camelCase property 
naming convention instead of HTML attribute names.

For example, class becomes className in JSX, and tabindex becomes tabIndex.
*/

//*** */

const element4 = <img src={user.pic} />;

const element5 = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

const root6 = ReactDOM.createRoot(document.getElementById('root6'));
root6.render(element4);
const root7 = ReactDOM.createRoot(document.getElementById('root7'));
root7.render(element5);

//*** */

const title = "virus";
// This is safe:
const element6 = <h1>{title}</h1>;

/*
By default, React DOM escapes any values embedded in JSX before rendering them. 
Thus it ensures that you can never inject anything that’s not explicitly written 
in your application. Everything is converted to a string before being rendered. 
This helps prevent XSS (cross-site-scripting) attacks.
*/

//*** */

const element7 = (
  <h1 className="greeting">
    Hello, world!......
  </h1>
);

const element8 = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!........'
);

const root8 = ReactDOM.createRoot(document.getElementById('root8'));
root8.render(element7);
const root9 = ReactDOM.createRoot(document.getElementById('root9'));
root9.render(element8);

/*
These objects are called “React elements”. You can think of them as descriptions of 
what you want to see on the screen. React reads these objects and uses them to 
construct the DOM and keep it up to date.
*/



//************************************************************************************
// RENDERING ELEMENTS
//************************************************************************************

/*
Elements are the smallest building blocks of React apps.

An element describes what you want to see on the screen:

const element = <h1>Hello, world</h1>;

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. 
React DOM takes care of updating the DOM to match the React elements.

    Note:

    One might confuse elements with a more widely known concept of “components”. 
    We will introduce components in the next section. Elements are what components 
    are “made of”, and we encourage you to read this section before jumping ahead.
*/


//RENDERING AN ELEMENT INTO THE DOM

/*
Let’s say there is a <div> somewhere in your HTML file:

<div id="root"></div>

We call this a “root” DOM node because everything inside it will be managed by React DOM.

Applications built with just React usually have a single root DOM node. If you are 
integrating React into an existing app, you may have as many isolated root DOM nodes as 
you like.

To render a React element, first pass the DOM element to ReactDOM.createRoot(), then pass 
the React element to root.render():

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const element = <h1>Hello, world</h1>;
root.render(element);
*/

const root10 = ReactDOM.createRoot(
  document.getElementById('root10')
);
const element9 = <h1>Hello, world.. create</h1>;
root10.render(element9);


//UPDATING THE RENDERED ELEMENT

/*
React elements are immutable. Once you create an element, you can’t change its children 
or attributes. An element is like a single frame in a movie: it represents the UI at a 
certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and 
pass it to root.render().

Consider this ticking clock example:

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);}

setInterval(tick, 1000);

Try it on CodePen

It calls root.render() every second from a setInterval() callback.

    Note:

    In practice, most React apps only call root.render() once. In the next sections we 
    will learn how such code gets encapsulated into stateful components.

    We recommend that you don’t skip topics because they build on each other.
*/

const root11 = ReactDOM.createRoot(
  document.getElementById('root11')
);

function tick() {
  const element10 = (
    <div>
      <h1>Hello, TIME!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root11.render(element10);
}

setInterval(tick, 1000);


//REACT ONLY UPDATES WHAT'S NECESSARY

/*
React DOM compares the element and its children to the previous one, and only applies the 
DOM updates necessary to bring the DOM to the desired state. You can verify by inspecting 
the last example with the browser tools.

Even though we create an element describing the whole UI tree on every tick, only the text 
node whose contents have changed gets updated by React DOM.

In our experience, thinking about how the UI should look at any given moment, rather 
than how to change it over time, eliminates a whole class of bugs.

*/



//************************************************************************************
// COMPONENTS AND PROPS
//************************************************************************************

/*
Components let you split the UI into independent, reusable pieces, and think about each piece 
in isolation. This page provides an introduction to the idea of components. You can find a 
detailed component API reference here.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs 
(called “props”) and return React elements describing what should appear on the screen.
*/


//FUNCTION AND CLASS COMPONENTS

/*
The simplest way to define a component is to write a JavaScript function:

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

This function is a valid React component because it accepts a single “props” (which stands 
for properties) object argument with data and returns a React element. We call such 
components “function components” because they are literally JavaScript functions.

You can also use an ES6 class to define a component:

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

The above two components are equivalent from React’s point of view.

Function and Class components both have some additional features that we will discuss in 
the next sections.
*/

function Welcome2(props) {
  return <h1>Hello, {props.name}</h1>;
}

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}


//RENDERING A COMPONENT

/*
Previously, we only encountered React elements that represent DOM tags:

const element = <div />;

However, elements can also represent user-defined components:

const element = <Welcome name="Sara" />;

When React sees an element representing a user-defined component, it passes JSX attributes 
and children to this component as a single object. We call this object “props”.

For example, this code renders “Hello, Sara” on the page:

function Welcome(props) {  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;root.render(element);

Try it on CodePen

Let’s recap what happens in this example:

    We call root.render() with the <Welcome name="Sara" /> element.
    React calls the Welcome component with {name: 'Sara'} as the props.
    Our Welcome component returns a <h1>Hello, Sara</h1> element as the result.
    React DOM efficiently updates the DOM to match <h1>Hello, Sara</h1>.

    Note: Always start component names with a capital letter.

    React treats components starting with lowercase letters as DOM tags. 
    For example, <div /> represents an HTML div tag, but <Welcome /> represents a 
    component and requires Welcome to be in scope.

    To learn more about the reasoning behind this convention, please read JSX In Depth.

*/

function Welcome3(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root12 = ReactDOM.createRoot(document.getElementById('root12'));
const element11 = <Welcome3 name="Sara" />; 
root12.render(element11);