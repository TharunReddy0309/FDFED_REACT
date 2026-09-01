import { useState } from "react";
import "./App.css";
import profilePhoto from "./assets/hero.png";
import ram from "./assets/ram.png";
import sneha from "./assets/sneha.png";

const profiles = [
    { name: "Ram", age: 21, photo: ram , num: 10 },
    { name: "Priya", age: 22, photo: profilePhoto , num :20 },
    { name: "Aman", age: 20, photo: profilePhoto, num :30 },
    { name: "Sneha", age: 23, photo: sneha , num :40 },
];

function App() {

    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

    const [totalStudents, setTotalStudents] = useState(30);

    function changeTotal({x}: {x: number}) {
        setTotalStudents(totalStudents + x);
    }

    return (
        <div className="container">

            <Attendance totalStudents={totalStudents} />

            {profiles.map((person) => (
                <button
                    key={person.name}
                    onClick={() => setSelectedProfile(person)}
                >
                    {person.name}
                </button>
            ))}

            <h2>Parent Total Students: {totalStudents}</h2>

            <Greeting
                name={selectedProfile.name}
                totalStudents={totalStudents}
                changeTotal={changeTotal}
                num={selectedProfile.num}
            />

            <Profile
                name={selectedProfile.name}
                age={selectedProfile.age}
                photo={selectedProfile.photo}
            />

        </div>
    );
}


function Attendance(props: any) {

    const [presentStudents, setPresentStudents] = useState(0);

    const var1 = `Hello ${presentStudents}`;

    function markPresent() {
        if (presentStudents < props.totalStudents)
            setPresentStudents(presentStudents + 1);

        console.log(var1);
    }

    return (
        <div className="container">

            <h1>Attendance Tracker</h1>

            <p>Total Students: {props.totalStudents}</p>

            <p>
                Number of Present Students: {presentStudents}
            </p>

            <p>
                Number of Absent Students:
                {props.totalStudents - presentStudents}
            </p>

            <button onClick={markPresent}>
                Mark Present
            </button>

        </div>
    );
}


function Greeting(props: any) {

    return (
        <div>

            <h1>Hello, {props.name}!</h1>
            <p>Total Students: {props.totalStudents}</p>
            <button onClick={() => props.changeTotal({ x: props.num })}>
                Change No. of Students
            </button>

        </div>
    );
}


function Profile(props: any) {

    return (
        <div>

            <img
                src={props.photo}
                alt={props.name}
                width="150"
            />

            <h1>{props.name}</h1>

            <p>Age: {props.age}</p>

        </div>
    );
}

export default App;