import {
    SignupButtonsDiv,
    SignupErrorBody,
    SignupErrorDiv,
    SignupErrorLIStyle,
    SignupErrorULStyle,
    SignupFormDiv,
    SignUpTitle
} from "./SignupStyles";
import Header from "../../../components/headers/Header";
import Button from '../../../components/button/Button';
import {useNavigate} from "react-router-dom";
import validator from 'validator'
import icon from "../../../assets/icon.png";
import {Field, FieldStatus} from "../../../components/field/Field";
import {AuthBigFrameStyles, IconDivStyle} from "../AuthStyles";
import React, {useState} from "react";
import {ErrorDisplay} from "../components/error_display/ErrorDisplay";
import {BackgroundStyles} from "../../../components/frame/BackgroundStyles";
import {signup} from "../../../server/AuthRequests";
import {PNGIconStyle} from "../../../components/icon/IconStyles";
import {useTranslation} from "react-i18next";


type Statuses = {
    name: FieldStatus;
    username: FieldStatus;
    email: FieldStatus;
    password: FieldStatus;
    confirm: FieldStatus;
}

type Inputs = {
    name: string;
    username: string;
    email: string;
    password: string;
    confirm: string;
}


export default function Signup() {
    const [t] = useTranslation()

    const [inputs, setInputs] = useState<Inputs>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [statuses, setStatuses] = useState<Statuses>({
        name: FieldStatus.Default,
        username: FieldStatus.Default,
        email: FieldStatus.Default,
        password: FieldStatus.Default,
        confirm: FieldStatus.Default,
    });

    const [error, setError] = useState<string[]>([])


    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const name = event.currentTarget.id;
        // set all to default and then set the clicked one to focused
        setStatuses({
            name: FieldStatus.Default,
            username: FieldStatus.Default,
            email: FieldStatus.Default,
            password: FieldStatus.Default,
            confirm: FieldStatus.Default,
        })
        setStatuses(values => ({...values, [name]: FieldStatus.Focused}))
    }

    const registerUser = () => {
        if (!validateInputs(inputs.email, inputs.password, inputs.confirm)) return
        setError([])
        signup(inputs.name, inputs.username, inputs.email, inputs.password).then(r => {
            switch (r.status) {
                case 201: {
                    navigate("/login")
                    break;
                }
                case 409: {
                    setError(["Username or email already exists."])
                    break;
                }
                case 500: {
                    setError(["Something went wrong. Try again later."])
                    break;
                }
                default: {
                    setError(["Something went wrong. Try again later."])
                }
            }
        })
    }

    function validateInputs(email: string, password: string, confirm: string) {
        if (!validator.isEmail(email)) {
            setError(["Email is invalid."])
            setStatuses(values => ({...values, email: FieldStatus.Error}))
            return false;
        }
        if (!validator.isStrongPassword(password)) {
            setError(
                ["Password must be at least 8 characters long.",
                    "Password must contain at least 1 uppercase letter.",
                    "Password must contain at least 1 lowercase letter.",
                    "Password must contain at least 1 number.",
                    "Password must contain at least 1 symbol."]
            )
            setStatuses(values => ({...values, password: FieldStatus.Error}))
            return false;
        }
        if (!validator.equals(password, confirm)) {
            setError(["Passwords do not match."])
            setStatuses(values => ({...values, confirm: FieldStatus.Error}))
            return false;
        }
        return true;
    }

    const nameField = <Field
        id="name"
        children={t("Name")}
        placeholder={t("name")}
        value={inputs.name}
        status={statuses.name}
        onBlur={() => {
            setStatuses(values => ({...values, name: FieldStatus.Default}))
        }}
        handleInputChange={handleChange}
        handleClick={handleClick}
    />

    const usernameField = <Field
        id="username"
        children={t("Username")}
        placeholder={t("username")}
        value={inputs.username}
        status={statuses.username}
        onBlur={() => {
            setStatuses(values => ({...values, username: FieldStatus.Default}))
        }}
        handleInputChange={handleChange}
        handleClick={handleClick}
    />

    const emailField = <Field
        id="email"
        children={t("Email")}
        placeholder={t("email")}
        value={inputs.email}
        status={statuses.email}
        onBlur={() => {
            setStatuses(values => ({...values, email: FieldStatus.Default}))
        }}
        handleInputChange={handleChange}
        handleClick={handleClick}
    />

    const passwordField = <Field
        id="password"
        children={t("Password")}
        placeholder={t("password")}
        value={inputs.password}
        isPassword={true}
        status={statuses.password}
        onBlur={() => {
            setStatuses(values => ({...values, password: FieldStatus.Default}))
        }}
        handleInputChange={handleChange}
        handleClick={handleClick}
    />

    const confirmField = <Field
        id="confirm"
        children={t("Confirm password")}
        placeholder={t("confirm password")}
        value={inputs.confirm}
        isPassword={true}
        status={statuses.confirm}
        onBlur={() => {
            setStatuses(values => ({...values, confirm: FieldStatus.Default}))
        }}
        handleInputChange={handleChange}
        handleClick={handleClick}
    />


    return (
        <BackgroundStyles>
            <AuthBigFrameStyles>
                <IconDivStyle>
                    <PNGIconStyle variant={"big"} src={icon}></PNGIconStyle>
                </IconDivStyle>
                <SignUpTitle>
                    <Header variant={"3"}>{t("Create your account")}</Header>
                </SignUpTitle>
                <SignupFormDiv>
                    {nameField}
                    {usernameField}
                    {emailField}
                    {passwordField}
                    {confirmField}
                </SignupFormDiv>
                <SignupButtonsDiv>
                    <Button variant={"follow"} size={"M"} onClick={() => registerUser()}>
                        {t("Register")}
                    </Button>
                    <Button variant={"outlined"} size={"M"} onClick={() => navigate("/login")}>
                        {t("Log in")}
                    </Button>
                </SignupButtonsDiv>
                <SignupErrorDiv>
                    <ErrorDisplay errors={error} SingleError={SignupErrorBody} MultipleErrors={SignupErrorULStyle}
                                  Items={SignupErrorLIStyle}/>
                </SignupErrorDiv>
            </AuthBigFrameStyles>
        </BackgroundStyles>
    )
}