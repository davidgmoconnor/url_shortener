module Core.Json (
    options
) where 

import Protolude
import Data.Aeson ( Options (..), defaultOptions, camelTo2, SumEncoding (..) )
import Data.String ( String )

encodeConstructor :: String -> String 
encodeConstructor name = 
  if all isUpper name
    then name 
    else camelTo2 '_' name

options :: String -> Options 
options prefix = defaultOptions
  { fieldLabelModifier = apiFieldName prefix
  , constructorTagModifier = encodeConstructor
  , tagSingleConstructors = True
  , sumEncoding = UntaggedValue
  }

apiFieldName :: String -> String -> String 
apiFieldName prefix field = 
  let len = length prefix in
  let dropped = drop len field in 
  let (hd, tl) = splitAt 1 dropped in 
  map toLower hd <> tl