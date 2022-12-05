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


//COMPOSING COMPONENTS
/*
Components can refer to other components in their output. This lets us use the same component 
abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, 
all those are commonly expressed as components.

For example, we can create an App component that renders Welcome many times:

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />      
      <Welcome name="Cahal" />      
      <Welcome name="Edite" />    
    </div>
  );
}

Try it on CodePen

Typically, new React apps have a single App component at the very top. However, if you 
integrate React into an existing app, you might start bottom-up with a small component 
like Button and gradually work your way to the top of the view hierarchy.
*/

function Welcome4(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome4 name="Sara rep" />
      <Welcome4 name="Cahal rep" />
      <Welcome4 name="Edite rep" />
    </div>
  );
}

const root13 = ReactDOM.createRoot(document.getElementById('root13'));
root13.render(App());



//EXTRACTING COMPONENTS

/*
Don’t be afraid to split components into smaller components.

For example, consider this Comment component:

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

Try it on CodePen

It accepts author (an object), text (a string), and date (a date) as props, and describes a 
comment on a social media website.

This component can be tricky to change because of all the nesting, and it is also hard to 
reuse individual parts of it. Let’s extract a few components from it.

First, we will extract Avatar:

function Avatar(props) {
  return (
    <img className="Avatar"      
    src={props.user.avatarUrl}      
    alt={props.user.name}    
    />  
  );
}

The Avatar doesn’t need to know that it is being rendered inside a Comment. This is why we 
have given its prop a more generic name: user rather than author.

We recommend naming props from the component’s own point of view rather than the context in 
which it is being used.

We can now simplify Comment a tiny bit:

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />        
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

Next, we will extract a UserInfo component that renders an Avatar next to the user’s name:

function UserInfo(props) {
  return (
    <div className="UserInfo">      
    <Avatar user={props.user} />      
    <div className="UserInfo-name">        
      {props.user.name}      
      </div>    
    </div>  
  );
}

This lets us simplify Comment even further:

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />      
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

Try it on CodePen

Extracting components might seem like grunt work at first, but having a palette of reusable 
components pays off in larger apps. A good rule of thumb is that if a part of your UI is 
used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, 
  Comment), it is a good candidate to be extracted to a separate component.
*/


//PROPS ARE READ-ONLY
/*
Whether you declare a component as a function or a class, it must never modify its own props. 
Consider this sum function:

function sum(a, b) {
  return a + b;
}

Such functions are called “pure” because they do not attempt to change their inputs, and 
always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

function withdraw(account, amount) {
  account.total -= amount;
}

React is pretty flexible but it has a single strict rule:

All React components must act like pure functions with respect to their props!!!!!!!!!!!

Of course, application UIs are dynamic and change over time. In the next section, we will 
introduce a new concept of “state”. State allows React components to change their output 
over time in response to user actions, network responses, and anything else, without 
violating this rule.
*/

//PURE
function sum(a, b) {
  return a + b;
}

//IMPURE
function withdraw(account, amount) {
  account.total -= amount;
}



//************************************************************************************
// STATE AND LIFECYCLE
//************************************************************************************

/*
This page introduces the concept of state and lifecycle in a React component. You can find a 
detailed component API reference here.

Consider the ticking clock example from one of the previous sections. In Rendering Elements, 
we have only learned one way to update the UI. We call root.render() to change the rendered 
output:

const root = ReactDOM.createRoot(document.getElementById('root'));
  
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

In this section, we will learn how to make the Clock component truly reusable and 
encapsulated. It will set up its own timer and update itself every second.

We can start by encapsulating how the clock looks:

const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>      
    <h1>Hello, world!</h1>      
    <h2>It is {props.date.toLocaleTimeString()}.</h2>    
    </div>  
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);}

setInterval(tick, 1000);

Try it on CodePen

However, it misses a crucial requirement: the fact that the Clock sets up a timer and 
updates the UI every second should be an implementation detail of the Clock.

Ideally we want to write this once and have the Clock update itself:

root.render(<Clock />);

To implement this, we need to add “state” to the Clock component.

State is similar to props, but it is private and fully controlled by the component.
*/

//EXAMPLE WITH PROPS
const root14 = ReactDOM.createRoot(document.getElementById('root14'));

function tick2() {
  const element12 = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root14.render(element12);
}


setInterval(tick2, 1000);

//ENCAPSULATE
const root15 = ReactDOM.createRoot(document.getElementById('root15'));

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.........</h2>
    </div>
  );
}

