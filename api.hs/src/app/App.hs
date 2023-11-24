module App  
  ( App (..), runWith )
where 

import Protolude
import Control.Monad.Catch (MonadCatch, MonadThrow)
import Core.Read.ListLinks ( MonadListLinks (..) )
import Context ( Context )

import qualified Read.ListLinks as Read 

newtype App a = App { unApp :: ReaderT Context IO a }
  deriving newtype (MonadReader Context)
  deriving newtype MonadCatch 
  deriving newtype MonadThrow
  deriving newtype MonadIO
  deriving newtype Monad
  deriving newtype Applicative
  deriving newtype Functor

instance MonadListLinks App where 
  listLinks = Read.listLinks

runWith :: MonadIO m => Context -> App a -> m a 
runWith ctx = liftIO . flip runReaderT ctx . unApp