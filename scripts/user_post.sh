#!/bin/bash

curl -v -F username=supercom -F password=root -F first_name=super -F last_name=com -F email=supercom@mail.com -F role_id=1 http://localhost:3000/users/create
