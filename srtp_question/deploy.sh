function try() {
  [[ $- = *e* ]]
  SAVED_OPT_E=$?
  set +e
}

cd client
npm run build
try
(
  rm -r client
)
cp -r ./build ./client
try
(
  rm -r ../server/src/client
)
cp -r ./build ../server/src/client

cd ../server
npm run build

cd build
try
(
  rm -r client
)

cd ..
cp -r ../client/client ./client
cp -r ../client/client ./build/client

try
(
  rm -r ../deploy/src
)
cp -r ./build ../deploy/src
