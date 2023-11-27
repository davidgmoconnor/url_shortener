module Context
  ( Context (..), createContext )
where

import Protolude
import System.Environment ( lookupEnv )
import Database.MongoDB ( Pipe, connect, host )

data Context = Context 
  { contextPort   :: !Int
  , contextDb     :: !Pipe
  }

createContext :: IO Context 
createContext = Context
  <$> getPort
  <*> connectToDb


getPort :: IO Int
getPort = fromMaybe 8080 . (>>= readMaybe) <$> lookupEnv "PORT"

-- TODO pull from env
connectToDb :: (IO Pipe)
connectToDb = connect $ host "127.0.0.1"