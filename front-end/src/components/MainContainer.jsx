import { fetchResources, fetchTags } from "../utils/resourceApiUtils"

export default function MainContainer({children}){
    fetchResources()
    fetchTags()

    return <main>{children}</main>
}