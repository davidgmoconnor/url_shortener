module Read.ListLinks 
  (listLinks)
where

import Protolude
import Control.Monad.Catch ( MonadCatch )
import Core.Shared.Types ( ServiceError (..), Link (..))
import Core.Shared.Dto ( Slice (..) )
import Context ( Context)


listLinks 
  :: MonadIO m 
  => MonadCatch m 
  => MonadReader Context m 
  => Float 
  -> Float 
  -> Maybe Text 
  -> ExceptT ServiceError m (Slice Link)

listLinks _ _ _ = do 
    return Slice {
        items = [Link {
            linkUrl = "http://google.com",
            linkShortFormUrl = "pbid.com/abcdefg"
        }],
        total = 1
    }