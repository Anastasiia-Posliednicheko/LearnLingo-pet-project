import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Unlock your potential with the best language tutors</h1>
            <p>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
            <button onClick={() => navigate("/teachers")}>Get started</button>
        </div>
    );
}