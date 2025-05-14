import ResourceContextProvider from "../context/resources-context"

export default function MainContainer({children}){
    return (
    <ResourceContextProvider>
        <main>{children}</main>

    </ResourceContextProvider>    

)
}