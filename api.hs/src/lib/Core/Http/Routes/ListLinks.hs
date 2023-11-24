module Core.Http.Routes.ListLinks 
  ( ListLinks )
where 

import Protolude
import Servant.API
import Core.Shared.Dto ( LinkDto, Slice )

type ListLinks 
    = "links"
    :> QueryParam "start" Float 
    :> QueryParam "end" Float 
    :> QueryParam "filter" Text
    :> Get '[JSON] (Slice LinkDto)