# Build
# -----------------------------------------------------------------------------

FROM haskell:9.2 as build

RUN mkdir /app

WORKDIR /app

COPY package.yaml stack.yaml ./

RUN stack -j4 build --system-ghc --only-dependencies --test --no-run-tests

COPY . .

RUN stack -j4 build --system-ghc
RUN cp -r $(stack path --local-install-root --system-ghc)/bin /app/bin

# Release
# -----------------------------------------------------------------------------

FROM debian:stretch as release 

COPY --from=build /app/bin/server /usr/local/bin/server

CMD ["server"]
