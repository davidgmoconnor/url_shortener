{-# LANGUAGE CPP #-}
{-# LANGUAGE NoRebindableSyntax #-}
{-# OPTIONS_GHC -fno-warn-missing-import-lists #-}
{-# OPTIONS_GHC -w #-}
module Paths_primary_server (
    version,
    getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where


import qualified Control.Exception as Exception
import qualified Data.List as List
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude


#if defined(VERSION_base)

#if MIN_VERSION_base(4,0,0)
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#else
catchIO :: IO a -> (Exception.Exception -> IO a) -> IO a
#endif

#else
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#endif
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir `joinFileName` name)

getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath



bindir, libdir, dynlibdir, datadir, libexecdir, sysconfdir :: FilePath
bindir     = "/Users/davidoconnor/primary/api.hs/.stack-work/install/aarch64-osx/1e5ab9d5d6bd8859328aa744204a5dff3a39b7f9a46c02886d4eaea68b0ed292/9.2.8/bin"
libdir     = "/Users/davidoconnor/primary/api.hs/.stack-work/install/aarch64-osx/1e5ab9d5d6bd8859328aa744204a5dff3a39b7f9a46c02886d4eaea68b0ed292/9.2.8/lib/aarch64-osx-ghc-9.2.8/primary-server-0.1.0.0-7ThbuSyFXlw5NKkI6uKAXP-server"
dynlibdir  = "/Users/davidoconnor/primary/api.hs/.stack-work/install/aarch64-osx/1e5ab9d5d6bd8859328aa744204a5dff3a39b7f9a46c02886d4eaea68b0ed292/9.2.8/lib/aarch64-osx-ghc-9.2.8"
datadir    = "/Users/davidoconnor/primary/api.hs/.stack-work/install/aarch64-osx/1e5ab9d5d6bd8859328aa744204a5dff3a39b7f9a46c02886d4eaea68b0ed292/9.2.8/share/aarch64-osx-ghc-9.2.8/primary-server-0.1.0.0"
libexecdir = "/Users/davidoconnor/primary/api.hs/.stack-work/install/aarch64-osx/1e5ab9d5d6bd8859328aa744204a5dff3a39b7f9a46c02886d4eaea68b0ed292/9.2.8/libexec/aarch64-osx-ghc-9.2.8/primary-server-0.1.0.0"
sysconfdir = "/Users/davidoconnor/primary/api.hs/.stack-work/install/aarch64-osx/1e5ab9d5d6bd8859328aa744204a5dff3a39b7f9a46c02886d4eaea68b0ed292/9.2.8/etc"

getBinDir     = catchIO (getEnv "primary_server_bindir")     (\_ -> return bindir)
getLibDir     = catchIO (getEnv "primary_server_libdir")     (\_ -> return libdir)
getDynLibDir  = catchIO (getEnv "primary_server_dynlibdir")  (\_ -> return dynlibdir)
getDataDir    = catchIO (getEnv "primary_server_datadir")    (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "primary_server_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "primary_server_sysconfdir") (\_ -> return sysconfdir)




joinFileName :: String -> String -> FilePath
joinFileName ""  fname = fname
joinFileName "." fname = fname
joinFileName dir ""    = dir
joinFileName dir fname
  | isPathSeparator (List.last dir) = dir ++ fname
  | otherwise                       = dir ++ pathSeparator : fname

pathSeparator :: Char
pathSeparator = '/'

isPathSeparator :: Char -> Bool
isPathSeparator c = c == '/'
