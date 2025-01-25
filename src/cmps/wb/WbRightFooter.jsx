const WbRightFooter = ({ onSelectTool, zoom, onSetZoon, selectedTool }) => {

    return (
        <ul className="wb-right-footer">
            <li
                style={{ backgroundColor: selectedTool === 'grab' ? 'skyblue' : 'gray' }}
                onClick={() => { onSelectTool('grab') }}
            >grab|</li>
            <li onClick={() => { onSetZoon(-1) }}>Pen</li>
            <li>{(zoom * 100).toFixed(0)}%</li>
            <li onClick={() => { onSetZoon(1) }}>Line</li>
        </ul>
    );
};

export default WbRightFooter;