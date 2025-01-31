import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import GIcon from "./GIcon";

export function UserPreview() {
    // Temp state since no store yet:
    const [user, setUser] = useState({
        name: 'Pukinshtein',
        email: 'puki12@gmail.com',
        profile_picture: 'https://res.cloudinary.com/dvpkhwyxp/image/upload/v1691173815/cld-sample.jpg',
        status: 'online'
    })
    const [statusIcon, setStatusIcon] = useState(user.status)
    const location = useLocation()

    useEffect(() => {
        const isInMeeting = location.pathname.includes('meeting')
        setStatusIcon(isInMeeting ? 'in-meeting' : user.status)
    }, [location.pathname, user.status])

    var iconName = 'Offline'
    const className = statusIcon === 'in-meeting' ? 'meeting' : ''

    if (statusIcon === 'online') iconName = 'Online'
    else if (statusIcon === 'in-meeting') iconName = 'InMeeting'
    else if (statusIcon === 'away') iconName = 'Away'
    else if (statusIcon === 'busy') iconName = 'Busy'
    else if (statusIcon === 'do-not-disturb') iconName = 'DoNotDisturb'
    else if (statusIcon === 'out-of-office') iconName = 'OutOfOffice'

    return (
        <div className={'user-preview ' + className}>
            <img className="user-img" src={user.profile_picture} alt="User profile picture" />
            <div className="status-icon-bg"></div>
            <GIcon className="status-icon" iconName={iconName} />
        </div>
    )
}