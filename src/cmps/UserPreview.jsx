import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import { useSelector } from "react-redux";
import GIcon from "./GIcon";

export function UserPreview() {
    // const userStatus = useSelector(state => state.userModule.user.status)
    // const userImgUrl = useSelector(state => state.userModule.user.profile_picture)

    const userStatus = 'online'
    const userImgUrl = 'https://res.cloudinary.com/dvpkhwyxp/image/upload/v1691173815/cld-sample.jpg'

    const [statusIcon, setStatusIcon] = useState(userStatus)
    const location = useLocation()

    useEffect(() => {
        const isInMeeting = location.pathname.includes('meeting')
        setStatusIcon(isInMeeting ? 'in-meeting' : userStatus)
    }, [location.pathname, userStatus])

    const iconMap = {
        'online': 'Online',
        'offline': 'Offline',
        'in-meeting': 'InMeeting',
        'away': 'Away',
        'busy': 'Busy',
        'do-not-disturb': 'DoNotDisturb',
        'out-of-office': 'OutOfOffice'
    }
    
    const iconName = iconMap[statusIcon]
    const className = statusIcon === 'in-meeting' ? 'meeting' : ''

    return (
        <div className={'user-preview ' + className}>
            <img className="user-img" src={userImgUrl} alt="User profile picture" />
            <div className="status-icon-bg"></div>
            <GIcon className="status-icon" iconName={iconName} />
        </div>
    )
}