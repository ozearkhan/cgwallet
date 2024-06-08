import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import  {Users}  from "../components/Users.jsx"
import Card from "../components/Card.jsx";


export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className=" max-w-7xl mx-auto m-8">
            <Balance/>
            <Users />

        </div>
    </div>
}