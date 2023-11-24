module Core.Read.ListLinks 
 (
    MonadListLinks (..),
    Payload (..),
    Error (..),
    execute
 )
where 

import Protolude 
import Control.Error ( fmapLT )
import Core.Shared.Types ( Link, ServiceError )
import Core.Shared.Dto   ( Slice )

class Monad m => MonadListLinks m where 
  listLinks :: Float -> Float -> Maybe Text -> ExceptT ServiceError m (Slice Link)

data Payload = Payload
  { start  :: Float
  , end    :: Float
  , filter :: Maybe Text
  } deriving (Eq, Show)

data Error 
  = Service ServiceError 
  deriving (Show)

execute
  :: MonadListLinks m 
  => Payload 
  -> ExceptT Error m (Slice Link)

execute Payload {..} =
  fmapLT Service $ listLinks start end filter