import React from "react";
import {FieldInputStyle, FieldLabelStyle, FieldStyle} from "./FieldStyles";

export type FieldProps = {
    id: string;
    children: string;
    placeholder?: string;
    value: string;
    isPassword?: boolean;
    status: FieldStatus;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export enum FieldStatus {
    Default = "default",
    Focused = "focused",
    Disabled = "disabled",
    Error = "error",
}

export function Field({
                          id,
                          children,
                          placeholder,
                          value,
                          isPassword,
                          status,
                          onBlur,
                          handleInputChange,
                          handleClick
                      }: FieldProps) {

    const ref = React.useRef<HTMLInputElement>(null);

    const changeFocus = () => {
        ref.current?.focus()
    }

    return (
        <FieldStyle status={status} id={id} onClick={(event) => {
            changeFocus()
            handleClick(event)
        }}>
            <FieldLabelStyle status={status}>{children}</FieldLabelStyle>
            <FieldInputStyle
                disabled={status === "disabled"}
                status={status}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                ref={ref}
                onBlur={onBlur}
                type={isPassword ? "password" : "text"}/>
        </FieldStyle>
    )
}