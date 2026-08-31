import { useState } from "react";
import "./App.css";

function App() {

    // Parent owns the state
    const [totalStudents, setTotalStudents] = useState(30);

    // Event handler in parent
    function changeTotal() {
        setTotalStudents(totalStudents + 1);
    }

    return (
        <div className="container">

            {/* Passing event handler to child */}
            <Attendance
                totalStudents={totalStudents}
                onChangeTotal={changeTotal}
            />

            {/* Passing total students to Greeting */}
            <Greeting totalStudents={totalStudents} />

        </div>
    );
}


function Attendance(props: any) {

    const [presentStudents, setPresentStudents] = useState(0);

    function markPresent() {

        if (presentStudents < props.totalStudents) {
            setPresentStudents(presentStudents + 1);
        }

    }

    return (
        <div>

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

            {/* Child calls parent's event handler */}
            <button onClick={props.onChangeTotal}>
                Add Student
            </button>

        </div>
    );
}


function Greeting(props: any) {

    return (
        <div>
            <h1>Hello!</h1>

            <h2>
                Total Students: {props.totalStudents}
            </h2>
        </div>
    );
}


export default App;
