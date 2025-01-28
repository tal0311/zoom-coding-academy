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
            path: '/wb/dashboard',
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
        <header className="app-header bg-text main-layout">
            <div className="grid items-center grid-flow-col h-full">

                <GIcon className="logo" iconName="Logo" />
                <nav className=''>
                    <ul className='nav-list grid grid-flow-col'>
                        {routes.map((route, index) => (
                            <li key={index}>
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                                >
                                    <GIcon iconName={route.icon} />
                                    <span className="txt">{route.name}</span>
                                </NavLink>
                            </li>
                        ))}
                        <li className="cursor-pointer">
                            <GIcon iconName="More" />
                            <span className="txt">More</span>
                        </li>
                    </ul>
                </nav>
                <span>user-preview</span>
            </div>
        </header>
    )
}