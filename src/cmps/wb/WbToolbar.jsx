const WbToolbar = ({ onSelectTool, selectedTool }) => {

    return (
        <ul className="wb-toolbar">
            <li
                style={{ backgroundColor: selectedTool === 'select' ? 'skyblue' : 'gray' }}
                onClick={() => { onSelectTool('select') }}>Sel</li>
            <li
                style={{ backgroundColor: selectedTool === 'pen' ? 'skyblue' : 'gray' }}
                onClick={() => { onSelectTool('pen') }}>Pen</li>
            <li
                style={{ backgroundColor: selectedTool === 'rectangle' ? 'skyblue' : 'gray' }}
                onClick={() => { onSelectTool('rectangle') }}>rec</li>
            <li
                style={{ backgroundColor: selectedTool === 'line' ? 'skyblue' : 'gray' }}
                onClick={() => { onSelectTool('line') }}>Line</li>
        </ul>
    );
};

export default WbToolbar;