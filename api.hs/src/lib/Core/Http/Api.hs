module Core.Http.Api 
  ( Api, api )
where 

import Protolude
import Core.Http.Routes.ListLinks ( ListLinks )


type Api = ListLinks

api :: Proxy Api 
api = Proxy 