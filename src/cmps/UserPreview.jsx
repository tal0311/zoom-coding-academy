import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import GIcon from "./GIcon";
import { useSelector } from "react-redux";

export function UserPreview() {
    const userStatus = useSelector(store => store.userModule.user.status)
    const userImgUrl = useSelector(store => store.userModule.user.profile_picture)

    const [statusIcon, setStatusIcon] = useState(userStatus)
    const location = useLocation()

    useEffect(() => {
        const isInMeeting = location.pathname.includes('meeting')
        setStatusIcon(isInMeeting ? 'in-meeting' : userStatus)
    }, [location.pathname, userStatus])

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
            <img className="user-img" src={userImgUrl} alt="User profile picture" />
            <div className="status-icon-bg"></div>
            <GIcon className="status-icon" iconName={iconName} />
        </div>
    )
}