#!/usr/bin/env bash

WC='\033[1;37m' # White Color
NC='\033[0m'    # No Color

function install {
  npm ci --loglevel=error --no-audit
}

function server {
  local environment="$@"
  [[ -z $environment ]] && environment="local"

  _loadenv $environment &&
    prettier &&
    eslint &&
    npx serverless offline start --stage $environment
}

function test {
  # enable watch mode: ./run.sh test --watch
  # run a single file: ./run.sh test <path>/<file>.ts

  local args="$@"
  [[ -z $args ]] && args="--coverage"

  # the project should be in mock mode by default and should not need to load an environment
  prettier &&
    eslint &&
    npx jest --runInBand $args
}

function prettier {
  # to try fix: ./run.sh prettier --write .

  local args="$@"
  [[ -z $args ]] && args="--check ."

  npx prettier $args || {
    echo -e "\ntry to fix: ${WC}./run.sh prettier --write .${NC}"
    exit $1
  }
}

function eslint {
  # to try fix: ./run.sh eslint --fix

  local args="$@"
  [[ -z $args ]] && args="--max-warnings 0"

  npx eslint --ext .js,.ts $args . || {
    echo -e "\ntry to fix: ${WC}./run.sh eslint --fix${NC}"
    exit $1
  }
}

function _loadenv {
  # this function must be used inside other functions

  # load env variables from .env.local file if exists
  # override env variables with .env.local file by default if exists
  # override env variables with .env.<environment> file if exists: ./run.sh _loadenv <enviroment>

  local environment="$@"
  [[ -z $environment ]] && environment="local"

  for file in .env .env.${environment}; do
    # comments in file are supported
    [[ ! -f $file ]] || export $(grep -v '^#' $file | xargs)
  done
}

${@:-echo "enter a command"}
