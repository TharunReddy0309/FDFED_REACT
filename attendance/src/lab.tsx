import { useState, useContext, createContext, type Dispatch, type SetStateAction } from "react";

type Restaurant = {
    name: string;
    info: string;
    noofstaff: string;
};

const initialData: Restaurant[] = [
    { name: "Spice Garden", info: "Bengaluru", noofstaff: "3" },
    { name: "Dice Garden", info: "Bengaluru", noofstaff: "2" },
    { name: "Spice Food", info: "Bengaluru", noofstaff: "4" },
];
const info = createContext<Restaurant[]>(initialData);
export default function App42() {
    const [showContact, setShowContact] = useState(false);
    const [data, setData] = useState(initialData);


    return (
        <info.Provider value={data}>
            <div>
                <Home />
                <Display/>
            <AddDashboard setData={setData} />
                <button type="button" onClick={() => setShowContact((visible) => !visible)}>
                    Contact Us
                </button>
                {showContact && <Contact />}
            </div>
        </info.Provider>
    );
}

function Home() {
    return (
        <div>
            <p>Tejdeep</p>
            <p>Mahanth</p>
        </div>
    );
}

function Display() {
    const data = useContext(info);

    return (
        <div>
            {data.map((restaurant) => (
                <div key={`${restaurant.name}-${restaurant.info}`}>
                    <p>{restaurant.name}</p>
                    <p>{restaurant.info}</p>
                    <p>{restaurant.noofstaff}</p>
                </div>
            ))}
        </div>
    );
}

function AddDashboard({ setData }: { setData: Dispatch<SetStateAction<Restaurant[]>> }) {
    const [user, setUser] = useState<Restaurant>({ name: "", info: "", noofstaff: "" });

    function add(event: any) {
        event.preventDefault();
        setData((currentData) => [...currentData, user]);
        setUser({ name: "", info: "", noofstaff: "" });
    }

    return (
        <form onSubmit={add}>
            <input
                type="text"
                value={user.name}
                placeholder="Enter name"
                onChange={(event) => setUser({ ...user, name: event.target.value })}
            />
            <br />
            <input
                type="text"
                value={user.info}
                placeholder="Enter info"
                onChange={(event) => setUser({ ...user, info: event.target.value })}
            />
            <br />
            <input
                type="number"
                value={user.noofstaff}
                placeholder="Enter number"
                onChange={(event) => setUser({ ...user, noofstaff: event.target.value })}
            />
            <br />
            <button name="submit" type="submit">
                submit
            </button>
        </form>
    );
}

function Contact() {
    return <p>Contact us for more information.</p>;
}