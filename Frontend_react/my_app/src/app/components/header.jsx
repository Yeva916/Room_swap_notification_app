import Notification from "./notification"
import Link from 'next/link'
const Header = ()=>{
    return (
        <header>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between p-4 rounded-lg shadow-lg">
          <div className="text-white text-lg font-bold"><Link href="/home">User Profile</Link></div>
          <div className=" flex gap-6 justify-between">
            <div className="text-white">status</div>
            <div className="text-white"><Link href="/list">List</Link></div>
            <Notification/>
          </div>
          
        </div>
      </header>
    )
}
export default Header