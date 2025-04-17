import {StyledComponent} from "styled-components";

export type ErrorDisplayProps = {
    errors: string[];
    SingleError: StyledComponent<"body", any>;
    MultipleErrors: StyledComponent<"ul", any>
    Items: StyledComponent<"li", any>
}


export function ErrorDisplay({errors, SingleError, MultipleErrors, Items}: ErrorDisplayProps) {
    switch (errors.length) {
        case 0:
            return (<></>)
        case 1:
            return (<SingleError>{errors[0]}</SingleError>)
        default:
            return (
                <MultipleErrors>
                    {errors.map((error, index) => {
                        return (
                            <Items key={index}>
                                {error}
                            </Items>
                        )
                    })
                    }
                </MultipleErrors>
            )
    }


}