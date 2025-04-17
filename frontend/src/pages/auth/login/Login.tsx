import icon from "../../../assets/icon.png";
import React, {useEffect, useState} from "react";
import {AuthBigFrameStyles, IconDivStyle} from "../AuthStyles";
import {
    LoginButtonsDiv,
    LoginErrorBody,
    LoginErrorDiv,
    LoginErrorLIStyle,
    LoginErrorULStyle,
    LoginFormDiv,
    LoginTitle
} from "./LoginStyles";
import Header from "../../../components/headers/Header";
import {Field, FieldStatus} from "../../../components/field/Field";
import Button from "../../../components/button/Button";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import {ErrorDisplay} from "../components/error_display/ErrorDisplay";
import {BackgroundStyles} from "../../../components/frame/BackgroundStyles";
import {login} from "../../../server/AuthRequests";
import {getMe} from "../../../server/UserRequests";
import {useDispatch} from "react-redux";
import {clearActiveUser, setActiveUser} from "../../../store/ActiveUser";
import {PNGIconStyle} from "../../../components/icon/IconStyles";
import {useTranslation} from "react-i18next";

export default function Login() {
    const dispatch = useDispatch();
    const [t] = useTranslation()

    useEffect(() => {
        localStorage.removeItem("token")
        dispatch(clearActiveUser())
    }, [])

    type Statuses = {
        username: FieldStatus;
        password: FieldStatus;
    }

    type Inputs = {
        username: string;
        password: string;
    }

    const navigate = useNavigate();

    const [inputs, setInputs] = useState<Inputs>({
        username: "",
        password: "",
    });

    const [statuses, setStatuses] = useState<Statuses>({
        username: FieldStatus.Default,
        password: FieldStatus.Default,
    });

    const [error, setError] = useState<string[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const name = event.currentTarget.id;
        // set all to default and then set the clicked one to focused
        setStatuses({
            username: FieldStatus.Default,
            password: FieldStatus.Default
        })
        setStatuses(values => ({...values, [name]: FieldStatus.Focused}))
    }


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

    function logToServer() {
        if (!isValidInput(inputs.username, inputs.password)) {
            updateErrors(["Invalid username or password"])
            return
        }
        const body = validator.isEmail(inputs.username) ? {
            email: inputs.username,
            password: inputs.password
        } : {
            username: inputs.username,
            password: inputs.password
        }

        login(body).then(
            response => {
                switch (response.status) {
                    case 200:
                        response.json().then((data: any) => {
                            localStorage.setItem("token", data.token)
                            loadUser().then(() => {
                            }).catch(e => console.error(e))
                            navigate("/feed")
                        })
                        break;
                    case 404:
                    case 401:
                        updateErrors(["Invalid username or password."])
                        break;
                    default:
                        updateErrors(["Something went wrong. Try again later."])
                }
            })
        setFieldStatuses(FieldStatus.Default)
        setError([])
    }

    function loadUser() {
        return getMe()
            .then(response => {
                switch (response.status) {
                    case 200:
                        response.json().then((data: any) => {
                            console.log("login data: ", data)
                            dispatch(setActiveUser(data))
                        })
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
    }

    function isValidInput(username: string, password: string): boolean {
        return username !== "" && password !== ""
    }

    function updateErrors(errors: string[]) {
        setError(errors)
        setFieldStatuses(FieldStatus.Error)
    }

    function setFieldStatuses(status: FieldStatus) {
        setStatuses({
            username: status,
            password: status,
        })
    }


    return (
        <BackgroundStyles>
            <AuthBigFrameStyles>
                <IconDivStyle>
                    <PNGIconStyle variant={"big"} src={icon}></PNGIconStyle>
                </IconDivStyle>
                <LoginTitle>
                    <Header variant={"3"}>{t("login_title.1")}<br/>
                        @{t("login_title.2")}</Header>
                </LoginTitle>
                <LoginFormDiv>
                    {usernameField}
                    {passwordField}
                </LoginFormDiv>
                <LoginButtonsDiv>
                    <Button variant={"follow"} size={"M"} onClick={() => logToServer()}>
                        {t("Log in")}
                    </Button>
                    <Button variant={"outlined"} size={"M"} onClick={() => navigate("/signup")}>
                        {t("Register")}
                    </Button>
                </LoginButtonsDiv>
                <LoginErrorDiv>
                    <ErrorDisplay errors={error} SingleError={LoginErrorBody}
                                  MultipleErrors={LoginErrorULStyle} Items={LoginErrorLIStyle}/>
                </LoginErrorDiv>
            </AuthBigFrameStyles>
        </BackgroundStyles>
    )
}