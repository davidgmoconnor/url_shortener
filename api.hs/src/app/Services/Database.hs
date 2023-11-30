module Services.Database (
    query,
    runCount,
    dbErr,
    hoistDbError,
    fromDocument
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

runCount
  :: MonadIO m 
  => MonadCatch m 
  => MonadReader Context m
  => Action m Int 
  -> ExceptT ServiceError m Int

runCount q = do
  let db = "test"
  pipe <- asks contextDb
  handleExceptT handler $ access pipe master db q

handler :: SomeException -> ServiceError 
handler = Database . DatabaseUnknownError . show

dbErr :: Text -> ServiceError
dbErr = Database . DatabaseUnknownError

hoistDbError :: Monad m => Either Text a -> ExceptT ServiceError m a 
hoistDbError = hoistEither . fmapL dbErr

fromDocument :: Text -> (Document -> Maybe a) -> [Document] -> Either Text [a] -> Either Text [a]
fromDocument _ _ [] y = y 
fromDocument _ _ _ (Left y) = Left y
fromDocument t f (x:xs) (Right ys) = case f x of 
                                    Just v -> fromDocument t f xs $ Right $ ys ++ [v]
                                    Nothing -> Left $ "Invalid Document: " <> t