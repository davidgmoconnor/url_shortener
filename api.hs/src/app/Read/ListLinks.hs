module Read.ListLinks 
  (listLinks)
where

import Protolude hiding (find)
import Control.Monad.Catch ( MonadCatch )
import Core.Shared.Types ( ServiceError (..), Link, toLink )
import Core.Shared.Dto ( Slice (..) )
import Context ( Context)
import Database.MongoDB
import Services.Database ( query, hoistDbError, runCount, fromDocument )
import GHC.Float (castFloatToWord32)


listLinks 
  :: MonadIO m 
  => MonadCatch m 
  => MonadReader Context m 
  => Float 
  -> Float 
  -> Maybe Text 
  -> ExceptT ServiceError m (Slice Link)

listLinks start end filter = do 
    let stmt = case filter of
                Nothing -> select [] "links"
                Just f -> select ["url" =: f] "links"
    xs <- query $ find stmt { sort = ["url" =: (1 :: Int)], skip = castFloatToWord32 start, limit = castFloatToWord32 end}
    all <- runCount $ count $ select [] "links"
    let links = fromDocument "Link" toLink xs (Right []) in
      hoistDbError $ Slice <$> links <*> (Right $ all)