function tick3() {
  root15.render(<Clock date={new Date()} />);
}

setInterval(tick3, 1000);

//CONVERTING A FUNCTION TO CLASS

/*
You can convert a function component like Clock to a class in five steps:

    Create an ES6 class, with the same name, that extends React.Component.
    Add a single empty method to it called render().
    Move the body of the function into the render() method.
    Replace props with this.props in the render() body.
    Delete the remaining empty function declaration.

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

Try it on CodePen

Clock is now defined as a class rather than a function.

The render method will be called each time an update happens, but as long as we render 
<Clock /> into the same DOM node, only a single instance of the Clock class will be used. 
This lets us use additional features such as local state and lifecycle methods.
*/

const root16 = ReactDOM.createRoot(document.getElementById('root16'));

class Clock2 extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}!!!!!</h2>
      </div>
    );
  }
}

function tick4() {
  root16.render(<Clock2 date={new Date()} />);
}

setInterval(tick4, 1000);

//ADDING LOCAL STATE TO A CLASS

/*
We will move the date from props to state in three steps:

    Replace this.props.date with this.state.date in the render() method:

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      
      </div>
    );
  }
}

    Add a class constructor that assigns the initial this.state:

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

Note how we pass props to the base constructor:

  constructor(props) {
    super(props);    this.state = {date: new Date()};
  }

Class components should always call the base constructor with props.

    Remove the date prop from the <Clock /> element:

root.render(<Clock />);

We will later add the timer code back to the component itself.

The result looks like this:

class Clock extends React.Component {
  constructor(props) {    super(props);    this.state = {date: new Date()};  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);

Try it on CodePen

Next, we’ll make the Clock set up its own timer and update itself every second.
*/

//1
class Clock4 extends React.Component {
  //2
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  //1
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}OOOOOOOOOOO.</h2>
      </div>
    );
  }
}

//3
const root17 = ReactDOM.createRoot(document.getElementById('root17'));
root17.render(<Clock4 />);


//ADDING LIFECYCLE METHODS TO A CLASS

/*
In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called “mounting” in React.

We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called “unmounting” in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts:

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {  }
  componentWillUnmount() {  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

These methods are called “lifecycle methods”.

The componentDidMount() method runs after the component output has been rendered to the DOM. 
This is a good place to set up a timer:

  componentDidMount() {
    this.timerID = setInterval(      () => this.tick(),      1000    );  }

Note how we save the timer ID right on this (this.timerID).

While this.props is set up by React itself and this.state has a special meaning, you are free 
to add additional fields to the class manually if you need to store something that doesn’t 
participate in the data flow (like a timer ID).

We will tear down the timer in the componentWillUnmount() lifecycle method:

  componentWillUnmount() {
    clearInterval(this.timerID);  }

Finally, we will implement a method called tick() that the Clock component will run every 
second.

It will use this.setState() to schedule updates to the component local state:

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {    this.setState({      date: new Date()    });  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);

Try it on CodePen

Now the clock ticks every second.

Let’s quickly recap what’s going on and the order in which the methods are called:

   1 When <Clock /> is passed to root.render(), React calls the constructor of the Clock 
    component. Since Clock needs to display the current time, it initializes this.state 
    with an object including the current time. We will later update this state.

   2 React then calls the Clock component’s render() method. This is how React learns 
    what should be displayed on the screen. React then updates the DOM to match the Clock’s 
    render output.
    
   3 When the Clock output is inserted in the DOM, React calls the componentDidMount() 
   lifecycle method. Inside it, the Clock component asks the browser to set up a timer to 
   call the component’s tick() method once a second.
    
   4 Every second the browser calls the tick() method. Inside it, the Clock component 
   schedules a UI update by calling setState() with an object containing the current time. 
   Thanks to the setState() call, React knows the state has changed, and calls the render() 
   method again to learn what should be on the screen. This time, this.state.date in the 
   render() method will be different, and so the render output will include the updated time. 
   React updates the DOM accordingly.
    
   5 If the Clock component is ever removed from the DOM, React calls the 
   componentWillUnmount() lifecycle method so the timer is stopped.

*/

//1
class Clock5 extends React.Component {
  //2
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  //4
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick5(),
      1000
    );
  }

  //5
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //6
  tick5() {
    this.setState({
      date: new Date()
    });
  }

  //1
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}kkkkkkkkkkkkk.</h2>
      </div>
    );
  }
}

//3
const root18 = ReactDOM.createRoot(document.getElementById('root18'));
root18.render(<Clock5 />);



