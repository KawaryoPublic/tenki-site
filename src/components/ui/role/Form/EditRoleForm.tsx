"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Role } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableInput from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useState, useActionState } from "react";
import { uploadFiles } from "@/lib/utils";
import { ROLE_LABELS, TIER_LABELS } from "@/lib/const";
import DefaultAddableSelect from "../../global/Form/DefaultAddableSelectOption";

export default function EditRoleForm({ role }: { role: Role }) {
    return (
        <div></div>
    )
}
