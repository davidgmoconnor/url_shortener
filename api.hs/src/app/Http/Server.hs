module Http.Server 
  ( server )
where 

import Servant hiding ( Context )
import Core.Http.Api ( Api )
import Context ( Context )
import Http.Routes.ListLinks ( listLinks )

server :: Context -> Server Api 
server ctx = listLinks ctx
