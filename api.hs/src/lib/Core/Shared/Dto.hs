module Core.Shared.Dto where

import Protolude
import Data.Aeson  ( FromJSON (..)
                   , ToJSON (..)
                   , genericParseJSON
                   , genericToJSON
                   , genericToEncoding
                   )
import Core.Json        ( options )
import Core.Shared.Types ( Link (..) )

-- common
------------------------------------------------------------------------

data Slice a = Slice {  items :: [a], total :: Int }
  deriving (Eq, Show, Generic)

instance (FromJSON a) => FromJSON (Slice a) where 
  parseJSON = genericParseJSON $ options ""

instance (ToJSON a) => ToJSON (Slice a) where
  toJSON = genericToJSON $ options ""
  toEncoding = genericToEncoding $ options ""

instance Functor Slice where 
  fmap g s = Slice (map g (items s)) (total s)

-- Link
------------------------------------------------------------------------

data LinkDto = LinkDto 
  { linkDtoUrl          :: !Text 
  , linkDtoShortFormUrl :: !Text
  } deriving (Eq, Show, Generic)

instance ToJSON LinkDto where 
  toJSON = genericToJSON $ options "link"
  toEncoding = genericToEncoding $ options "link"

fromLink :: Link -> LinkDto 
fromLink Link {..} = LinkDto linkUrl linkShortFormUrl

toLink :: LinkDto -> Either Text Link 
toLink LinkDto {..} = Link <$> (Right $ linkDtoUrl) <*> (Right linkDtoShortFormUrl)