//USING STATE CORRECTLY

/*
There are three things you should know about setState().
Do Not Modify State Directly

For example, this will not re-render a component:

// Wrong
this.state.comment = 'Hello';

Instead, use setState():

// Correct
this.setState({comment: 'Hello'});

The only place where you can assign this.state is the constructor.
State Updates May Be Asynchronous

React may batch multiple setState() calls into a single update for performance.

Because this.props and this.state may be updated asynchronously, you should not rely on their 
values for calculating the next state.

For example, this code may fail to update the counter:

// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

To fix it, use a second form of setState() that accepts a function rather than an object. 
That function will receive the previous state as the first argument, and the props at the time 
the update is applied as the second argument:

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

We used an arrow function above, but it also works with regular functions:

// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});

State Updates are Merged

When you call setState(), React merges the object you provide into the current state.

For example, your state may contain several independent variables:

  constructor(props) {
    super(props);
    this.state = {
      posts: [],      comments: []    };
  }

Then you can update them independently with separate setState() calls:

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments      });
    });
  }

The merging is shallow, so this.setState({comments}) leaves this.state.posts intact, but 
completely replaces this.state.comments.
*/

//DO NOT MODIFY STATE DIRECTLY
/*
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
*/

//STATE UPDATES MAY BE ASYNCHRONOUS
/*
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
*/

//STATES UPDATES ARE MERGED
/*
  constructor(props) {
    super(props);
    this.state = {
      posts: [],      comments: []    };
  }

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments      });
    });
  }
*/


//THE DATA FLOWNS DOWN
/*
Neither parent nor child components can know if a certain component is stateful or stateless, 
and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component 
other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

<FormattedDate date={this.state.date} />

The FormattedDate component would receive the date in its props and wouldn’t know whether it 
came from the Clock’s state, from the Clock’s props, or was typed by hand:

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

Try it on CodePen

This is commonly called a “top-down” or “unidirectional” data flow. Any state is always owned by 
some specific component, and any data or UI derived from that state can only affect components 
“below” them in the tree.

If you imagine a component tree as a waterfall of props, each component’s state is like an 
additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an App component that renders 
three <Clock>s:

function App() {
  return (
    <div>
      <Clock />      
      <Clock />      
      <Clock />    
    </div>
  );
}

Try it on CodePen

Each Clock sets up its own timer and updates independently.

In React apps, whether a component is stateful or stateless is considered an implementation detail 
of the component that may change over time. You can use stateless components inside stateful 
components, and vice versa.
*/

/*
<FormattedDate date={this.state.date} />

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}*/

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.8888888888888</h2>;
}

class Clock10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

const root19 = ReactDOM.createRoot(document.getElementById('root19'));
root19.render(<Clock10 />);

//

function FormattedDate2(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate2 date={this.state.date} />
      </div>
    );
  }
}

function App2() {
  return (
    <div>
      <Clock11 />
      <Clock11 />
      <Clock11 />
    </div>
  );
}

const root20 = ReactDOM.createRoot(document.getElementById('root20'));
root20.render(<App2 />);



//************************************************************************************
// HANDLING EVENTS
//************************************************************************************

/*
Handling events with React elements is very similar to handling events on DOM elements. There 
are some syntax differences:

    React events are named using camelCase, rather than lowercase.
    With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:

<button onclick="activateLasers()">
  Activate Lasers
</button>

is slightly different in React:

<button onClick={activateLasers}>  Activate Lasers
</button>

Another difference is that you cannot return false to prevent default behavior in React. You must 
call preventDefault explicitly. For example, with plain HTML, to prevent the default form behavior 
of submitting, you can write:

<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>

In React, this could instead be:

function Form() {
  function handleSubmit(e) {
    e.preventDefault();    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

Here, e is a synthetic event. React defines these synthetic events according to the W3C spec, so 
you don’t need to worry about cross-browser compatibility. React events do not work exactly the 
same as native events. See the SyntheticEvent reference guide to learn more.

When using React, you generally don’t need to call addEventListener to add listeners to a DOM 
element after it is created. Instead, just provide a listener when the element is initially 
rendered.

When you define a component using an ES6 class, a common pattern is for an event handler to be 
a method on the class. For example, this Toggle component renders a button that lets the user 
toggle between “ON” and “OFF” states:

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback    
    this.handleClick = this.handleClick.bind(this);  
  }

  handleClick() {    
    this.setState(prevState => ({      
      isToggleOn: !prevState.isToggleOn    
    }));  
  }
  render() {
    return (
      <button onClick={this.handleClick}>        
      {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

Try it on CodePen

You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods 
are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this 
will be undefined when the function is actually called.

This is not React-specific behavior; it is a part of how functions work in JavaScript. Generally, 
if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind 
that method.

If calling bind annoys you, there are two ways you can get around this. You can use public class 
fields syntax to correctly bind callbacks:

class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.  
  handleClick = () => {    
    console.log('this is:', this);  
  };  
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

This syntax is enabled by default in Create React App.

If you aren’t using class fields syntax, you can use an arrow function in the callback:

class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick    
    return (      
      <button onClick={() => this.handleClick()}>        
      Click me
      </button>
    );
  }
}

The problem with this syntax is that a different callback is created each time the LoggingButton 
renders. In most cases, this is fine. However, if this callback is passed as a prop to lower 
components, those components might do an extra re-rendering. We generally recommend binding in 
the constructor or using the class fields syntax, to avoid this sort of performance problem.
*/

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

