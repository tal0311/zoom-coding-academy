import { NavLink } from "react-router-dom"
import GIcon from "./GIcon"

export function AppHeader() {

    const routes = [
        {
            path: '/',
            name: 'Home',
            icon: 'Home'
        },

        {
            path: '/about',
            name: 'About',
            icon: 'About'
        },
        {
            path: '/whiteboard',
            name: 'Whiteboards',
            icon: 'Whiteboards'
        },
        {
            path: '/chat',
            name: 'Team Chat',
            icon: 'TeamChat'
        },
    ]

    return (
        <header className="app-header bg-text bg-background-2 main-layout">
            <div className="grid items-center grid-flow-col h-full">

                <GIcon iconName="Logo" />
                <nav className=''>
                    <ul className='grid grid-flow-col'>
                        {routes.map((route, index) => (
                            <li key={index}>
                                <GIcon iconName={route.icon} />
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                                >
                                    {route.name}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <GIcon iconName="More" />
                            More
                        </li>
                    </ul>
                </nav>
                <span>user-preview</span>
            </div>
        </header>
    )
}