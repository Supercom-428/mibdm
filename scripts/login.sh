if [ ! -f ".token" ]; then
  read -p "Username: " USER
  read -s -p "Password: " PASS
  TOKEN=$(curl -s -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    --data "{\"username\":\"${USER}\",\"password\":\"${PASS}\"}" \
    http://127.0.0.1:3000/auth/login \
    | jq -r '.token')

  echo "${TOKEN}" > .token
else
  TOKEN=$(cat .token)
fi

echo ${TOKEN}