const root21 = ReactDOM.createRoot(document.getElementById('root21'));
root21.render(<Toggle />);

//PASSING ARGUMENTS TO EVENT HANDLERS

/*
Inside a loop, it is common to want to pass an extra parameter to an event handler. For example, 
if id is the row ID, either of the following would work:

<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

The above two lines are equivalent, and use arrow functions and Function.prototype.bind respectively.

In both cases, the e argument representing the React event will be passed as a second argument 
after the ID. With an arrow function, we have to pass it explicitly, but with bind any further 
arguments are automatically forwarded.
*/



//************************************************************************************
// CONDITIONAL RENDERING
//************************************************************************************

/*
In React, you can create distinct components that encapsulate behavior you need. Then, you can 
render only some of them, depending on the state of your application.

Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript 
operators like if or the conditional operator to create elements representing the current state, 
and let React update the UI to match them.

Consider these two components:

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

We’ll create a Greeting component that displays either of these components depending on whether 
a user is logged in:

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {    return <UserGreeting />;  }  return <GuestGreeting />;}
const root = ReactDOM.createRoot(document.getElementById('root')); 
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);

Try it on CodePen

This example renders a different greeting depending on the value of isLoggedIn prop.
*/

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

const root22 = ReactDOM.createRoot(document.getElementById('root22'));
// Try changing to isLoggedIn={true}:
root22.render(<Greeting isLoggedIn={false} />);


//ELEMENT VARIABLES

