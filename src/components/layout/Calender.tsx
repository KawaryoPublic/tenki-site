import Days from "../ui/calender/Days";
import Dates from "../ui/calender/Dates";

export default function Calender({index}: { index: number }) {
    return (
        <section className="flex-1 flex flex-col min-h-[50%]">
            <h2 className="flex justify-center item-center font-bold">{new Date().getMonth() + index + 1}月</h2>
            <Days />
            <Dates index={index} />
        </section>
    )
}