import { useNavigate, useParams } from "react-router";
import { useState } from "react";

import { wbService } from "../services/wb";

import { ActionSidebar } from "../cmps/ActionSidebar";
import WbList from "../cmps/wb/WbList";
import { NotFoundActions } from "../cmps/NotFoundActions";

const WbIndex = () => {
    console.log('index render');

    const { folder } = useParams()
    const navigate = useNavigate()
    const [allWb, setallWb] = useState([])
    const [filter, setFilter] = useState({ label: 'All whiteboards', text: '' })

    function onSetFilter(label) {
        setFilter(prev => ({ ...prev, label }))
    }

    async function onNewWb() {
        console.log('hi');

        const newWb = await wbService.save(wbService.getEmptyWb())
        navigate(`/wb/${newWb._id}`)
    }

    return (
        <main className="wb-index">
            {/* <aside className="wb-sidebar">

            </aside> */}
            <ActionSidebar onSetFilter={onSetFilter} label={filter.label} operator={'wb'} />
            <main>
                <header className="wb-header" onClick={() => { console.log('heyyy') }}>
                    <h2>{filter.label} {folder}</h2>
                    <button className="flex" onClick={onNewWb}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><symbol xmlns="http://www.w3.org/2000/svg" id="a" viewBox="0 0 16 16"><path d="M13.5.5a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2a.5.5 0 0 0 0-1h-2zM3.5 3.5A2.5 2.5 0 0 0 1 6v6.5A2.5 2.5 0 0 0 3.5 15H10a2.5 2.5 0 0 0 2.5-2.5v-4a.5.5 0 0 1 1 0v4A3.5 3.5 0 0 1 10 16H3.5A3.5 3.5 0 0 1 0 12.5V6a3.5 3.5 0 0 1 3.5-3.5h4a.5.5 0 0 1 0 1z" /></symbol><use href="#a" /></svg>
                        <span>
                            New

                        </span>
                    </button>
                </header>
                {allWb.length ?
                    <WbList></WbList> :
                    <NotFoundActions label={filter.label} operator={'wb'} CBF={onNewWb} />
                }
            </main>


        </main>
    );
};

export default WbIndex;