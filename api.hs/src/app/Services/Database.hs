module Services.Database (
    query ,
    dbErr,
    hoistDbError
) where

import Protolude 
import Control.Monad.Catch ( MonadCatch )
import Control.Error ( handleExceptT, hoistEither, fmapL )
import Database.MongoDB
import Context ( Context, contextDb )
import Core.Shared.Types ( ServiceError (..), DatabaseError (..) )

query
  :: MonadIO m 
  => MonadCatch m 
  => MonadReader Context m 
  => Action m Cursor
  -> ExceptT ServiceError m [Document]

query q = do
  -- pull form context
  let db = "test"
  pipe <- asks contextDb
  handleExceptT handler $ access pipe master db (rest =<< q)

handler :: SomeException -> ServiceError 
handler = Database . DatabaseUnknownError . show

dbErr :: Text -> ServiceError
dbErr = Database . DatabaseUnknownError

hoistDbError :: Monad m => Either Text a -> ExceptT ServiceError m a 
hoistDbError = hoistEither . fmapL dbErr