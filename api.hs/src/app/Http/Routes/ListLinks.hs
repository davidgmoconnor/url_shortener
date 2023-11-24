module Http.Routes.ListLinks
  (
    listLinks
  )
where 

import Protolude hiding (Handler)
import Servant hiding ( Context, Link, respond )
import Context ( Context )
import App ( runWith )
import Core.Shared.Types ( Link (..))
import Core.Shared.Dto ( Slice (..), LinkDto, fromLink )
import Core.Read.ListLinks ( Payload (..), Error (..), execute )

listLinks :: Context -> Maybe Float -> Maybe Float -> Maybe Text -> Handler (Slice LinkDto)
listLinks ctx start end filter = 
    (runWith ctx . runExceptT . execute $ Payload (fromMaybe 0 start) (fromMaybe 10 end) filter)
    >>= either handleError respond

respond :: Slice Link -> Handler (Slice LinkDto)
respond = return . map fromLink

handleError :: Error -> Handler (Slice LinkDto)
handleError (Service err) = do 
    print err
    throwError err500