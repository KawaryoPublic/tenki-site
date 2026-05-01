"use client";

import BlueButton from "../../global/Button/BlueButton";

export default function GoBackButton() {
    return (
        <BlueButton onClick={() => window.history.back()}>戻る</BlueButton>
    );
}
