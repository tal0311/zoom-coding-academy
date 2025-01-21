import { Outlet } from "react-router"



function MeetingLobby(){

    return( 
    <div>
        <h1>meeting lobby</h1>
        <Outlet />
    </div>)
}

export default MeetingLobby