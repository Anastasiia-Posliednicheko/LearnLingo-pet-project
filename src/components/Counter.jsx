import { useState } from "react";

export default function SearchList({ users }) {
    const [query, setQuery] = useState("");

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <div key={users.id}>{users.name}</div>
        </div>

    );
}