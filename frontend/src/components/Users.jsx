import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from 'lodash/debounce';
import {API_BASE_URL} from "../../apiConfig.js";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/user/bulk?filter=${filter}&page=${page}`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [filter, page]);

    const handleSearch = debounce((value) => {
        setFilter(value);
        setPage(1); // Reset to first page on new search
    }, 300);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div className="space-y-4">
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
            <div className="flex justify-between mt-4">
                <Button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    label={"Previous"}
                    disabled={page === 1}
                />
                <div>Page {page} of {totalPages}</div>
                <Button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    label={"Next"}
                    disabled={page === totalPages}
                />
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow rounded-lg">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-4">
                    <span className="text-xl font-bold">{user.firstName[0]}</span>
                </div>
                <div>
                    <div className="font-semibold">{user.firstName} {user.lastName}</div>
                </div>
            </div>
            <Button
                onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                label={"Send Money"}
            />
        </div>
    );
}
