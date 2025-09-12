import { DateInfo } from "@/lib/type";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import AddDateInfoButton from "./AddDateInfoButton";
import DateElement from "./DateElement";

export default function Dates({ index, filter, dateInfo }: { index: number, filter: string | null, dateInfo: DateInfo[] }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);

    return (
        <div className="flex-1">
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
            {
                Array.from({ length: 42 }, (_, i) => {
                    const date = new Date(firstDate);
                    date.setDate(date.getDate() + i - firstDate.getDay());

                    return date;
                }).map((date, index) => {
                    const info = dateInfo.find((d: DateInfo) => d.date === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

                    return (
                        <div 
                            key={index}
                            className={`
                                flex flex-col items-center justify-center rounded
                                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                                ${filter && info?.holiday.includes(filter) ? 'bg-yellow-200' : 
                                    date.getMonth() === firstDate.getMonth() ? 'bg-white' : 'bg-gray-200 text-gray-600'
                                }
                            `}
                        >
                            {
                                info ? 
                                <RestrictedLink href={`/calendar/${info.id}`} className="w-full h-full flex flex-col items-center justify-center">
                                    <DateElement date={date} info={info} />
                                </RestrictedLink> :
                                <AddDateInfoButton date={date} />
                            }
                        </div>
                    );
                })
            }
            </div>
        </div>
        
    )
}