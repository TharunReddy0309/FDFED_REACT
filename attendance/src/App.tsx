import { useState, createContext, useContext, useEffect } from "react";
import "./App.css";
import profilePhoto from "./assets/hero.png";
import ram from "./assets/ram.png";
import sneha from "./assets/sneha.png";
import Prac from "./prac";
const profiles = [
    { name: "Ram", age: 21, photo: ram, num: 40 },
    { name: "Priya", age: 22, photo: profilePhoto, num: 50 },
    { name: "Aman", age: 20, photo: profilePhoto, num: 30 },
    { name: "Sneha", age: 23, photo: sneha, num: 12 },
];

// Props, UseState , UseContext ,UseEffect ,Callbacks, Forms, SideEffects, yup library, react-hook-form ,UseMemo ,UseForm .

// main diff btw props and state is that props are immutable and state is mutable. 
// props are used to pass data from parent to child component and state is used to manage data within a component. 
// props are read-only and cannot be modified by the child component, while state can be modified using the setState function.
// props are used for communication between components, while state is used for managing the internal data of a component.

// forms used for user input and data collection. Forms allow users to enter information, such as text, numbers, or selections, and submit it to the application for processing.
// before submitting a form i need to get data while typing is it valid? Yes, I can validate the data while typing using onChange event handler.
// I can check the input value against certain criteria and provide feedback to the user in real-time. 
// This helps improve the user experience by preventing errors and ensuring that the data entered is valid before submission.

// what happens when state is updated? When state is updated, React re-renders the component and its child components to reflect the new state.
// This means that any changes made to the state will trigger a re-render of the component, allowing the UI to update and display the latest data. 
// React uses a virtual DOM to efficiently update only the parts of the UI that have changed, rather than re-rendering the entire component tree. 
// This helps improve performance and ensures that the UI remains responsive to user interactions.

// why states are asynchronous? States are asynchronous in React because they are batched together and updated in a single render cycle.
// This means that when you call the setState function to update the state, React does not immediately update the state value. 
// Instead, it schedules the state update to occur in the next render cycle. 
// This allows React to optimize performance by minimizing the number of re-renders and ensuring that the UI remains responsive to user interactions. 
// However, this also means that if you try to access the updated state value immediately after calling setState, you may not get the expected result, 
// as the state update has not yet occurred.

// when parent component state is updated, the child component will re-render if it depends on the updated state , 
// because React's rendering process is based on a unidirectional data flow. When the state of a parent component changes,
// React will re-render that component and all of its child components.

const LanguageContext = createContext("English");
const ThemeContext = createContext("light");

