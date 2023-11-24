module Core.Shared.Types (
  Link (..),
  InternalError (..),
  internalErr,
  ServiceError (..)
) where 

import Protolude

data Link = Link 
  { linkUrl          :: !Text
  , linkShortFormUrl :: !Text
  } deriving (Eq, Show)


-- Errors
------------------------------------------------------------------------

-- data DataBaseError 

data InternalError = InternalError Text deriving Show

data ServiceError 
  -- = Database DatabaseError 
  = Internal InternalError
  deriving (Show)

internalErr :: Text -> ServiceError 
internalErr = Internal . InternalError