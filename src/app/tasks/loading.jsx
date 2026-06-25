import { PulseLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="min-h-screen bg-[#070709] flex items-center justify-center">
            <PulseLoader color="#10b981" size={10} speedMultiplier={0.8} />
        </div>
    );
};

export default Loading;