function App(){
    return(
        <div>
            <Prac/>
        </div>
    );
}
function App32() {
  const [users, setUsers] = useState([]);
  const [letter, setLetter] = useState("");
  const [count, setCount] = useState(0);

  // 1. useEffect WITHOUT dependency array
  // Runs after EVERY render
  useEffect(() => {
    console.log("Component rendered");
  });

  // 2. useEffect WITH empty dependency array
  // Runs only ONCE when component is mounted
  useEffect(() => {
    console.log("App started");

    document.title = "Random Profiles";
  }, []);

  // 3. useEffect WITH dependency
  // Runs whenever 'letter' changes
  useEffect(() => {
    if (letter === "") {
      setUsers([]);
      return;
    }

    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.results.filter((user) =>
          user.name.first
            .toLowerCase()
            .startsWith(letter.toLowerCase())
        );

        setUsers(filteredUsers);
      });
  }, [letter]);

  return (
    <div>
      <h1>Random Profiles</h1>

      <input
        type="text"
        placeholder="Enter starting letter"
        value={letter}
        maxLength={1}
        onChange={(e) => setLetter(e.target.value)}
      />

      <button onClick={() => setCount(count + 1)}>
        Re-render: {count}
      </button>

      <div>
        {users.map((user) => (
          <div key={user.login.uuid}>
            <img
              src={user.picture.medium}
              alt={user.name.first}
            />

            <h2>
              {user.name.first} {user.name.last}
            </h2>

            <p>{user.email}</p>
            <p>{user.location.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


function App2() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    // function handleChange(event : any) {
    //     event.preventDefault();
    //     console.log(name);
    //     setName(event.target.value);
    // }
    function Validate() {
        if(name.length < 3) {
            alert("Name must be at least 3 characters long");
            return;
        }
        if(password.length < 5) {
            alert("Password must be at least 5 characters long");
            return;
        }
        alert("Form submitted successfully");

        setName("");
        setPassword("");
    }
    
    useEffect(() => {
        localStorage.setItem("name", name);
        localStorage.setItem("password", password);
    }, [name, password]);

    function getinput(){
        const storedName = localStorage.getItem("name");
        const storedPassword = localStorage.getItem("password");
        if (storedName && storedPassword) {
            setName(storedName);
            setPassword(storedPassword);
        }
    }
    return (
        <div>
            <input
                name="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <br />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
            />
            <br />
            <button type="submit" onClick={Validate}>Submit</button>
            <button onClick={getinput}> Get Credentials </button>
            {/* <p>
                Name: {name} <br />
                Password: {password}
            </p> */}
            {/* <p>You are typing: {name}</p> */}
            {/* <App1/> */}
        </div>
    );
}

function App1() {
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const [totalStudents, setTotalStudents] = useState(30);
    const [language, setLanguage] = useState("English");
    const [theme, setTheme] = useState("light");

    function changeTotal({ x }: { x: number }) {
        setTotalStudents(totalStudents + x);
    }

    return (
        <div>    
            <LanguageContext.Provider value={language}>
                <ThemeContext.Provider value={theme}>
                    <div
                        className="container"
                        style={{
                            background:
                                theme === "dark"
                                    ? "black"
                                    : theme === "blue"
                                    ? "lightblue"
                                    : "white",
                            color: theme === "dark" ? "white" : "black",
                            minHeight: "100vh"
                        }}
                    >
                        <button onClick={() => setLanguage("English")}>
                            English
                        </button>

                        <button onClick={() => setLanguage("Hindi")}>
                            Hindi
                        </button>

                        <button onClick={() => setLanguage("Telugu")}>
                            Telugu
                        </button>

                        <br />
                        <br />

                        <button onClick={() => setTheme("light")}>
                            Light
                        </button>

                        <button onClick={() => setTheme("dark")}>
                            Dark
                        </button>

                        <button onClick={() => setTheme("blue")}>
                            Blue
                        </button>

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
                </ThemeContext.Provider>
            </LanguageContext.Provider>
            <div>
                <Attendance totalStudents={totalStudents} />
            </div>
        </div>
    );
}

function Attendance(props: any) {
    const [presentStudents, setPresentStudents] = useState(0);
    const language = useContext(LanguageContext);

    function markPresent() {
        if (presentStudents < props.totalStudents) {
            setPresentStudents(presentStudents + 1);
        }
    }

    return (
        <div>
            <h1>
                {language === "English"
                    ? "Attendance Tracker"
                    : language === "Hindi"
                    ? "उपस्थिति ट्रैकर"
                    : "హాజరు ట్రాకర్"}
            </h1>

            <p>
                {language === "English"
                    ? "Total Students"
                    : language === "Hindi"
                    ? "कुल छात्र"
                    : "మొత్తం విద్యార్థులు"}
                : {props.totalStudents}
            </p>

            <p>
                {language === "English"
                    ? "Number of Present Students"
                    : language === "Hindi"
                    ? "उपस्थित छात्रों की संख्या"
                    : "హాజరైన విద్యార్థుల సంఖ్య"}
                : {presentStudents}
            </p>

            <p>
                {language === "English"
                    ? "Number of Absent Students"
                    : language === "Hindi"
                    ? "अनुपस्थित छात्रों की संख्या"
                    : "గైర్హాజరైన విద్యార్థుల సంఖ్య"}
                : {props.totalStudents - presentStudents}
            </p>

            <button onClick={markPresent}>
                {language === "English"
                    ? "Mark Present"
                    : language === "Hindi"
                    ? "उपस्थित चिह्नित करें"
                    : "హాజరుగా గుర్తించండి"}
            </button>
        </div>
    );
}

function Greeting(props: any) {
    const language = useContext(LanguageContext);

    return (
        <div>
            <h1>
                {language === "English"
                    ? `Hello, ${props.name}!`
                    : language === "Hindi"
                    ? `नमस्ते, ${props.name}!`
                    : `హలో, ${props.name}!`}
            </h1>

            <p>
                {language === "English"
                    ? "Total Students"
                    : language === "Hindi"
                    ? "कुल छात्र"
                    : "మొత్తం విద్యార్థులు"}
                : {props.totalStudents}
            </p>

            <button
                onClick={() => props.changeTotal({ x: props.num })}
            >
                {language === "English"
                    ? "Change No. of Students"
                    : language === "Hindi"
                    ? "छात्रों की संख्या बदलें"
                    : "విద్యార్థుల సంఖ్యను మార్చండి"}
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