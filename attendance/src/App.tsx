import { useState, createContext, useContext } from "react";
import "./App.css";
import profilePhoto from "./assets/hero.png";
import ram from "./assets/ram.png";
import sneha from "./assets/sneha.png";

const profiles = [
    { name: "Ram", age: 21, photo: ram, num: 40 },
    { name: "Priya", age: 22, photo: profilePhoto, num: 50 },
    { name: "Aman", age: 20, photo: profilePhoto, num: 30 },
    { name: "Sneha", age: 23, photo: sneha, num: 12 },
];

const LanguageContext = createContext("English");
const ThemeContext = createContext("light");

function App() {
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const [totalStudents, setTotalStudents] = useState(30);
    const [language, setLanguage] = useState("English");
    const [theme, setTheme] = useState("light");

    function changeTotal({ x }: { x: number }) {
        setTotalStudents(x);
    }

    return (
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