"use client";

import Form from "next/form";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { redirect } from "next/navigation";
import WhiteFrameUI from "../WhiteFrameUI";

export default function DefaultSearchForm({ url, title, text, selects = [], checks = [], className = "" }: { url: string, title: string, text?: { label: string, defaultValue?: string }, selects?: { title: string, name: string, values: { label: string, value: string }[], defaultValue?: string }[], checks?: { title: string, name: string, defaultValue?: boolean }[], className?: string }) {
    return (
        <Form 
            action={async data => {
                const tags = [];
                const texts = [];

                const parts = (data.get("search") as string).trim().split(/\s+/g);

                for (const part of parts) {
                    if (part.startsWith("#")) {
                        const tag = part.substring(1);
                        if(tag) tags.push(tag);
                    } else {
                        if(part) texts.push(part);
                    }
                }

                let redirectUrl = url;
                let addQMark = true;

                if(tags.length !== 0) {
                    redirectUrl += `?tags=${tags.join(",")}`;
                    addQMark = false;
                }

                if(texts.length !== 0) {
                    redirectUrl += (addQMark ? "?" : "&") + `${text?.label}=${texts.join(",")}`;
                    addQMark = false;
                }

                for(const select of selects) {
                    const value = data.get(select.name);

                    if(value === "") continue;

                    redirectUrl += (addQMark ? "?" : "&") + `${select.name}=${value}`;
                    addQMark = false;
                }

                for(const check of checks) {
                    const value = data.get(check.name);

                    if(value !== "on") continue;

                    redirectUrl += (addQMark ? "?" : "&") + `${check.name}=${value}`;
                    addQMark = false;
                }

                redirect(redirectUrl);
            }}
            className={`flex flex-col sm:flex-row gap-1 z-2 ${className}`}
        >   
            <DefaultInput
                title={title}
                name="search"
                defaultValue={text?.defaultValue}
                className="flex-1 text-xs md:text-sm"
            />
            <div className="flex gap-1 md:gap-2">
                {
                    selects.map((select, i) => (
                        <DefaultSelect
                            key={i}
                            title={select.title}
                            name={select.name}
                            defaultValue={select.defaultValue}
                            options={select.values.map(value => ({ label: value.label, value: value.value }))}
                        />
                    ))
                }
                {
                    checks.map((check, i) => (
                        <WhiteFrameUI className="flex gap-1 md:gap-2">
                            {check.title}:
                            <DefaultInput
                                key={i}
                                type="checkbox"
                                title={check.title}
                                name={check.name}
                                defaultChecked={check.defaultValue}
                            />
                        </WhiteFrameUI>
                    ))
                }
                <BlueButton className="ml-auto">検索</BlueButton>
            </div>
            
        </Form>
    )
}