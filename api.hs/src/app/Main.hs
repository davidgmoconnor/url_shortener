module Main (main) where

import Protolude
import Data.Default ( def )
import Servant hiding ( Context )
import Network.Wai.Handler.Warp ( runSettings, defaultSettings, setPort )
import Network.Wai.Middleware.RequestLogger ( mkRequestLogger )
import Core.Http.Api ( api )
import Http.Server ( server )
import Context ( createContext, contextPort )

main :: IO ()
main = do
    ctx <- createContext
    logger <- mkRequestLogger def

    let app = serve api $ server ctx 
    let middleware = logger 
    
    let port = contextPort ctx 
    let settings = 
            setPort port $
            defaultSettings

    putText "Server running"
    runSettings settings . middleware $ app