import { fetchResources, fetchTags } from "../utils/resource-api-utils"

export default function MainContainer({children}){
    fetchResources()
    fetchTags()

    return <main>{children}</main>
}