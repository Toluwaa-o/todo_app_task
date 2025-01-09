import { FaSnowflake } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { CgDanger } from "react-icons/cg";

export const GetIcon = ({ name }) => {
    // Dynamically returns an icon component based on the provided `name` prop, with specified size and color
    switch (name) {
        case 'medium': return <FaPersonWalkingLuggage size={45} color="#E1C16E" />;
        case 'completed': return <FaCheckCircle size={45} color="#09D9B7" />;
        case 'today': return <LuCalendarClock size={45} color="#61a4ad" />;
        case 'high': return <CgDanger size={45} color="#F32013" />;
        case 'low': return <FaSnowflake size={45} color="#87CEEB" />;
        default: return null;
    }
};
