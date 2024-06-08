import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Arrowleft, Arrowright } from '../components/Icons';
import axios from 'axios';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import {Users}  from "../components/Users";
import {API_BASE_URL} from "../../apiConfig.js";

function LandingPage() {
    const [topSenders, setTopSenders] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/v1/user/top-senders`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setTopSenders(response.data.users);
        });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Appbar />
            <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                        <div className="text-2xl font-bold text-gray-900 mb-5 mt-5">Account</div>
                        <Card>
                            <div className="p-4">
                                <div className="text-xs font-normal text-slate-500">Your balance</div>
                                <div className="text-2xl font-semibold">Rs 3,524.60</div>
                            </div>
                        </Card>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 mb-5 mt-5">Actions</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <div className="flex justify-between items-center">
                                    <span>Transfer</span>
                                    <Arrowleft />
                                </div>
                            </Card>
                            <Card>
                                <div className="flex justify-between items-center">
                                    <span>Receive</span>
                                    <Arrowright />
                                </div>
                            </Card>
                            {topSenders.slice(0, 2).map((sender, index) => (
                                <Card key={index}>
                                    <div className="flex justify-between items-center">
                                        <span>Send to {sender.firstName}</span>
                                        <span>{sender.firstName}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900 mb-5 mt-5">Users</div>
                        <Balance />
                        <Users />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
