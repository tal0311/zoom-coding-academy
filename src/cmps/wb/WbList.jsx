const WbList = ({wbs}) => {

    if (!wbs) return <h1>the are no whiteboards</h1>
    return (
        <ul className="wb-list">
           <pre>{wbs}</pre>

        </ul>
    );
};

export default WbList;