/*
You can use variables to store elements. This can help you conditionally render a part of the 
component while the rest of the output doesn’t change.

Consider these two new components representing Logout and Login buttons:

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

In the example below, we will create a stateful component called LoginControl.

It will render either <LoginButton /> or <LogoutButton /> depending on its current state. It will 
also render a <Greeting /> from the previous example:

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {      
      button = <LogoutButton onClick={this.handleLogoutClick} />;   
    } else {      
      button = <LoginButton onClick={this.handleLoginClick} />;    
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />        
        {button}      
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<LoginControl />);

Try it on CodePen

While declaring a variable and using an if statement is a fine way to conditionally render a 
component, sometimes you might want to use a shorter syntax. There are a few ways to inline 
conditions in JSX, explained below.
*/

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting2 isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting2(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting2(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting2(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting2 />;
  }
  return <GuestGreeting2 />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

const root23 = ReactDOM.createRoot(document.getElementById('root23'));
root23.render(<LoginControl />);


//INLINE IF-ELSE WITH CONDITIONAL OPERATOR

/*
Another method for conditionally rendering elements inline is to use the JavaScript conditional 
operator condition ? true : false.

In the example below, we use it to conditionally render a small block of text.

render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.    
    </div>
  );
}

It can also be used for larger expressions although it is less obvious what’s going on:

render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn        
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />      
      }
    </div>  
  );
}

Just like in JavaScript, it is up to you to choose an appropriate style based on what you and 
your team consider more readable. Also remember that whenever conditions become too complex, it 
might be a good time to extract a component.
*/


//PREVENTING COMPONENT FROM RENDERING

/*
In rare cases you might want a component to hide itself even though it was rendered by another 
component. To do this return null instead of its render output.

In the example below, the <WarningBanner /> is rendered depending on the value of the prop called 
warn. If the value of the prop is false, then the component does not render:

function WarningBanner(props) {
  if (!props.warn) {    return null;  }
  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />        
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Page />);

Try it on CodePen

Returning null from a component’s render method does not affect the firing of the component’s 
lifecycle methods. For instance componentDidUpdate will still be called.
*/

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true }
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

const root24 = ReactDOM.createRoot(document.getElementById('root24'));
root24.render(<Page />);



//************************************************************************************
// LIST AND KEYS
//************************************************************************************

/*
First, let’s review how you transform lists in JavaScript.

Given the code below, we use the map() function to take an array of numbers and double their 
values. We assign the new array returned by map() to the variable doubled and log it:

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);console.log(doubled);

This code logs [2, 4, 6, 8, 10] to the console.

In React, transforming arrays into lists of elements is nearly identical.
*/


//RENDERING MULTIPLE COMPONENTS

/*
You can build collections of elements and include them in JSX using curly braces {}.

Below, we loop through the numbers array using the JavaScript map() function. We return a <li> 
element for each item. Finally, we assign the resulting array of elements to listItems:

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>  <li>{number}</li>);

Then, we can include the entire listItems array inside a <ul> element:

<ul>{listItems}</ul>

Try it on CodePen

This code displays a bullet list of numbers between 1 and 5.
*/
/*
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((numbers) =>
  <li>{numbers}</li>
);

const root25 = ReactDOM.createRoot(document.getElementById('root25'));
root25.render(<ul>{listItems}</ul>);
*/


//BASIC LIST COMPONENT

/*
Usually you would render lists inside a component.

We can refactor the previous example into a component that accepts an array of numbers and outputs 
a list of elements.

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    
    <li>{number}</li>  
  );  
  return (
    <ul>{listItems}</ul>  
    );
}

const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);

When you run this code, you’ll be given a warning that a key should be provided for list items. 
A “key” is a special string attribute you need to include when creating lists of elements. 
We’ll discuss why it’s important in the next section.

Let’s assign a key to our list items inside numbers.map() and fix the missing key issue.

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>      
    {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

Try it on CodePen
*/

function NumberList(props) {
  const numbers2 = props.numbers;
  const listItems = numbers2.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers2 = [1, 2, 3, 4, 5];

const root26 = ReactDOM.createRoot(document.getElementById('root26')); 
root26.render( <NumberList numbers={numbers2} />);


//KEYS

/*
Keys help React identify which items have changed, are added, or are removed. Keys should be given 
to the elements inside the array to give the elements a stable identity:

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>    {number}
  </li>
);

The best way to pick a key is to use a string that uniquely identifies a list item among its 
siblings. Most often you would use IDs from your data as keys:

const todoItems = todos.map((todo) =>
  <li key={todo.id}>    {todo.text}
  </li>
);

When you don’t have stable IDs for rendered items, you may use the item index as a key as a last 
resort:

const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs  <li key={index}>    {todo.text}
  </li>
);

We don’t recommend using indexes for keys if the order of items may change. This can negatively 
impact performance and may cause issues with component state. Check out Robin Pokorny’s article 
for an in-depth explanation on the negative impacts of using an index as a key. If you choose not 
to assign an explicit key to list items then React will default to using indexes as keys.

Here is an in-depth explanation about why keys are necessary if you’re interested in learning more.
*/


//EXTRACTING COMPONENTS WITH KEYS

/*
Keys only make sense in the context of the surrounding array.

For example, if you extract a ListItem component, you should keep the key on the <ListItem /> 
elements in the array rather than on the <li> element in the ListItem itself.

Example: Incorrect Key Usage

function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:    
    <li key={value.toString()}>      
    {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:    
    <ListItem value={number} />  
    );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

Example: Correct Key Usage

function ListItem(props) {
  // Correct! There is no need to specify the key here:  return <li>{props.value}</li>;}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.    
    <ListItem key={number.toString()} value={number} />  
    );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

Try it on CodePen

A good rule of thumb is that elements inside the map() call need keys.
*/

function ListItem2(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList2(props) {
  const numbers3 = props.numbers;
  const listItems = numbers3.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem2 key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers3 = [1, 2, 3, 4, 5];

const root27 = ReactDOM.createRoot(document.getElementById('root27')); 
root27.render(<NumberList2 numbers={numbers3} />);


//KEY MUST ONLY BE UNIQUE AMONG SIBLINGS

/*
Keys used within arrays should be unique among their siblings. However, they don’t need to be 
globally unique. We can use the same keys when we produce two different arrays:

function Blog(props) {
  const sidebar = (    
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>          
        {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>    
  <div key={post.id}>      
  <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}      
      <hr />
      {content}    
      </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);

Try it on CodePen

Keys serve as a hint to React but they don’t get passed to your components. If you need the 
same value in your component, pass it explicitly as a prop with a different name:

const content = posts.map((post) =>
  <Post
    key={post.id}    
    id={post.id}    
    title={post.title} />
);

With the example above, the Post component can read props.id, but not props.key.
*/

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const root28 = ReactDOM.createRoot(document.getElementById('root28')); 
root28.render(<Blog posts={posts} />);


//EMBEDDING MAP() IN JSX

/*
In the examples above we declared a separate listItems variable and included it in JSX:

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    
  <ListItem key={number.toString()}              
  value={number} />  
  );  
  return (
    <ul>
      {listItems}
    </ul>
  );
}

JSX allows embedding any expression in curly braces so we could inline the map() result:

function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>        
        <ListItem key={number.toString()}                  
        value={number} />      
        )}    
    </ul>
  );
}

Try it on CodePen

Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, 
it is up to you to decide whether it is worth extracting a variable for readability. Keep in 
mind that if the map() body is too nested, it might be a good time to extract a component.
*/

function ListItem3(props) {
  return <li>{props.value}</li>;
}

function NumberList3(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem3 key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}

const numbers4 = [1, 2, 3, 4, 5];

const root29 = ReactDOM.createRoot(document.getElementById('root29')); 
root29.render(<NumberList3 numbers={numbers4} />);



//************************************************************************************
// FORMS
//************************************************************************************

/*
HTML form elements work a bit differently from other DOM elements in React, because form elements 
naturally keep some internal state. For example, this form in plain HTML accepts a single name:

<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>

This form has the default HTML form behavior of browsing to a new page when the user submits the 
form. If you want this behavior in React, it just works. But in most cases, it’s convenient to 
have a JavaScript function that handles the submission of the form and has access to the data 
that the user entered into the form. The standard way to achieve this is with a technique called 
“controlled components”.
*/


//CONTROLLED COMPONENTS

/*
In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own 
state and update it based on user input. In React, mutable state is typically kept in the state 
property of components, and only updated with setState().

We can combine the two by making the React state be the “single source of truth”. Then the React 
component that renders a form also controls what happens in that form on subsequent user input. An 
input form element whose value is controlled by React in this way is called a “controlled component”.

For example, if we want to make the previous example log the name when it is submitted, we can 
write the form as a controlled component:

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>        
      <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        
      </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

Try it on CodePen

Since the value attribute is set on our form element, the displayed value will always be 
this.state.value, making the React state the source of truth. Since handleChange runs on every 
keystroke to update the React state, the displayed value will update as the user types.

With a controlled component, the input’s value is always driven by the React state. While this 
means you have to type a bit more code, you can now pass the value to other UI elements too, or
reset it from other event handlers.
*/

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: "' + this.state.value +'"');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const root30 = ReactDOM.createRoot(document.getElementById('root30'));
root30.render(<NameForm />);



//THE TEXTAREA TAG

/*
In HTML, a <textarea> element defines its text by its children:

<textarea>
  Hello there, this is some text in a text area
</textarea>

In React, a <textarea> uses a value attribute instead. This way, a form using a <textarea> can 
be written very similarly to a form that uses a single-line input:

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      value: 'Please write an essay about your favorite DOM element.'    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />        
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

Notice that this.state.value is initialized in the constructor, so that the text area starts off 
with some text in it.
*/

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      value: 'Please write an essay about your favorite DOM element.'    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />        
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const root31 = ReactDOM.createRoot(document.getElementById('root31'));
root31.render(<EssayForm />);


//THE SELECT TAG

/*
In HTML, <select> creates a drop-down list. For example, this HTML creates a drop-down list of 
flavors:

<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>

Note that the Coconut option is initially selected, because of the selected attribute. React, 
instead of using this selected attribute, uses a value attribute on the root select tag. This is 
more convenient in a controlled component because you only need to update it in one place. 
For example:

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>            
          <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

Try it on CodePen

Overall, this makes it so that <input type="text">, <textarea>, and <select> all work very 
similarly - they all accept a value attribute that you can use to implement a controlled component.

    Note
    You can pass an array into the value attribute, allowing you to select multiple options in 
    a select tag:

    <select multiple={true} value={['B', 'C']}>
*/

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
  }

  handleChange3(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit3(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit3}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange3}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const root32 = ReactDOM.createRoot(document.getElementById('root32'));
root32.render(<FlavorForm />);

/*
ReactDOM.render(
  <FlavorForm />,
  document.getElementById('root32')
);*/