import GIcon from "./GIcon"

const allFilters = [
    {
        forCmp: ['note'],
        title: 'All notes',
        icon: 'About',
    },
    {
        forCmp: ['wb'],
        title: 'All whiteboards',
        icon: 'About',
    },
    {
        forCmp: ['note', 'wb'],
        title: 'Recent',
        icon: 'About',
    },
    {
        forCmp: ['note'],
        title: 'My notes',
        icon: 'About',
    },
    {
        forCmp: ['wb'],
        title: 'My whiteboards',
        icon: 'About',
    },
    {
        forCmp: ['note', 'wb'],
        title: 'Shared with me',
        icon: 'About',
    },
    {
        forCmp: ['note', 'wb'],
        title: 'Starred',
        icon: 'About',
    },
    {
        forCmp: ['note', 'wb'],
        title: 'Trash',
        icon: 'About',
    },
]

export function ActionSidebar({ onSetFilter, label, operator }) {
    return (
        <section className="action-sidebar flex flex-col gap-1 px-2 py-3.5">
            {allFilters
                .filter(({ forCmp }) => forCmp.includes(operator))
                .map(({ title, icon }) => (
                    <button
                        key={title}
                        className={`filter-item flex items-center gap-3 h-8 rounded-lg ${label === title ? 'active' : ''}`}
                        onClick={() => onSetFilter(title)}
                    >
                        <GIcon iconName={icon} />
                        {title}
                    </button>
                ))
            }
        </section>
    )
}