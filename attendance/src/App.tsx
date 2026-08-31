import { useState } from "react";
import "./App.css";
import profilePhoto from "./assets/hero.png";
import ram from "./assets/ram.png"; 
import sneha from "./assets/sneha.png";

const profiles = [
    { name: "Ram", age: 21 , photo: ram},
    { name: "Priya", age: 22 , photo: profilePhoto},
    { name: "Aman", age: 20 , photo: profilePhoto},
    { name: "Sneha", age: 23 , photo: sneha},
];

function App() {
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

    return (
        <div className="container">
            <Attendance />
            {profiles.map((person) => (
                <button key={person.name} onClick={() => setSelectedProfile(person)}>
                    {person.name}
                </button>
            ))}
            <Greeting name={selectedProfile.name} />
            <Profile name={selectedProfile.name} age={selectedProfile.age} photo={selectedProfile.photo} />
        </div>
    );
}

//  callback means passing a function as an argument to another function. 
//  In React, callbacks are often used to handle events or to pass data from a child component back to a parent component.
//  For example, you can pass a callback function as a prop to a child component,
//  and when an event occurs in the child component (like a button click),
//  the child can call that function to notify the parent component or update its state.

//  how callbacks work in react ?
//  In React, callbacks work by passing a function from a parent component to a child component as a prop.
//  When an event occurs in the child component (like a button click), the child can call that function to notify the parent component or update its state.

// prop drilling ? 
// Context: Prop drilling is a term used in React to describe the process of passing data from a parent component to a deeply nested child
// component through multiple layers of intermediate components. This can  lead to a situation where components that do 
// not need the data are forced to receive it, making the code harder to maintain and understand.
// to come over the prop drilling problem we can "use context" api or redux or zustand or recoil or jotai.

function Attendance() {
    const [presentStudents, setPresentStudents] = useState(0);
    const TotalStudents = 30;
    const var1= `Hello ${presentStudents}`;
    function markPresent() {
        if(presentStudents<TotalStudents) 
        setPresentStudents(presentStudents + 1);
        console.log(var1);
    }

    return (
        <div className="container">
            <h1>Attendance Tracker</h1>
            <p> Total Students: {TotalStudents} </p>
            <p>Number of Present Students: {presentStudents}</p>
            <p>Number of Absent Students: {TotalStudents - presentStudents}</p>
            <button onClick={markPresent}>
                Mark Present
            </button>
        </div>
    );
}

function Greeting(props: any) {
    return <h1>Hello, {props.name}!</h1>;
}

function Profile(props : any) {
    return (
        <div>
            <img src={props.photo} alt={props.name} width="150" />
            <h1>{props.name}</h1>
            <p>Age: {props.age}</p>
        </div>
    );
}

export default App;
