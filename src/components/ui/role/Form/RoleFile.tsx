import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import OptionUrlUI from "../../global/OptionUrlUI";
import { Dispatch, SetStateAction } from "react";

export default function RoleFile({ title, defaultFile, changed = true, setChanged }: { title: string, defaultFile?: { url: string, filename: string }, changed?: boolean, setChanged?: Dispatch<SetStateAction<boolean>> }) {
    

    return (
        <div className="flex flex-col gap-2">
            <label className="font-bold">{title}</label>
            {
                changed ? 
                    <div className="flex items-center gap-2">
                        <DefaultInput
                            title={title}
                            name="file"
                            type="file"
                            required
                            className="flex-1"
                            accept="image/*"
                        />
                    </div> :
                    <div className="flex items-center gap-2">
                        <OptionUrlUI url={defaultFile!.url} label={defaultFile!.filename} className="flex-1" />
                        <BlueButton
                            onClick={() => setChanged && setChanged(true)}
                            type="button"
                        >
                            変更
                        </BlueButton>
                    </div>
            }
        </div>
    )
}
