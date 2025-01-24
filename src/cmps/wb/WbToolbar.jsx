const WbToolbar = ({onSelectTool}) => {

    return (
        <ul className="wb-toolbar">
           <li onClick={()=>{onSelectTool('select')}}>Sel</li>
           <li onClick={()=>{onSelectTool('pen')}}>Pen</li>
           <li onClick={()=>{onSelectTool('rectangle')}}>rec</li>
           <li onClick={()=>{onSelectTool('line')}}>Line</li>
        </ul>
    );
};

export default WbToolbar;