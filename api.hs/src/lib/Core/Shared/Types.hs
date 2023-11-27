module Core.Shared.Types (
  Link (..),
  InternalError (..),
  internalErr,
  ServiceError (..),
  DatabaseError (..),
  toLink
) where 

import Protolude
import Database.MongoDB ( Document, lookup )

data Link = Link 
  { linkUrl          :: !Text
  , linkShortFormUrl :: !Text
  } deriving (Eq, Show, Generic)

toLink :: Document -> Maybe Link
toLink d = do
  u <- lookup "url" d
  s <- lookup "shortFormUrl" d
  case (u,s) of 
    (Just a, Just b) -> Just $ Link a b
    (_, _) -> Nothing

-- Errors
------------------------------------------------------------------------

data DatabaseError 
  = DatabaseUnknownError Text 
  deriving (Show)

data InternalError = InternalError Text deriving Show

data ServiceError 
  = Database DatabaseError 
  | Internal InternalError
  deriving (Show)

internalErr :: Text -> ServiceError 
internalErr = Internal . InternalError