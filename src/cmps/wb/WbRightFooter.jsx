const WbRightFooter = ({onSelectTool,zoom,onSetZoon}) => {

    return (
        <ul className="wb-right-footer">
           <li onClick={()=>{onSelectTool('pan')}}>grab|</li>
           <li onClick={()=>{onSetZoon(-1)}}>Pen</li>
           <li>{(zoom * 100).toFixed(0)}%</li>
           <li onClick={()=>{onSetZoon(1)}}>Line</li>
        </ul>
    );
};

export default WbRightFooter;