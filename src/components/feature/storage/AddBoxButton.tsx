import BlueButton from "../../Button/BlueButton";

export default function AddBoxButton({ tab }: { tab: number }) {
    return (
        <BlueButton
            onClick={async () => {
                await fetch("/api/box", {
                    method: "POST",
                    body: JSON.stringify({
                        name: "",
                        tab: tab
                    })
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            機材を追加
        </BlueButton>
    );
}