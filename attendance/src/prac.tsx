import {useEffect,useState,useContext,createContext} from 'react';

export default function Prac() {
    const [name,setName] = useState("");
    const [cnt,setcnt]=useState(0);
    function Inc(){
        setcnt(cnt+1);
    }
    useEffect(Inc,[name]);
    return (
        <div>
            <p>{cnt}</p>
            <form>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                    onChange={(e)=>{setName(e.target.value)}}
                ></input>
                <br/>
                <p>{name}</p>
                <br/>
                <button id="Submit" onClick={()=>setName("")}>
                    Submit
                </button>
            </form>
        </div>
    )
}