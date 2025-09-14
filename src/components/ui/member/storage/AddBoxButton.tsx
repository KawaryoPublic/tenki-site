import BlueButton from "../../global/button/BlueButton";

export default function AddBoxButton({ floor }: { floor: number }) {
    return (
        <BlueButton
            onClick={async () => {
                await fetch("/api/box", {
                    method: "POST",
                    body: JSON.stringify({
                        name: "",
                        floor: floor
                    })
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            機材を追加
        </BlueButton>
    );
}