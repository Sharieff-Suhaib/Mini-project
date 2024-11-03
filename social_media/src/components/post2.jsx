import React from "react";
import Feed from "./Feed";
import { jwtDecode } from "jwt-decode";
function Post2(){
    const userId=localStorage.getItem('user_id');
    return(

        <div>
              <Feed loggedInUserId={userId}/>
        </div>
    )
}
export default Post2;