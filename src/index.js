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
    this.state = {date: new Date()};  
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
    this.state = {date: new Date()};  
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
