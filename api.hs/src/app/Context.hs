module Context
  ( Context (..), createContext )
where

import Protolude
import System.Environment ( lookupEnv )

data Context = Context 
  { contextPort   :: !Int
  }

createContext :: IO Context 
createContext = Context
  <$> getPort


getPort :: IO Int
getPort = fromMaybe 8080 . (>>= readMaybe) <$> lookupEnv "PORT"
