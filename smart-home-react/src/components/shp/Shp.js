import AwayMode from "../shp/AwayMode";

const Shp = ({ shpDoors, shpWindows }) => {

    return (
        <div
            id="awayModeCtn"
            className="px-4 py-2 gap-2">
            <p>
                <b>Away Mode</b>
            </p>
            <AwayMode layoutDoors={shpDoors} layoutWindows={shpWindows}/>
        </div>
    );


};

export default Shp;