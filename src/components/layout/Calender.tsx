import Days from "../ui/calender/Days";
import Dates from "../ui/calender/Dates";

export default function Calender() {
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    console.log(firstDay.getDay());

    return (
        <section className="flex flex-col">
            <Days />
            <Dates />
        </section>
    )
}